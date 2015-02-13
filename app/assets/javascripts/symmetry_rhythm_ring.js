SYMMETRY_POLYGON_OFFSET = 7;
SYMMETRY_CANVAS_DIM = 150;

$.SymmetryRhythmRing = function (el, onsetSymmetries, interonsetSymmetries) {
  this.$el = $(el);
  this.onsetSymmetries = onsetSymmetries;
  this.interonsetSymmetries = interonsetSymmetries;
  this.ctx = this.$el.find('.symmetry-polygon-canvas')[0].getContext("2d");
  this.rhythmStr = this.$el.attr("rhythm-str");
  this.initializeRhythm(this.rhythmStr);
  this.refreshPolygon();
  this.$el.on('mouseover', '.symmetry-cell', this.showCellDiameter.bind(this));
  this.$el.on('mouseover', '.symmetry-intercell', this.showIntercellDiameter.bind(this));
};

$.fn.symmetryRhythmRing = function (onsetSymmetries, interonsetSymmetries) {
  return this.each(function () {
    new $.SymmetryRhythmRing(this, onsetSymmetries, interonsetSymmetries);
  });
};

$.SymmetryRhythmRing.prototype.initializeRhythm = function(rhythm) {
  this.rhythmCells = [];
  for (var i = 0; i < this.rhythmStr.length; i++) {
    this.rhythmCells.push( this.rhythmStr[i] === "x" ? true : false);
  }
  this.loopApplyUpdates();
  setTimeout(this.showAllSymmetries.bind(this), 50);
};

$.SymmetryRhythmRing.prototype.placeCell = function(i, curAngle) {
  var $newCell = $('<div class="symmetry-cell">');
  $newCell.css('transform',
    'translateX(17px) translateY(-141px) rotate(' + curAngle + 'deg)');
  $newCell.attr('ord', i);
  if (this.rhythmCells[i]) { $newCell.addClass("onset"); }
  this.$el.append($newCell);

};

$.SymmetryRhythmRing.prototype.placeIntercell = function(i, curAngle) {
  var $newIntercell = $('<div class="symmetry-intercell">');
  $newIntercell.css('transform',
    'translateX(17px) translateY(-141px) rotate(' + curAngle + 'deg)');
  $newIntercell.attr('ord', i);
  this.$el.append($newIntercell);
};

$.SymmetryRhythmRing.prototype.loopApplyUpdates = function() {
  var curAngle = 45;
  var rhythmUnitInDegrees = 360 / this.rhythmCells.length;
  for (var i = 0; i < this.rhythmCells.length; i++ ) {
    this.placeCell(i, curAngle);
    curAngle += rhythmUnitInDegrees / 2;
    this.placeIntercell(i, curAngle);
    curAngle += rhythmUnitInDegrees / 2;
  };
};

$.SymmetryRhythmRing.prototype.refreshPolygon = function() {
  var prevPos = null;
  var firstPos = null;
  this.ctx.clearRect(0, 0, SYMMETRY_CANVAS_DIM, SYMMETRY_CANVAS_DIM);
  for (var i = 0; i <= this.rhythmCells.length * 2; i++ ) {
    j = i % this.rhythmCells.length;
    if (i > this.rhythmCells.length && j > firstPos) break;
    var curPosition = this.$el.find(".symmetry-cell[ord='" + j + "']").position();
    var curPos = [curPosition.left, curPosition.top];
    if (this.rhythmCells[j]) {
      if (prevPos) this.drawSide(curPos, prevPos);
      if (!firstPos) firstPos = j;
      prevPos = curPos.slice();
    }
  }
};

$.SymmetryRhythmRing.prototype.drawSide = function(curPos, prevPos, color) {
  this.ctx.strokeStyle = color;
  this.ctx.beginPath();
  this.ctx.moveTo(prevPos[0] + SYMMETRY_POLYGON_OFFSET, prevPos[1] + SYMMETRY_POLYGON_OFFSET);
  this.ctx.lineTo(curPos[0] + SYMMETRY_POLYGON_OFFSET, curPos[1] + SYMMETRY_POLYGON_OFFSET);
  this.ctx.lineWidth = 1;
  this.ctx.stroke();
};

$.SymmetryRhythmRing.prototype.showAllSymmetries = function() {
  this.ctx.clearRect(0, 0, SYMMETRY_CANVAS_DIM, SYMMETRY_CANVAS_DIM);
  var that = this;
  color = "#ddd";
  this.onsetSymmetries.forEach(function(onsetIndex) {
    var ord = onsetIndex;
    if (ord < 0) {
      ord += that.rhythmStr.length;
    }
    var curPosition = that.$el.find(".symmetry-cell[ord='" + ord + "']").position();
    var antipode = (ord + (that.rhythmStr.length / 2)) % that.rhythmStr.length
    if (antipode % 1 === 0) {
      var otherPosition = that.$el.find(".symmetry-cell[ord='" + antipode + "']").position();
    } else {
      var otherPosition = that.$el.find(".symmetry-intercell[ord='" + Math.floor(antipode) + "']").position();
    }
    var curPos = [curPosition.left, curPosition.top];
    var otherPos = [otherPosition.left, otherPosition.top];
    that.drawSide(curPos, otherPos, color);
  });
  this.interonsetSymmetries.forEach(function(interonsetIndex) {
    var ord = interonsetIndex;
    if (ord < 0) {
      ord += that.rhythmStr.length;
    }
    var curPosition = that.$el.find(".symmetry-intercell[ord='" + ord + "']").position();
    var antipode = (ord + (that.rhythmStr.length / 2)) % that.rhythmStr.length
    if (antipode % 1 === 0) {
      var otherPosition = that.$el.find(".symmetry-intercell[ord='" + antipode + "']").position();
    } else {
      var otherPosition = that.$el.find(".symmetry-cell[ord='" + ((Math.floor(antipode) + 1) % that.rhythmStr.length) + "']").position();
    }
    // debugger
    var curPos = [curPosition.left, curPosition.top];
    var otherPos = [otherPosition.left, otherPosition.top];
    that.drawSide(curPos, otherPos, color);
  });
},

$.SymmetryRhythmRing.prototype.showIntercellDiameter = function(event) {
  this.showAllSymmetries();
  var ord = parseInt($(event.currentTarget).attr("ord"));
  var curPosition = $(event.currentTarget).position();
  var antipode = (ord + (this.rhythmStr.length / 2)) % this.rhythmStr.length
  if (antipode % 1 === 0) {
    var otherPosition = this.$el.find(".symmetry-intercell[ord='" + antipode + "']").position();
  } else {
    var otherPosition = this.$el.find(".symmetry-cell[ord='" + (Math.floor(antipode) + 1) + "']").position();
  }
  var curPos = [curPosition.left, curPosition.top];
  var otherPos = [otherPosition.left, otherPosition.top];
  if (this.rhythmStr.length % 2 === 0) {
    if (this.interonsetSymmetries.indexOf(ord) != -1 || this.interonsetSymmetries.indexOf(antipode) != -1) {
      color = "#ff9800";
    } else {
      color = "#888";
    }
  } else {
    if (this.interonsetSymmetries.indexOf(ord) != -1 || this.onsetSymmetries.indexOf(antipode) != -1) {
      color = "#ff9800";
    } else {
      color = "#888";
    }
  }
  this.drawSide(curPos, otherPos, color);
}

$.SymmetryRhythmRing.prototype.showCellDiameter = function(event) {
  this.showAllSymmetries();
  var ord = parseInt($(event.currentTarget).attr("ord"));
  var curPosition = $(event.currentTarget).position();
  var antipode = (ord + (this.rhythmStr.length / 2)) % this.rhythmStr.length
  if (antipode % 1 === 0) {
    var otherPosition = this.$el.find(".symmetry-cell[ord='" + antipode + "']").position();
  } else {
    var otherPosition = this.$el.find(".symmetry-intercell[ord='" + Math.floor(antipode) + "']").position();
  }
  var curPos = [curPosition.left, curPosition.top];
  var otherPos = [otherPosition.left, otherPosition.top];
  if (this.rhythmStr.length % 2 === 0) {
    if (this.onsetSymmetries.indexOf(ord) != -1 || this.onsetSymmetries.indexOf(antipode) != -1) {
      color = "#ff9800";
    } else {
      color = "#888";
    }
  } else {
    if (this.onsetSymmetries.indexOf(ord) != -1 || this.interonsetSymmetries.indexOf(antipode) != -1) {
      color = "#ff9800";
    } else {
      color = "#888";
    }
  }
  this.drawSide(curPos, otherPos, color);
}
