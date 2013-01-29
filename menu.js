Welcome = function () {
	canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    var menu = new Image();
	menu.src = "Menu.png";
	var drawMainMenu = function(){

		ctx.drawImage(menu, 0, 0);  // draw image at (0, 0)
	}

	var onKeyPress = function(event){
    	if (event.keyCode === 13){
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
	help.src = "help.png";
	var drawHelpMenu = function(){
		ctx.drawImage(help, 0, 0);  // draw image at (0, 0)
	}

	var onKeyPressHelp = function(event){
		if (event.keyCode === 13){
    		alert("show tutorial");
    	}
	}
	canvas.addEventListener('keydown', onKeyPressHelp, false);
	var drawHelp = setInterval(drawHelpMenu, 1000/20);
}
