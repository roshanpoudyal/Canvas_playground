// Shorthand for $( document ).ready()
$(function() {
    var $body = $("body");
    var canvas = document.getElementById("myCanvas");

	var ctx = canvas.getContext("2d");

	// how many points to draw
	var drawmaxpoints = canvas.width;

	//draw function at half of canvas height
	var normalizeYposition = canvas.height/2;

	//initialize posy variable to be used in function getYposition
	var posy;
	var PI = 3.14;
  var frequency_strength = 80; //the more you increase this unit, the more the frequence and less the wavelength
  var amplitude_strength = 80; // more the magnitude of this unit, the taller is the waveform
	// function to get y postion value based on x position value
	var getYpostion = function(posx){
		posy = normalizeYposition - Math.round((Math.sin(frequency_strength * PI * posx)) * amplitude_strength,2);
    // console.log("point: ()"+posx+","+posy+")\n");
    return posy;
	};

	// function to create a rectangle resembling a pixel (draw rectangle of dimension 1x1)
	var createpixel = function(posx){
		ctx.beginPath();
		ctx.rect(posx, getYpostion(posx) , 1, 1);
		ctx.fillStyle = "red";
		ctx.fill();
	};

  var drawfunction = function(){
    // loop that generates x coordinate for a point and call off to draw a pixel
    for(var x=0; x < drawmaxpoints; x+=1){
      createpixel(x);
    }
  }

  //call drawfunction function
  drawfunction();

});
