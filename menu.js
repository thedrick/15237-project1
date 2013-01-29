Welcome = function () {
	canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    var menu = new Image();
    var play = new Image();
    var help = new Image();
    var highlight = false;
	menu.src = "menu.png";
	play.src = "playbutton.png";
	help.src = "helpbutton.png";
	var drawMainMenu = function(){

		ctx.drawImage(menu, 0, 0);  // draw image at (0, 0)
		//false is play true is help
		if (highlight === false){
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(640, 490, 130, 60);
		}
		else{
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(790,490,130,60);
		}
		ctx.drawImage(play, 650,495,110,50);
		ctx.drawImage(help, 800,495,110,50);
	}

	var onKeyPress = function(event){
    	if (event.keyCode === 39){
    		highlight = true;
    	}
    	else if(event.keyCode === 37){
    		highlight = false;
    	}
    	else if(highlight === false && event.keyCode === 13){
    		window.clearInterval(drawMain);
    		canvas.removeEventListener('keydown',onKeyPress,false);
    		Tutorial();
    		return;
    	}
    	else if(highlight === true && event.keyCode === 13){
    		window.clearInterval(drawMain);
    		canvas.removeEventListener('keydown', onKeyPress, false);
    		Help();
    		return;
    	}
    }

	canvas.addEventListener('keydown', onKeyPress, false);

	canvas.setAttribute('tabindex','0');
	canvas.focus();
	var drawMain = setInterval(drawMainMenu, 1000/20);
}

Help = function (){
	var help = new Image();
	var back = new Image();
	help.src = "helpMenu1.png";
	back.src = "backbutton.png";
	var drawHelpMenu = function(){
		ctx.drawImage(help, 0, 0);  // draw image at (0, 0)
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(790,490,130,60);
		ctx.drawImage(back, 800,495,110,50);

	}

	var onKeyPressHelp = function(event){
		if (event.keyCode ===13){
			window.clearInterval(drawHelp);
			canvas.removeEventListener('keydown', onKeyPressHelp,false);
			Welcome();
			return;
	}
}

	canvas.addEventListener('keydown', onKeyPressHelp, false);
	var drawHelp = setInterval(drawHelpMenu, 1000/20);
}
