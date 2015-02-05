$(document).ready(function(){
  console.log("welcome to tooltips");
  // $(".cell-handle").tooltip({
  //   content: "Drag and drop me!"
  // });
  // $("button").tooltip({
  //   content: "Waaka!"
  // });
  $('body').tooltip({
    items: '.cell-handle',
    content: "Drag and drop me!"
  });
});
