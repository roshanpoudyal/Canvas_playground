// Shorthand for $( document ).ready()
$(function() {
    var $body = $("body");
    var canvas = document.getElementById("myCanvas");

  	var ctx = canvas.getContext("2d");

    // treeattributes default values
    var treeTrunkPositionX = 350;
    var treeTrunkPositionY = 600;
    var treeTrunklength = 120;
    var treeTrunkAngle = 0;
    var treeTrunkWidth = 10;
    //var branchInclination = -10; // to draw branch with this angle from parent branch
  	// function to draw on canvas
    var drawfunction = function (startX, startY, len, treeTrunkAngle, branchWidth) {
    ctx.beginPath();
    ctx.save();

    ctx.translate(startX, startY);
    ctx.rotate(treeTrunkAngle * Math.PI/180);
    ctx.moveTo(0, 0);
    // ctx.lineTo(0, -len);
    if(treeTrunkAngle > 0){
      ctx.bezierCurveTo(10,-len/2,10,-len/2,0,-len);
    } else{
      ctx.bezierCurveTo(-10,-len/2,-10,-len/2,0,-len);
    }
    ctx.lineCap = "round";
    ctx.lineWidth = branchWidth;
    ctx.strokeStyle = "darkgreen";
    ctx.fillstyle = "green";


    if(len > 20){
      ctx.strokeStyle = "brown";
    }

    ctx.stroke();

    if(len < 10) {
      ctx.beginPath();
      ctx.arc(0,-len,10,0,Math.PI/2);
      ctx.fill();
      ctx.restore();
      return;
    }

    drawfunction(0, -len, len*0.8, treeTrunkAngle + 10, branchWidth*0.8); //draw left side tree branches on parent branch
                                                          //; multiplication with -ve 1 gives anticlockwise angle
    drawfunction(0, -len, len*0.8, treeTrunkAngle - 10, branchWidth*0.8); //draw right side tree branches on parent branch ; it is +ve with clockwise angle

    ctx.restore();
  }

  //call drawfunction function with the default tree attribute values initialized as global variables;
  drawfunction(treeTrunkPositionX, treeTrunkPositionY, treeTrunklength, treeTrunkAngle, treeTrunkWidth);

  // select all sliders
  var $lengthChanger = $("input[name='treeattributes']");

  // keep check of on input event to make sure every slide is reflected
  $lengthChanger.on("input",function() {
    // clear canvax
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //check what attribute of tree is changed and change the global variable for the same attribute
    switch ($(this).attr('id')) {
      case "lengthvalue": treeTrunklength = $(this).val(); break;
      case "starttrunkangle": treeTrunkAngle = $(this).val(); break;
      case "starttrunkwidth": treeTrunkWidth = $(this).val(); break;
      default: break;
    }

    //draw the tree again with new trunk length value from beginning
    drawfunction(treeTrunkPositionX, treeTrunkPositionY, treeTrunklength, treeTrunkAngle, treeTrunkWidth);
  });
});
