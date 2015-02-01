//NOTE: THE LOOPS IN DELETE, INSERT, AND OVERRIDE CAN BE DRIED OUT.
//MOSTLY JUST PASS IN FUNCTIONS FOR THE BITS THEY DO BETWEEN LOOPING LOGIC
//CAREFUL ABOUT HOW OVERRIDE GOES AROUND ONE LESS TIME, THOUGH.
//PROBABLY ALSO SHARE SOME LOGIC ABOUT, SAY, CELL CREATION...

//bug: if you switch a guy and then switch another guy while the first guy is
//     switching, the 4-sec timeout for the first one will terminate while the
//     animation is still happening

//"touch" as the droppable param for the intercells is too sensitive,
//can't drag out the guy without triggering it when the rhythm is dense
//might be solved by implementing the proportional size of cells
//or be solved by making draggables have a delay when you start...
//or by just decreasing the sensitivity of the intercells droppable to ...
//well you can't change the % of intersect from 50 as far as i can see...
//maybe "fit" would work? i expect more people are dealing with droppables
//that are larger than their draggables... nope that doesn't work
//but yeah if you finish the part where they take up ALL the room between
//cells, that would work...


//why the fuck is the input spontaneously jumping into the rhythm ring?
//mabye that's not happening anymore
//but okay, instlal the plugin on the entire wrapper, re-route things
//so that the plugin expects both a rhythm-ring
//and a polygon-canvas underneath it

$.RhythmRing = function (el, ctx) {
  this.$el = $(el);
  this.rhythmCells;
  this.rhythmCellAngles;
  this.rhythmInterCellAngles;
  this.ctx = $('#polygon-canvas')[0].getContext("2d");
  //i could have an ivar for animating which would be an improvement on
  //the 4 second settimeout, or i could have a css-display-none input tag
  //whose value would be changing so that jquery could listen for it with
  //a .change() event handler, that would... (lost track of thought)

  $("#onsetsAndRestSeq").change(this.overrideRhythmRing.bind(this));

  this.$el.on('transitionend', '.intercell',
    this.cleanupMergedInterCell.bind(this));

  // this.$el.on("mousedown", ".cell", function(event) {
  //   var clickedCellId = parseInt($(event.currentTarget).attr("ord"));
  //   if (event.which === 1) {
  //     this.deleteCell(clickedCellId); while testing
  //   }
  // }.bind(this));

  this.$el.on("mousedown", ".c-draggable", function(event) {
    var clickedCellId = parseInt($(event.currentTarget).attr("ord"));
    if (event.which === 3) {
      this.toggleCell(clickedCellId);
    }
  }.bind(this));

  this.$el.on("mousedown", ".intercell", function(event) {
    var clickedInterCellId = parseInt($(event.currentTarget).attr("ord"));
    if (event.which === 1) {
      this.insertCellAt(clickedInterCellId);
    } else if (event.which === 3) {
      this.switchCellsAt(clickedInterCellId);
    }
  }.bind(this));

  this.$el.on('dropout', '.cell', function(event) {
    setTimeout( function() {
      this.deleteCell(
        parseInt(
          $(event.currentTarget).attr("ord")
        )
      )
    }.bind(this), 0)
  }.bind(this));

  //this.$el.on('transitionend', '.cell', this.refreshDraggables.bind(this));

  this.$el.on('dropover', '.intercell', function(event) {
    setTimeout( function() {
      this.insertCellAt(
        parseInt(
          $(event.currentTarget).attr("ord")
        )
      )
    }.bind(this), 0)
  }.bind(this));

  //also we need some protection against somehow grabbing more than one at once apparently...

  //this is only here to allow stopping dragging to delete it w/o killing the others since apparently suicide is impossible
  this.$el.on('dragstart', '.c-draggable', function(event) {
    $(event.currentTarget).attr("ord", -1) //doesn't have to be ord... could just be selected...
  }.bind(this));

  this.$el.on('dragstop', '.c-draggable', function(event) {
    //well, and don't delete it if you never dragged it off the thing in the first place...!
    this.$el.find('.c-draggable[ord="' + $(event.currentTarget).attr("ord") + '"]').remove();
  }.bind(this));

  //this.$el this is going to be a listener for animating the polygon
  //if you can indeed get the .position() of a jquerified transitioning css obj
  setInterval(function() {
    if (this.rhythmCells) {
    //console.log(this.$el.find('.cell[ord="1"]').position());
      //console.log(this.rhythmCells);
      //debugger
      //var curAngle = -90; //this way wants to start from far right edge of ring
      //var rhythmUnitInDegrees = 360 / this.rhythmCells.length;
      var prevPos = null;
      this.ctx.clearRect(0, 0, 600, 600);
      for (var i = 0; i < this.rhythmCells.length; i++ ) {
        //console.log("in here");
        //var curAngleInRadians = curAngle * (Math.PI / 180);
        //var curPos = [130 + (148 * Math.cos(curAngleInRadians)),
        //  130 + (148 * Math.sin(curAngleInRadians))];

        var curPosition = $(".cell[ord='" + i + "']").position();
        debugger
        var curPos = [curPosition.top, curPosition.left];

        //draw polygon
        if (this.rhythmCells[i]) {
          if (prevPos) {
            this.ctx.beginPath();
            this.ctx.moveTo(prevPos[0] + 20, prevPos[1] + 20);
            this.ctx.lineTo(curPos[0] + 20, curPos[1] + 20);
            this.ctx.stroke();
          }
          //console.log(curPos);
          prevPos = curPos.slice();
        }
      }
    }
  }.bind(this), 50);

};

$.RhythmRing.prototype.overrideRhythmRing = function(event) {
  //clear display
  this.$el.find(':not(.polygon-canvas)').empty();
  this.ctx.clearRect(0, 0, 600, 600);

  //override all fundamental rhythm arrays
  this.rhythmCells = [];
  this.rhythmCellAngles = [];
  this.rhythmInterCellAngles = [];

  //parse text-entered rhythm
  var rawInput = $(event.currentTarget).val();
  for (var i = 0; i < rawInput.length; i++) {
    if (rawInput[i] === "x") {
      this.rhythmCells.push(true);
    } else if (rawInput[i] === "-") {
      this.rhythmCells.push(false);
    }
  }

  // prepare to loop around ring!
  // adjust to start from top of circle
  // rather than top left origin
  var curAngle = 45;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;

  for (var i = 0; i < this.rhythmCells.length; i++ ) {

    //place a cell
    var $newCell = $('<div class="cell">');
    $newCell.attr("ord", i);
    $newCell.css('transform',
      'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
    $newCell.droppable();
    if (this.rhythmCells[i]) { $newCell.addClass("onset"); }
    this.$el.append($newCell);

    //update angles array
    this.rhythmCellAngles.push(curAngle);

    //move halfway between the next cell
    curAngle += rhythmUnitInDegrees / 2;

    //place an intercell
    var $newInterCell = $('<div class="intercell">');
    $newInterCell.attr('ord', i);
    $newInterCell.css('transform',
      'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');
    $newInterCell.droppable( { tolerance: "fit"} );
    this.$el.append($newInterCell);

    //update intercell angles array
    this.rhythmInterCellAngles.push(curAngle);

    //move the other half of the way to the next cell
    curAngle += rhythmUnitInDegrees / 2;
  };

  //update draggables to match
  this.refreshDraggables();
}

$.RhythmRing.prototype.cleanupMergedInterCell = function(event) {
  if ($(event.currentTarget).hasClass("markedForRemoval")) {
    $(event.currentTarget).remove();
  }
}

$.RhythmRing.prototype.deleteCell = function(cellId) {

  //temporarily clear away all of the un-animatible draggable cell handles
  //unless, that is, of course, they are the one currently being dragged!
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove();

  //remove the cell from the fundamental array and display
  this.rhythmCells.splice(cellId, 1);
  $(".cell[ord='" + cellId + "']").remove();

  //update indices for cells after the removed one
  for (var i = cellId; i < this.rhythmCells.length; i++) {
    $(".cell[ord='" + (i + 1) + "']").attr("ord", i);
  }

  //override ONLY the angle arrays
  this.rhythmCellAngles = [];
  this.rhythmInterCellAngles = [];

  // prepare to loop around ring!
  // adjust to start from top of circle
  // rather than top left origin
  var curAngle = 45;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;

  //need the + 1 to get the final intercell;
  //their indices haven't been updated yet;
  //this extra iter won't hurt the cells themselves
  for (var i = 0; i < this.rhythmCells.length + 1; i++ ) {

    //update a cell
    // $(".cell[ord='" + i + "']").css('transform',
    //   'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
    debugger
    $(".cell[ord='" + i + "']").animate({

      transform: "translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)",
      step: function() { console.log( this.position() ); }
    }, 1000);

    //update angles array
    this.rhythmCellAngles.push(curAngle);

    //move halfway between the next cell
    curAngle += rhythmUnitInDegrees / 2;

    //update an intercell
    if (i >= cellId) {
      $(".intercell[ord='" + i + "']").css('transform',
         'translateX(32px) translateY(32px) rotate(' +
         (curAngle - rhythmUnitInDegrees) + 'deg)');
    } else {
      $(".intercell[ord='" + i + "']").css('transform',
         'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');
    }
    $(".intercell[ord='" + cellId + "']").addClass("markedForRemoval");

    //update intercell angles arrays
    this.rhythmInterCellAngles.push(curAngle);

    //move the other half of the way to the next cell
    curAngle += rhythmUnitInDegrees / 2;
  };

  //update indices for intercells after the removed one
  for (var i = cellId; i < this.rhythmCells.length; i++) {
    $(".intercell[ord='" + (i + 1) + "']").attr("ord", i);
  }

  setTimeout(this.refreshDraggables.bind(this), 1001);

}

$.RhythmRing.prototype.toggleCell = function(cellId) {
  if (this.rhythmCells[cellId]) {
    this.rhythmCells[cellId] = false;
    $(".cell[ord='" + cellId + "']").removeClass("onset");
    $(".c-draggable[ord='" + cellId + "']").removeClass("onset");
  } else {
    this.rhythmCells[cellId] = true;
    $(".cell[ord='" + cellId + "']").addClass("onset");
    $(".c-draggable[ord='" + cellId + "']").addClass("onset");
  }

  this.refreshDraggables;
}

$.RhythmRing.prototype.insertCellAt = function (interCellId) {

  //temporarily clear away all of the un-animatible draggable cell handles
  //unless, that is, of course, they are the one currently being dragged!
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove();

  //insert into the array here
  this.rhythmCells.splice(interCellId + 1, 0, false);

  //update indices of existing later cells and intercells
  for (var i = this.rhythmCells.length - 2; i > interCellId; i--) {
    $(".cell[ord='" + i + "']").attr("ord", i + 1);
    $(".intercell[ord='" + i + "']").attr("ord", i + 1);
  }

  //add the new intercell el (first, in order to appear underneath)
  var $newInterCell = $('<div class="intercell">');
  $newInterCell.attr("ord", interCellId + 1);
  $newInterCell.css('transform', //initial pos, will immediately rotate
    'translateX(32px) translateY(32px) rotate('
    + this.rhythmInterCellAngles[interCellId] + 'deg)');
  $newInterCell.droppable( { tolerance: "fit"} );
  this.$el.append($newInterCell);

  //add the new cell el
  var $newCell = $('<div class="cell">');
  $newCell.attr("ord", interCellId + 1);
  $newCell.droppable();
  $newCell.css('transform', //initial pos, will immediately rotate
    'translateX(25px) translateY(25px) rotate('
    + this.rhythmInterCellAngles[interCellId] + 'deg)');
  this.$el.append($newCell);

  //update the display after a frame to cause animations
  setTimeout( function() {
    //override ONLY the angle arrays
    this.rhythmCellAngles = [];
    this.rhythmInterCellAngles = [];

    // prepare to loop around ring!
    // adjust to start from top of circle
    // rather than top left origin
    var curAngle = 45;
    var rhythmUnitInDegrees = 360 / this.rhythmCells.length;

    //need the + 1 to get the final intercell;
    //their indices haven't been updated yet;
    //this extra iter won't hurt the cells themselves
    for (var i = 0; i < this.rhythmCells.length + 1; i++ ) {

      //update a cell
      $(".cell[ord='" + i + "']").css('transform',
        'translateX(25px) translateY(25px) rotate(' + curAngle + 'deg)');
      // $(".cell[ord='" + i + "']").animate({
      //     //debugger
      //     transformOrigin: "120px 120px",
      //     transform: "translateX(25px) translateY(25px) rotate('" + curAngle + "'deg)"
      //     //step: function() { console.log( this.position() ); }
      //   }, 1000);

      //update angles array
      this.rhythmCellAngles.push(curAngle);

      //move halfway between the next cell
      curAngle += rhythmUnitInDegrees / 2;

      //update an intercell
      $(".intercell[ord='" + i + "']").css('transform',
        'translateX(32px) translateY(32px) rotate(' + curAngle + 'deg)');

      //update intercell angles array
      this.rhythmInterCellAngles.push(curAngle);

      //move the other half of the way to the next cell
      curAngle += rhythmUnitInDegrees / 2;
    };
  }.bind(this), 0);

  setTimeout(this.refreshDraggables.bind(this), 1001);
}

$.RhythmRing.prototype.switchCellsAt = function (interCellId) {

  //temporarily clear away all of the un-animatible draggable cell handles
  //unless, that is, of course, they are the one currently being dragged!
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove();

  //account for wrapping from end to start of ring
  if (interCellId === this.rhythmCells.length - 1) {
    var nextInterCellId = 0;

    //delete cells at 0 and the last one
    $(".cell[ord='0']").remove();
    $(".cell[ord='" + interCellId + "']").remove();

    //immediately replace the cell at 0 w/ one at 359
    var $newCell = $('<div class="cell">');
    $newCell.attr("ord", 0);
    $newCell.droppable();
    $newCell.css('transform',
      'translateX(25px) translateY(25px) rotate('
      + (359.9 + 45) + 'deg)'); //don't forget to account for the 45deg offset!
    if (this.rhythmCells[0]) { $newCell.addClass("onset"); }
    this.$el.append($newCell);

    //...and the final cell w/ one just negative
    var $newCell = $('<div class="cell">');
    $newCell.droppable();
    $newCell.attr("ord", interCellId);
    $newCell.css('transform',
      'translateX(25px) translateY(25px) rotate('
      + ( this.rhythmCellAngles[interCellId] - 360 ) + 'deg)');
    if (this.rhythmCells[interCellId]) { $newCell.addClass("onset"); }
    this.$el.append($newCell);

  } else {
    var nextInterCellId = interCellId + 1;
  }

  //update the underlying array
  var tmpCell = this.rhythmCells[interCellId];
  this.rhythmCells[interCellId] = this.rhythmCells[nextInterCellId];
  this.rhythmCells[nextInterCellId] = tmpCell;

  //update the display after a frame to cause animations if it's a wrap case
  setTimeout( function() {
    $(".cell[ord='" + interCellId + "']").css('transform',
      'translateX(25px) translateY(25px) rotate('
      + this.rhythmCellAngles[nextInterCellId] + 'deg)')
      .attr("ord", "tmp");
    $(".cell[ord='" + nextInterCellId + "']").css('transform',
      'translateX(25px) translateY(25px) rotate('
      + this.rhythmCellAngles[interCellId] + 'deg)')
      .attr("ord", interCellId);
    $(".cell[ord='tmp']").attr("ord", nextInterCellId)
  }.bind(this), 0);

  setTimeout(this.refreshDraggables.bind(this), 1001);
};

$.RhythmRing.prototype.refreshDraggables = function() {
  this.$el.find('.c-draggable:not(.ui-draggable-dragging)').remove(); //cuz it triggers once for each el that finishes animating
  var curAngle = -90; //this way wants to start from far right edge of ring
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;
  var prevPos = null;
  this.ctx.clearRect(0, 0, 600, 600);
  for (var i = 0; i < this.rhythmCells.length; i++ ) {
    var curAngleInRadians = curAngle * (Math.PI / 180);
    var curPos = [130 + (148 * Math.cos(curAngleInRadians)),
      130 + (148 * Math.sin(curAngleInRadians))];

    //draw polygon
    if (this.rhythmCells[i]) {
      if (prevPos) {
        this.ctx.beginPath();
        this.ctx.moveTo(prevPos[0] + 20, prevPos[1] + 20);
        this.ctx.lineTo(curPos[0] + 20, curPos[1] + 20);
        this.ctx.stroke();
      }
      prevPos = curPos.slice();
    }

    var $newDraggable = $('<div class="c-draggable">')
      .draggable().css("position", "absolute")
      .css("left", curPos[0]).css("top", curPos[1])
      .attr("ord", i);
    if (this.rhythmCells[i] === true ) { $newDraggable.addClass("onset"); }
    this.$el.append($newDraggable);
    curAngle += rhythmUnitInDegrees;
  }

  //last line
  curAngleInRadians = -90 * (Math.PI / 180);
  var curPos = [130 + (148 * Math.cos(curAngleInRadians)),
    130 + (148 * Math.sin(curAngleInRadians))];
  this.ctx.beginPath();
  this.ctx.moveTo(prevPos[0] + 20, prevPos[1] + 20);
  this.ctx.lineTo(curPos[0] + 20, curPos[1] + 20);
  this.ctx.stroke();
};

$.fn.rhythmRing = function () {
  return this.each(function () {
    new $.RhythmRing(this);
  });
};

$(function() {
  $('.rhythm-ring').rhythmRing();
});
