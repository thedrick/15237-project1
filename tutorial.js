/* 15-237 Project 1
 * Samaan Ghani (sghani), Tyler Hedrick (thedrick), Peter J. Marino (pmarino)
 * 29 January 2013 
 */
 
 //just handles the tutorial screen 
 //hardcoded in order to ensure design

Tutorial = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  var tutorialbkgd = new Image();
  tutorialbkgd.src = "./resources/tutorial-bkgd.png";
  var tilebkgd = new Image();
  tilebkgd.src = "./resources/tilebkgd.png";
  var largeTile = new Image();
  largeTile.src = "./resources/largetile.png";
  var movePosition = 0;
  var shouldSwitchCounter = 5;
  var shouldSwitch = false;
  var movementSwitch = 15;
  var currentDisplayMovement = 0;
  
  var drawWarrior = function(x, y) {
    ctx.drawImage(characters, charW * movePosition, charH * 2, charW, charH, tileW * x + charWoffset, tileH * y + charHoffset, charW, charH);
  }
  
  var drawArcher = function(x,y) {
      ctx.drawImage(characters, charW * (12 + movePosition), charH * 2, charW, charH, tileW * x + charWoffset, tileH * y + charHoffset, charW, charH);
  }
  
  var drawNinja = function(x,y) {
    ctx.drawImage(characters, charW * (9 +movePosition), charH * 2, charW, charH, tileW * x + charWoffset, tileH * y + charHoffset, charW, charH);
  }
  
  var drawMage = function(x, y) {
    ctx.drawImage(characters, charW * (3 + movePosition), charH * (2 + 4), charW, charH, tileW *x + charWoffset, tileH * y + charHoffset, charW, charH);
  }
  
  var drawCleric = function(x,y) {
    ctx.drawImage(characters, charW * (6 + movePosition), charH * (2 + 4), charW, charH, tileW * x + charWoffset, tileH * y + charHoffset, charW, charH);
  }
  
  var P = function(x, y) {
    this.x = x;
    this.y = y;
  }
  
  var drawTutorialMovement = function() {
    ctx.fillStyle = "rgba(15,150,255, 0.7)";
    var moveBlocksForTut = [new P(19, 1.5), new P(19, 0.5), new P(19, 3.5),
                            new P(18, 1.5), new P(18, 0.5), new P(18, 2.5), new P(18, 3.5),
                            new P(17, 1.5), new P(17, 2.5), new P(17, 3.5),
                            new P(20, 0.5), new P(20, 1.5), new P(20, 2.5), new P(20, 3.5),
                            new P(16, 2.5),
                            new P(21, 1.5), new P(21, 2.5), new P(21, 3.5),
                            new P(22, 2.5)];
    moveBlocksForTut.forEach(function(point) {
      ctx.fillRect(point.x * 40, point.y * 40, 37, 37);
    });
  }
  
  var drawTutorialAttack = function(x, y) {
    ctx.fillStyle = "rgba(20,173,0, 0.7)";
    var attackBlocksForTut = [new P(20, 2.5), new P(18, 2.5), new P(19, 1.5), new P(19, 3.5)];
    attackBlocksForTut.forEach(function(point) {
      ctx.fillRect(point.x * 40, point.y * 40, 37, 37);
    });
  }
  
  var drawTutorialMagic = function(x, y) {
    ctx.fillStyle = "rgba(173,20,0, 0.7)";
    var magicBlocksForTut = [new P(20, 2.5), new P(18, 2.5), new P(19, 1.5), new P(19, 3.5),
                              new P(17, 2.5), new P(18, 1.5), new P(19, 0.5),
                              new P(20, 1.5), new P(21, 2.5), new P(18, 3.5), new P(20, 3.5)];
    magicBlocksForTut.forEach(function(point) {
      ctx.fillRect(point.x * 40, point.y * 40, 37, 37);
    });
  }
  
  var drawTutorial = function() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(tutorialbkgd, 0, 0);
    ctx.drawImage(tilebkgd, 40, 20);
    ctx.drawImage(tilebkgd, 320,20);
    ctx.drawImage(largeTile, 600, 20);
    ctx.drawImage(tilebkgd, 40, 340);
    ctx.drawImage(tilebkgd, 240, 340);
    ctx.drawImage(tilebkgd, 440, 340);
    ctx.drawImage(tilebkgd, 640, 340);
    ctx.drawImage(tilebkgd, 840, 340);
    if (shouldSwitchCounter !== 0) shouldSwitchCounter--;
    else {
      switch(movePosition) {
        case 0:
          movePosition = 1;
          break;
        case 1:
        if (shouldSwitch) {
            movePosition = 2;
          } else {
            movePosition = 0
          }
          shouldSwitch = !shouldSwitch
          break
        default:
          movePosition = 1;
          break;
      }
      shouldSwitchCounter = 5;
    }
    drawWarrior(2, 1.5);
    drawCharacterSide(ctx, 2, 1.5, 1, true);
    drawArcher(9, 0.5);
    drawCharacterSide(ctx, 9, 0.5, 1, false);
    drawNinja(8, 1.5);
    drawCharacterSide(ctx, 8, 1.5, 1, true);
    drawMage(10, 1.5);
    drawCharacterSide(ctx, 10, 1.5, 2, false);
    drawCleric(9, 2.5);
    drawCharacterSide(ctx, 9, 2.5, 2, false);
    
    drawWarrior(2, 9.5);
    drawArcher(7, 9.5);
    drawNinja(12, 9.5);
    drawMage(17, 9.5);
    drawCleric(22, 9.5);
    
    drawMage(19, 2.5);
    if (movementSwitch !== 0) movementSwitch--;
    else {
      movementSwitch = 15;
      currentDisplayMovement = (currentDisplayMovement + 1) % 3;
    }
    switch(currentDisplayMovement) {
      case 0:
        drawTutorialMovement();
        break;
      case 1:
        drawTutorialMagic();
        break;
      default:
        drawTutorialAttack();
        break
    }
  }
    
  
  var drawInt = setInterval(drawTutorial, 1000 / 30);
  
  var tutorialKeyPress = function(event){
    if (event.keyCode === 13) {
      canvas.removeEventListener('keydown', tutorialKeyPress, false);
      clearInterval(drawInt);
      App();
    }
  }
  
  canvas.addEventListener('keydown', tutorialKeyPress, false);
}