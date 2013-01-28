
Welcome = function () {
	canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var menu = new Image();
    var play = new Image();
    var help = new Image();
	menu.src = "menu.png";
	play.src = "playbutton.png";
	help.src = "helpbutton.png";
	var drawMainMenu = function(){
		ctx.drawImage(menu, 0, 0);  // draw image at (0, 0)
		ctx.drawImage(play, 650,495,110,50);
		ctx.drawImage(help, 800,495,110,50);
	}

	setInterval(drawMainMenu, 1000/20);
}
