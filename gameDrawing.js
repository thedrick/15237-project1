/* 15-237 Project 1
 * Samaan Ghani (sghani), Tyler Hedrick (thedrick), Peter J. Marino (pmarino)
 * 29 January 2013 
 */
 
 
 //does all the drawing.

// SCRIPT 1 DRAWING CODE
canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  tileset = new Image();
  tileset.src = "./resources/16tiles.png";
  characters = new Image();
  characters.src = "./resources/characters.png";
  
  // tile constants
  tileH = 40;
  tileW = 40;
  tileSize = 16;

  // characters constants
  charH = 36;
  charW = 32;
  charWoffset = 3;
  charHoffset = 2;
  
grid = [['GG', 'GG', 'GG', 'RP', 'RP', 'GG', 'GG', 'PL', 'PB', 'PC', 'PC', 'PC', 'PR', 'GG', 'PL', 'DN', 'DN', 'PR', 'RP', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'PL', 'DN', 'PR', 'GG', 'GG', 'GG', 'GG', 'GG', 'DG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG'],
        ['GG', 'GG', 'DG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'PL', 'DN', 'PR', 'GG', 'GG', 'GG', 'RP', 'DG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'TG', 'GG', 'PL', 'DN', 'DN', 'PR', 'GG', 'GG', 'GG', 'RP', 'DG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'PL', 'DN', 'PR', 'TG', 'GG', 'GG', 'GG', 'DG', 'GG', 'GG', 'LF', 'GG', 'GG', 'SF', 'GG', 'GG', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'PL', 'DN', 'DN', 'PR', 'TG', 'BG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'LF', 'GG', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'PL', 'DN', 'DN', 'PR', 'GG', 'GG', 'GG', 'GG', 'RP', 'GG', 'GG', 'GG', 'GG', 'SF', 'SF', 'GG', 'LF', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'GG', 'TG', 'TG', 'PL', 'DN', 'PR', 'GG', 'GG', 'GG', 'GG', 'RP', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'SF', 'GG', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'GG', 'TG', 'BG', 'PL', 'DN', 'DN', 'PR', 'GG', 'GG', 'GG', 'BG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'BG', 'TG', 'PL', 'DN', 'DN', 'DN', 'PR', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'DG', 'GG', 'GG'],
        ['GG', 'TG', 'GG', 'TG', 'GG', 'GG', 'GG', 'BG', 'GG', 'GG', 'PL', 'DN', 'PR', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'LF', 'GG', 'GG', 'GG', 'GG', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'GG', 'TG', 'GG', 'GG', 'GG', 'GG', 'PL', 'DN', 'DN', 'DN', 'PR', 'GG', 'GG', 'GG', 'SF', 'DG', 'GG', 'GG', 'GG', 'GG', 'GG'],
        ['GG', 'GG', 'GG', 'GG', 'SF', 'GG', 'SF', 'GG', 'GG', 'GG', 'GG', 'GG', 'PL', 'DN', 'DN', 'PR', 'GG', 'SF', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG'],
        ['TG', 'BG', 'GG', 'GG', 'SF', 'SF', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'PL', 'DN', 'PR', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG', 'GG'],
        ['TG', 'TG', 'GG', 'LF', 'GG', 'GG', 'GG', 'LF', 'GG', 'GG', 'GG', 'GG', 'GG', 'PL', 'DN', 'PR', 'GG', 'GG', 'GG', 'SF', 'GG', 'GG', 'GG', 'GG', 'GG']];
        
// draw the tile at i,j from the gameboard grid.
drawTile = function(ctx, i, j) {
    var x = 0;
    var y = 0;
    switch(grid[j][i]) {
        case 'GG': // Green grass
          x = 1;
          break;
        case 'TG': // tall grass
          x = 1;
          y = 2;
          break;
        case 'BG': // bush in grass
          x = 2;
          y = 2;
          break;
        case 'SF': // small flowers
          x = 1;
          y = 1;
          break;
        case 'LF': // large flowers
          x = 2;
          y = 1;
          break;
        case 'DG': // dark grass
          x = 1;
          y = 6;
          break;
        case 'RP': // rock pile
          x = 2;
          break;
        case 'PA': // dirt path part A 
          x = 5;
          break;
        case 'PB': // dirt path part B
          x = 6;
          break;
        case 'PC': // dirt path part C
          x = 7;
          break;
        case 'PL': // dirt path left side
          x = 5;
          y = 2;
          break;
        case 'DN': // dirt normal
          x = 4;
          y = 2;
          break;
        case 'PR': // dirt path right side
          x = 6;
          y = 2;
          break;
        default:
          break;
    }
    ctx.drawImage(tileset, x*tileSize, y*tileSize, tileSize, tileSize, tileW*i, tileH*j, tileW, tileH);
}

// check if the tile at newX, newY is occupied by another character.
alreadyOccupied = function(newX, newY) {
  isOccupied = false;
  characterSet.forEach(function(c) {
    if (c.x === newX && c.y === newY) {
      isOccupied = c;
    }
  });
  return isOccupied;
}

//draw arrow on the action menu that has magic option.
drawActionMagicMenuArrow = function(ctx) {
    var x = 20;
    var y = 0;
    switch (currentActionItem) {
        case 0: // Move
          y = canvas.height - 195;
          break;
        case 1: // Attack
          y = canvas.height - 145;
          break;
		    case 2: // Attack
          y = canvas.height - 95;
          break;
        case 3: // Wait
          y = canvas.height - 45;
          break;
        default:
          y = canvas.height - 195;
          break;
    }
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x , y)
    ctx.lineTo(x, y + 16);
    ctx.lineTo(x + 16, y + 8);
    ctx.closePath();
    ctx.fill();
}

// Creates an arrow in the action menu.
drawActionMenuArrow = function(ctx) {
    var x = 20;
    var y = 0;
    switch (currentActionItem) {
        case 0: // Move
          y = canvas.height - 145;
          break;
        case 1: // Attack
          y = canvas.height - 95;
          break;
        case 2: // Wait
          y = canvas.height - 45;
          break;
        default:
          y = canvas.height - 145;
          break;
    }
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x , y)
    ctx.lineTo(x, y + 16);
    ctx.lineTo(x + 16, y + 8);
    ctx.closePath();
    ctx.fill();
}

//var neighbors = new Array();  

containsmovement = function(x,y) {
  for (var i = 0; i < neighbors.length; i++) {
    var x1 = neighbors[i][0];
    var y1 = neighbors[i][1]
    if (x1 == x && y1 == y ) {
      return true;
    }
  }
  return false;
}

// Overlay a blue square on tiles where the selected player is allowed to move.
drawMovementSquares = function(ctx, n, xLoc, yLoc) {
  ctx.fillStyle = "rgba(15,150,255, 0.7)";
  if (n === -1) {
    return;
  } else {
      if(!containsmovement(xLoc, yLoc)) {
        var coord = new Array(2);
        coord[0] = xLoc;
        coord[1] = yLoc;
        neighbors.push(coord);
      }
      drawMovementSquares(ctx, n-1, xLoc - 1, yLoc);
      drawMovementSquares(ctx, n-1, xLoc + 1, yLoc);
      drawMovementSquares(ctx, n-1, xLoc, yLoc + 1);
      drawMovementSquares(ctx, n-1, xLoc, yLoc - 1);
  }
}

containsattack = function(x,y) {
  for (var i = 0; i < attack.length; i++) {
    var x1 = attack[i][0];
    var y1 = attack[i][1]
    if (x1 == x && y1 == y ) {
      return true;
  }
}

return false;

}
// Overlay a green square on tiles where the selected player is allowed to attack.
drawAttackSquares = function(ctx, n, xLoc, yLoc) {
  ctx.fillStyle = "rgba(20,173,0, 0.7)";
  if (n === -1) {
    return;
    } else {
      if(!containsattack(xLoc, yLoc)) {
        var coord = new Array(2);
        coord[0] = xLoc;
        coord[1] = yLoc;
        attack.push(coord);
      }  
      drawAttackSquares(ctx, n-1, xLoc - 1, yLoc);
      drawAttackSquares(ctx, n-1, xLoc + 1, yLoc);
      drawAttackSquares(ctx, n-1, xLoc, yLoc + 1);
      drawAttackSquares(ctx, n-1, xLoc, yLoc - 1);
  }
  attack.forEach(function(a) {
    var attackingCharacter = alreadyOccupied(a[0], a[1]);
    if (!!attackingCharacter && attackingCharacter !== selectedCharacter) {
      attackingCharacter.isBeingAttacked = true;
    }
  });
}

containsmagic = function(x,y) {
  for (var i = 0; i < magic.length; i++) {
    var x1 = magic[i][0];
    var y1 = magic[i][1]
    if (x1 == x && y1 == y ) {
      return true;
  }
}
return false;
}
// Overlay a red square on tiles where the selected player is allowed to magically attack.
drawMagicSquares = function(ctx, n, xLoc, yLoc) {
  ctx.fillStyle = "rgba(173,20,0, 0.7)";
  if (n === -1) {
    return;
    } else {
      if(!containsmagic(xLoc, yLoc))
      {
        var coord = new Array(2);
        coord[0] = xLoc;
        coord[1] = yLoc;
        magic.push(coord);
      }  
      drawMagicSquares(ctx, n-1, xLoc - 1, yLoc);
      drawMagicSquares(ctx, n-1, xLoc + 1, yLoc);
      drawMagicSquares(ctx, n-1, xLoc, yLoc + 1);
      drawMagicSquares(ctx, n-1, xLoc, yLoc - 1);
  }
  magic.forEach(function(a) {
    var attackingCharacter = alreadyOccupied(a[0], a[1]);
    if (!!attackingCharacter && attackingCharacter !== selectedCharacter) {
      attackingCharacter.isBeingMagicked = true;
    }
  });
}

// Draws the action menu and sets actionMenuShowing state to true. When this state is
// true the player can only move the arrow in the menu and must make a selection or hit
// ESC to exit the action menu.
drawActionMenu = function(ctx, c) {
  if (currentActionItem === 0) {
    if (!c.hasMoved) {
      drawMovementSquares(ctx, c.movementRange, c.x, c.y);
      for(var k=0; k<neighbors.length; k++){
          var xcord = neighbors[k][0];
          var ycord = neighbors[k][1];
          ctx.fillRect(tileW*xcord, tileH*ycord, 37,37);
      }
    }
  } else if (currentActionItem === 1) {
    if (!c.hasAttacked) {
      drawAttackSquares(ctx, c.attackRange, c.x, c.y);
      for(var k=0; k<attack.length; k++){
          var xcord = attack[k][0];
          var ycord = attack[k][1];
          ctx.fillRect(tileW*xcord, tileH*ycord, 37,37);
      }
	}
  }
  characterSet.forEach(function(c) {
    if (currentActionItem == 0) {
      drawTile(ctx, Math.round(c.x), Math.round(c.y));
    }
  });
  ctx.fillStyle = "rgba(217, 150, 35, 0.6)";
  ctx.fillRect(10, canvas.height - 160, 135, 150);
  ctx.font = "24px Croissant One";
  ctx.fillStyle = "black";
  ctx.textAlign = "center"
  var x = 150 / 2 + 10;
  ctx.fillText("Move", x, canvas.height - 130);
  ctx.fillText("Attack", x, canvas.height - 80);
  ctx.fillText("Wait", x, canvas.height - 30);
  drawActionMenuArrow(ctx);
  actionMenuShowing = true;
}


drawActionMagicMenu = function(ctx, c) {
  if (currentActionItem === 0) {
    if (!c.hasMoved) {
      drawMovementSquares(ctx, c.movementRange, c.x, c.y);
      for(var k=0; k<neighbors.length; k++){
          var xcord = neighbors[k][0];
          var ycord = neighbors[k][1];
          ctx.fillRect(tileW*xcord, tileH*ycord, 37,37);
      }
    }
  } else if (currentActionItem === 1) {
    if (!c.hasAttacked) {
      drawAttackSquares(ctx, c.attackRange, c.x, c.y);
      for(var k=0; k<attack.length; k++){
          var xcord = attack[k][0];
          var ycord = attack[k][1];
          ctx.fillRect(tileW*xcord, tileH*ycord, 37,37);
      }
	}
  }
  else if (currentActionItem === 2) {
    if (!c.hasAttacked && hasMP(c)) {
      drawMagicSquares(ctx, c.magicRange, c.x, c.y);
      for(var k=0; k<magic.length; k++){
          var xcord = magic[k][0];
          var ycord = magic[k][1];
          ctx.fillRect(tileW*xcord, tileH*ycord, 37,37);
      }
	}
  }
  characterSet.forEach(function(c) {
    if (currentActionItem == 0) {
      drawTile(ctx, Math.round(c.x), Math.round(c.y));
    }
  });
  ctx.fillStyle = "rgba(217, 150, 35, 0.6)";
  ctx.fillRect(10, canvas.height - 210, 135, 200);
  ctx.font = "24px Croissant One";
  ctx.fillStyle = "black";
  ctx.textAlign = "center"
  var x = 150 / 2 + 10;
  ctx.fillText("Move", x, canvas.height - 180);
  ctx.fillText("Attack", x, canvas.height - 130);
  if (c.name !== "Cleric") 
    ctx.fillText("Magic", x, canvas.height - 80);
  else 
    ctx.fillText("Heal", x, canvas.height - 80);
  ctx.fillText("Wait", x, canvas.height - 30);
  drawActionMagicMenuArrow(ctx);
  actionMenuShowing = true;
}

// Draws the selected player's status in the right hand corner of the screen
// This displays the character's name, hp, and mp.
drawStatusBox = function(ctx, c) {
  ctx.fillStyle = "rgba(217, 150, 35, 0.6)";
  ctx.fillRect(canvas.width - 300, 10, 290, 80);
  ctx.font = "16px Croissant One";
  ctx.fillStyle = "rgba(0,0,0,.7)";
  ctx.textAlign = "left";
  // Drop shadow
  ctx.fillText("Name:    " + c.name, canvas.width - 292, 31);
  ctx.fillText("HP:", canvas.width - 267, 56);
  ctx.fillText("MP:", canvas.width - 267, 81);
  ctx.fillStyle = "white";
  ctx.fillText("Name:    " + c.name, canvas.width - 290, 30);
  ctx.fillText("HP:", canvas.width - 265, 55);
  ctx.fillText("MP:", canvas.width - 265, 80);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(canvas.width - 215, 45, 180, 10);
  ctx.strokeRect(canvas.width - 215, 70, 180, 10);
  ctx.fillStyle = "green";
  ctx.fillRect(canvas.width - 215, 45, 180 * (c.hp / c.maxHp), 10);
  ctx.fillStyle = "rgb(28, 95, 212)";
  ctx.fillRect(canvas.width - 215, 70, 180 * (c.mp / c.maxMp), 10);
  ctx.fillStyle = "white";
  ctx.fillText(c.hp + " / " + c.maxHp, canvas.width - 150, 55);
  if (c.maxMp <= 1)
       ctx.fillText("0 / 0", canvas.width - 142, 80);
  else 
    ctx.fillText(c.mp + " / " + c.maxMp, canvas.width - 150, 80);
}

drawDirectionArrowUp = function(ctx, x, y, shouldFill) {
  // Up arrow
  ctx.beginPath();
  ctx.moveTo(tileW * x + 12, tileH * y - 5);
  ctx.lineTo(tileW * x + 20, tileH * y - 13);
  ctx.lineTo(tileW * x + 28, tileH * y - 5);
  ctx.closePath();
  if (shouldFill) {
   ctx.fill();
  } else {
   ctx.stroke();
  }
}

drawDirectionArrowLeft = function(ctx, x, y, shouldFill) {
  ctx.beginPath();
  ctx.moveTo(tileW * x - 5, tileH * y + 12);
  ctx.lineTo(tileW * x - 13, tileH * y + 20);
  ctx.lineTo(tileW * x - 5, tileH * y + 28);
  ctx.closePath();
  if (shouldFill) {
    ctx.fill();
  } else {
    ctx.stroke(); 
  }
}

drawDirectionArrowRight = function(ctx, x, y, shouldFill) {
  ctx.beginPath();
  ctx.moveTo(tileW * (x + 1) + 5, tileH * y + 12);
  ctx.lineTo(tileW * (x + 1) + 13, tileH * y + 20);
  ctx.lineTo(tileW * (x + 1) + 5, tileH * y + 28);
  ctx.closePath();
  if (shouldFill) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

drawDirectionArrowDown = function(ctx, x, y, shouldFill) {
  ctx.beginPath();
  ctx.moveTo(tileW * x + 12, tileH * (y + 1) + 5);
  ctx.lineTo(tileW * x + 20, tileH * (y + 1) + 13);
  ctx.lineTo(tileW * x + 28, tileH * (y + 1) + 5);
  ctx.closePath();
  if (shouldFill) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

drawWaitingArrows = function(ctx, c) {
  // Up arrow
  ctx.strokeStyle = "rgb(245, 196, 0)";
  ctx.lineWidth = 2;
  drawDirectionArrowUp(ctx, c.x, c.y, false);
  drawDirectionArrowLeft(ctx, c.x, c.y, false);
  drawDirectionArrowRight(ctx, c.x, c.y, false);
  drawDirectionArrowDown(ctx, c.x, c.y, false);
  ctx.fillStyle = "rgb(245, 196, 0)";
  switch (c.direction) {
    case 0:
      drawDirectionArrowUp(ctx, c.x, c.y, true);
      break;
    case 1:
      drawDirectionArrowRight(ctx, c.x, c.y, true);
      break;
    case 2:
      drawDirectionArrowDown(ctx, c.x, c.y, true);
      break;
    case 3:
      drawDirectionArrowLeft(ctx, c.x, c.y, true);
      break;
    default:
      break;
  }
}

// loads the gamemap by looping through the grid and drawing each tile.
loadmap = function(ctx) {
  var x = 0;
  var y = 0;
  for (i = 0; i < grid[0].length; i++) {
    for (j = 0; j < grid.length; j++) {
      drawTile(ctx, i,j);
    }
  }
}

circle = function(ctx, cx, cy, radius) {
  ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
}

drawCharacterSide = function(ctx, x, y, team, b) {
  if (team === 1) {
	ctx.fillStyle = "blue";
	}
  if (team === 2) {
	ctx.fillStyle = "red";
	}
  ctx.beginPath();
  circle(ctx, tileW * (x + 1) - 6,tileH * y + 4, 3);
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  circle(ctx, tileW * (x + 1) - 6, tileH * y + 4, 3);
  if (b) ctx.stroke();
}

drawDamageMagic = function(ctx, x, y, amt, count) {
	//if (count === 0) return;
	console.log("in the function");
	ctx.font = "18px Croissant One";
	ctx.textAlign = "center"
	if (amt >= 0) {
	ctx.fillStyle = "black";
	ctx.fillText("-" + amt, x*tileW + 4*tileW/10 - 0.5, y*tileH - (20 - count) + 0.5);
	ctx.fillStyle = "red";
	ctx.fillText("-" + amt, x*tileW + 4*tileW/10, y*tileH - (20 - count));
	}
	else {
	ctx.fillStyle = "white";
	ctx.fillText("+" + Math.abs(amt), x*tileW + 4*tileW/10 - 0.5, y*tileH - (20 - count) + 0.5);
	ctx.fillStyle = "blue";
	ctx.fillText("+" + Math.abs(amt), x*tileW + 4*tileW/10, y*tileH - (20 - count));
	}
	
}