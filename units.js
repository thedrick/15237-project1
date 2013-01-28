// SCRIPT 2 - contains unit definitions for the game.
// Character classes //

//@TODO pmarino: decide reasonable damage values.
//@TODO pmarino: turn-by-turn incremental restoration of MP

Archer = function(ctx, x, y,team) {
  this.x = x;
  this.y = y;
  this.team = team;
  this.movementRange = 4;
  this.attackRange = 4;
  this.uid = uidGen();
  
  this.attackStrength = 13 //magic number 
  this.isMagical = false;
  this.hp = 50;
  this.maxHp = 50;
  this.mp = 0;
  this.maxMp = 0;
  this.name = "Archer";
  this.direction = 2;
  this.isSelected = false;
  this.isMoving = false;
  this.isAttacking = false;
  this.isMagicking = false;
  this.hasMoved = false;
  this.hasAttacked = false;
  this.myTurn = ((team === currentPlayer) ? true : false);
  
  // The character should move this much 
  this.shouldMoveLeft = 0;
  this.shouldMoveUp = 0;
  this.shouldMoveRight = 0;
  this.shouldMoveDown = 0;
  this.movePosition = 1;
  this.changeDirectionCounter = 20;
  this.movementDirections = [];
  this.shouldSwitch = false;
  
  this.moveLeft = function(ctx) {
    if (this.shouldMoveLeft === 0) return;
    this.direction = 3;
    this.x -= .05;
    this.shouldMoveLeft--;
    if (this.shouldMoveLeft < 0) {
      this.shouldMoveLeft = 0;
    } else if (this.shouldMoveLeft === 0) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveLeft >= 10) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    }
  }
  this.moveRight = function(ctx) {
    if (this.shouldMoveRight === 0) return;
    this.direction = 1;
    this.x += .05;
    this.shouldMoveRight--;
    if (this.shouldMoveRight < 0) {
      this.shouldMoveRight = 0;
    } else if (this.shouldMoveRight === 0) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    }
  }
  this.moveDown = function(ctx) {
    if (this.shouldMoveDown === 0) return;
    this.direction = 2;
    this.y += .05;
    this.shouldMoveDown--;
    if (this.shouldMoveDown < 0) {
      this.shouldMoveDown = 0;
    } else if (this.shouldMoveDown === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    }
  }
  this.moveUp = function(ctx) {
    if (this.shouldMoveUp === 0) return;
    this.direction = 0;
    this.y -= .05;
    this.shouldMoveUp--;
    if (this.shouldMoveUp < 0) {
      this.shouldMoveUp = 0;
    } else if (this.shouldMoveUp === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveUp >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
  }
  this.setNewDirection = function() {
    if (this.changeDirectionCounter === 20 && this.movementDirections.length !== 0) {
      console.log(this.movementDirections)
      var newDirection = this.movementDirections.shift()
      newDirection();
      this.changeDirectionCounter--;
    } else if (this.changeDirectionCounter === 0) {
      this.changeDirectionCounter = 20;
    } else {
      this.changeDirectionCounter--;
    }
  }
  
  this.draw = function(ctx) {
    // Make the character move and make sure we draw the tiles too.
    //ctx.clearRect(this.x * tileW, this.y *tileH, 40, 40);
    drawTile(ctx, Math.round(this.x), Math.round(this.y));
    if (this.shouldMoveRight !== 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
    if (this.shouldMoveLeft !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    if (this.shouldMoveUp !== 0)
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    if (this.shouldMoveDown !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
	this.setNewDirection();
  this.moveLeft(ctx);
  this.moveRight(ctx);
  this.moveDown(ctx);
  this.moveUp(ctx);
  ctx.drawImage(characters, charW * (12 + this.movePosition), charH * this.direction, charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
  if ((!(this.hasMoved && this.hasAttacked)) && (this.myTurn))
    drawCharacterSide(ctx, this.x, this.y, this.team,true);
  else drawCharacterSide(ctx, this.x, this.y, this.team, false);
  switch(this.movePosition) {
    case 0:
      this.movePosition = 1;
      break;
    case 1:
    if (this.shouldSwitch) {
        this.movePosition = 2;
      } else {
        this.movePosition = 0
      }
      this.shouldSwitch = !this.shouldSwitch
      break
    default:
      this.movePosition = 1;
      break;
  }
  }
}


// Represents a Warrior unit in the game.
Warrior = function(ctx, x, y,team) {
  this.x = x;
  this.y = y;
  this.team = team;
  this.movementRange = 3;
  this.attackRange = 1;
  this.uid = uidGen();
  
  this.attackStrength = 26 //magic number 
  this.isMagical = false;
  this.hp = 75;
  this.maxHp = 75;
  this.mp = 0;
  this.maxMp = 0;
  this.name = "Warrior";
  this.direction = 2;
  this.isSelected = false;
  this.isMoving = false;
  this.isAttacking = false;
  this.isMagicking = false;
  this.hasMoved = false;
  this.hasAttacked = false;
  this.myTurn = ((team === currentPlayer) ? true : false);
  
  // The character should move this much 
  this.shouldMoveLeft = 0;
  this.shouldMoveUp = 0;
  this.shouldMoveRight = 0;
  this.shouldMoveDown = 0;
  this.movePosition = 1;
  this.changeDirectionCounter = 20;
  this.movementDirections = [];
  this.shouldSwitch = false;
  
  this.moveLeft = function(ctx) {
    if (this.shouldMoveLeft === 0) return;
    this.direction = 3;
    this.x -= .05;
    this.shouldMoveLeft--;
    if (this.shouldMoveLeft < 0) {
      this.shouldMoveLeft = 0;
    } else if (this.shouldMoveLeft === 0) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveLeft >= 10) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    }
  }
  this.moveRight = function(ctx) {
    if (this.shouldMoveRight === 0) return;
    this.direction = 1;
    this.x += .05;
    this.shouldMoveRight--;
    if (this.shouldMoveRight < 0) {
      this.shouldMoveRight = 0;
    } else if (this.shouldMoveRight === 0) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    }
  }
  this.moveDown = function(ctx) {
    if (this.shouldMoveDown === 0) return;
    this.direction = 2;
    this.y += .05;
    this.shouldMoveDown--;
    if (this.shouldMoveDown < 0) {
      this.shouldMoveDown = 0;
    } else if (this.shouldMoveDown === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    }
  }
  this.moveUp = function(ctx) {
    if (this.shouldMoveUp === 0) return;
    this.direction = 0;
    this.y -= .05;
    this.shouldMoveUp--;
    if (this.shouldMoveUp < 0) {
      this.shouldMoveUp = 0;
    } else if (this.shouldMoveUp === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveUp >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
  }
  this.setNewDirection = function() {
    if (this.changeDirectionCounter === 20 && this.movementDirections.length !== 0) {
      console.log(this.movementDirections)
      var newDirection = this.movementDirections.shift()
      newDirection();
      this.changeDirectionCounter--;
    } else if (this.changeDirectionCounter === 0) {
      this.changeDirectionCounter = 20;
    } else {
      this.changeDirectionCounter--;
    }
  }
  
  this.draw = function(ctx) {
    // Make the character move and make sure we draw the tiles too.
    //ctx.clearRect(this.x * tileW, this.y *tileH, 40, 40);
    drawTile(ctx, Math.round(this.x), Math.round(this.y));
    if (this.shouldMoveRight !== 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
    if (this.shouldMoveLeft !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    if (this.shouldMoveUp !== 0)
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    if (this.shouldMoveDown !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
	this.setNewDirection();
  this.moveLeft(ctx);
  this.moveRight(ctx);
  this.moveDown(ctx);
  this.moveUp(ctx);
  ctx.drawImage(characters, charW * this.movePosition, charH * this.direction, charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
  if ((!(this.hasMoved && this.hasAttacked)) && (this.myTurn))
    drawCharacterSide(ctx, this.x, this.y, this.team,true);
  else drawCharacterSide(ctx, this.x, this.y, this.team, false);
  switch(this.movePosition) {
    case 0:
      this.movePosition = 1;
      break;
    case 1:
    if (this.shouldSwitch) {
        this.movePosition = 2;
      } else {
        this.movePosition = 0
      }
      this.shouldSwitch = !this.shouldSwitch
      break
    default:
      this.movePosition = 1;
      break;
  }
  }
}

Mage = function(ctx, x, y,team) {

this.team = team;
   this.x = x;
   this.y = y;
   this.movementRange = 3;
   this.attackRange = 1;
   this.uid = uidGen();
   this.isMagical = true;
   this.magicRange = 2;
   this.attackStrength = 12 //magic numbers
   this.magicStrength = 30
  this.magicCost = 40
   
   this.hp = 45;
   this.maxHp = 45;
   this.mp = 40;
   this.maxMp = 40;
   this.name = "Mage";
   this.direction = 2;
   this.isSelected = false;
   this.isMoving = false;
   this.isAttacking = false;
   this.isMagicking = false;
   this.hasMoved = false;
   this.hasAttacked = false;
  this.myTurn = ((team === currentPlayer) ? true : false);

  // The character should move this much 
  this.shouldMoveLeft = 0;
  this.shouldMoveUp = 0;
  this.shouldMoveRight = 0;
  this.shouldMoveDown = 0;
  this.movePosition = 1;
  this.changeDirectionCounter = 20;
  this.movementDirections = [];
  this.shouldSwitch = false;
  
  this.moveLeft = function(ctx) {
    if (this.shouldMoveLeft === 0) return;
    this.direction = 3;
    this.x -= .05;
    this.shouldMoveLeft--;
    if (this.shouldMoveLeft < 0) {
      this.shouldMoveLeft = 0;
    } else if (this.shouldMoveLeft === 0) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveLeft >= 10) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    }
  }
  this.moveRight = function(ctx) {
    if (this.shouldMoveRight === 0) return;
    this.direction = 1;
    this.x += .05;
    this.shouldMoveRight--;
    if (this.shouldMoveRight < 0) {
      this.shouldMoveRight = 0;
    } else if (this.shouldMoveRight === 0) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    }
  }
  this.moveDown = function(ctx) {
    if (this.shouldMoveDown === 0) return;
    this.direction = 2;
    this.y += .05;
    this.shouldMoveDown--;
    if (this.shouldMoveDown < 0) {
      this.shouldMoveDown = 0;
    } else if (this.shouldMoveDown === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    }
  }
  this.moveUp = function(ctx) {
    if (this.shouldMoveUp === 0) return;
    this.direction = 0;
    this.y -= .05;
    this.shouldMoveUp--;
    if (this.shouldMoveUp < 0) {
      this.shouldMoveUp = 0;
    } else if (this.shouldMoveUp === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveUp >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
  }
  this.setNewDirection = function() {
    if (this.changeDirectionCounter === 20 && this.movementDirections.length !== 0) {
      console.log(this.movementDirections)
      var newDirection = this.movementDirections.shift()
      newDirection();
      this.changeDirectionCounter--;
    } else if (this.changeDirectionCounter === 0) {
      this.changeDirectionCounter = 20;
    } else {
      this.changeDirectionCounter--;
    }
  }
  
  this.draw = function(ctx) {
    // Make the character move and make sure we draw the tiles too.
    //ctx.clearRect(this.x * tileW, this.y *tileH, 40, 40);
    drawTile(ctx, Math.round(this.x), Math.round(this.y));
    if (this.shouldMoveRight !== 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
    if (this.shouldMoveLeft !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    if (this.shouldMoveUp !== 0)
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    if (this.shouldMoveDown !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
	this.setNewDirection();
  this.moveLeft(ctx);
  this.moveRight(ctx);
  this.moveDown(ctx);
  this.moveUp(ctx);
  ctx.drawImage(characters, charW * (3 + this.movePosition), charH * (this.direction + 4), charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
  if ((!(this.hasMoved && this.hasAttacked)) && (this.myTurn))
    drawCharacterSide(ctx, this.x, this.y, this.team,true);
  else drawCharacterSide(ctx, this.x, this.y, this.team, false);
  switch(this.movePosition) {
    case 0:
      this.movePosition = 1;
      break;
    case 1:
    if (this.shouldSwitch) {
        this.movePosition = 2;
      } else {
        this.movePosition = 0
      }
      this.shouldSwitch = !this.shouldSwitch
      break
    default:
      this.movePosition = 1;
      break;
  }
  }
}

Ninja = function(ctx, x, y,team) {

  this.x = x;
  this.y = y;
  this.team = team;
  this.movementRange = 5;
   this.attackRange = 1;
   this.magicRange = 1;
   this.magicCost = 15;
   this.magicStrength = 20
   this.isMagical = true;
   this.uid = uidGen();
   
   this.attackStrength = 16 //magic number 
  
   this.hp = 45;
   this.maxHp = 45;
   this.mp = 20;
   this.maxMp = 20;
   this.name = "Ninja";
   this.direction = 2;
   this.isSelected = false;
   this.isMoving = false;
   this.isAttacking = false;
   this.isMagicking = false;
   this.hasMoved = false;
   this.hasAttacked = false;
   this.myTurn = ((team === currentPlayer) ? true : false);
 
  // The character should move this much 
  this.shouldMoveLeft = 0;
  this.shouldMoveUp = 0;
  this.shouldMoveRight = 0;
  this.shouldMoveDown = 0;
  this.movePosition = 1;
  this.changeDirectionCounter = 20;
  this.movementDirections = [];
  this.shouldSwitch = false;
  
  this.moveLeft = function(ctx) {
    if (this.shouldMoveLeft === 0) return;
    this.direction = 3;
    this.x -= .05;
    this.shouldMoveLeft--;
    if (this.shouldMoveLeft < 0) {
      this.shouldMoveLeft = 0;
    } else if (this.shouldMoveLeft === 0) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveLeft >= 10) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    }
  }
  this.moveRight = function(ctx) {
    if (this.shouldMoveRight === 0) return;
    this.direction = 1;
    this.x += .05;
    this.shouldMoveRight--;
    if (this.shouldMoveRight < 0) {
      this.shouldMoveRight = 0;
    } else if (this.shouldMoveRight === 0) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    }
  }
  this.moveDown = function(ctx) {
    if (this.shouldMoveDown === 0) return;
    this.direction = 2;
    this.y += .05;
    this.shouldMoveDown--;
    if (this.shouldMoveDown < 0) {
      this.shouldMoveDown = 0;
    } else if (this.shouldMoveDown === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    }
  }
  this.moveUp = function(ctx) {
    if (this.shouldMoveUp === 0) return;
    this.direction = 0;
    this.y -= .05;
    this.shouldMoveUp--;
    if (this.shouldMoveUp < 0) {
      this.shouldMoveUp = 0;
    } else if (this.shouldMoveUp === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveUp >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
  }
  this.setNewDirection = function() {
    if (this.changeDirectionCounter === 20 && this.movementDirections.length !== 0) {
      console.log(this.movementDirections)
      var newDirection = this.movementDirections.shift()
      newDirection();
      this.changeDirectionCounter--;
    } else if (this.changeDirectionCounter === 0) {
      this.changeDirectionCounter = 20;
    } else {
      this.changeDirectionCounter--;
    }
  }
  
  this.draw = function(ctx) {
    // Make the character move and make sure we draw the tiles too.
    //ctx.clearRect(this.x * tileW, this.y *tileH, 40, 40);
    drawTile(ctx, Math.round(this.x), Math.round(this.y));
    if (this.shouldMoveRight !== 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
    if (this.shouldMoveLeft !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    if (this.shouldMoveUp !== 0)
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    if (this.shouldMoveDown !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
	this.setNewDirection();
  this.moveLeft(ctx);
  this.moveRight(ctx);
  this.moveDown(ctx);
  this.moveUp(ctx);
  ctx.drawImage(characters, charW * (9 + this.movePosition), charH * this.direction, charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
  if ((!(this.hasMoved && this.hasAttacked)) && (this.myTurn))
    drawCharacterSide(ctx, this.x, this.y, this.team,true);
  else drawCharacterSide(ctx, this.x, this.y, this.team, false);
  switch(this.movePosition) {
    case 0:
      this.movePosition = 1;
      break;
    case 1:
    if (this.shouldSwitch) {
        this.movePosition = 2;
      } else {
        this.movePosition = 0
      }
      this.shouldSwitch = !this.shouldSwitch
      break
    default:
      this.movePosition = 1;
      break;
  }
  }
}

Cleric = function(ctx, x, y,team) {
  this.x = x;
   this.y = y;
   this.team = team;
   this.movementRange = 3;
   this.attackRange = 1;
   this.magicRange = 1;
   this.isMagical = true;
   this.uid = uidGen();
   
   this.attackStrength = 5
   this.magicStrength = -25 //magic number
   this.magicCost = 20
   
   this.hp = 45;
   this.maxHp = 45;
   this.mp = 40;
   this.maxMp = 40;
   this.name = "Cleric";
   this.direction = 2;
   this.isSelected = false;
   this.isMoving = false;
   this.isAttacking = false;
   this.isMagicking = false;
   this.hasMoved = false;
   this.hasAttacked = false;
   this.myTurn = ((team === currentPlayer) ? true : false);
 
  
  // The character should move this much 
  this.shouldMoveLeft = 0;
  this.shouldMoveUp = 0;
  this.shouldMoveRight = 0;
  this.shouldMoveDown = 0;
  this.movePosition = 1;
  this.changeDirectionCounter = 20;
  this.movementDirections = [];
  this.shouldSwitch = false;
  
  this.moveLeft = function(ctx) {
    if (this.shouldMoveLeft === 0) return;
    this.direction = 3;
    this.x -= .05;
    this.shouldMoveLeft--;
    if (this.shouldMoveLeft < 0) {
      this.shouldMoveLeft = 0;
    } else if (this.shouldMoveLeft === 0) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveLeft >= 10) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    }
  }
  this.moveRight = function(ctx) {
    if (this.shouldMoveRight === 0) return;
    this.direction = 1;
    this.x += .05;
    this.shouldMoveRight--;
    if (this.shouldMoveRight < 0) {
      this.shouldMoveRight = 0;
    } else if (this.shouldMoveRight === 0) {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
      this.x = Math.round(this.x);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x) + 1, Math.round(this.y));
    } else {
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    }
  }
  this.moveDown = function(ctx) {
    if (this.shouldMoveDown === 0) return;
    this.direction = 2;
    this.y += .05;
    this.shouldMoveDown--;
    if (this.shouldMoveDown < 0) {
      this.shouldMoveDown = 0;
    } else if (this.shouldMoveDown === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveRight >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    }
  }
  this.moveUp = function(ctx) {
    if (this.shouldMoveUp === 0) return;
    this.direction = 0;
    this.y -= .05;
    this.shouldMoveUp--;
    if (this.shouldMoveUp < 0) {
      this.shouldMoveUp = 0;
    } else if (this.shouldMoveUp === 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
      this.y = Math.round(this.y);
    } else if (this.shouldMoveUp >= 10) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    } else {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
  }
  this.setNewDirection = function() {
    if (this.changeDirectionCounter === 20 && this.movementDirections.length !== 0) {
      console.log(this.movementDirections)
      var newDirection = this.movementDirections.shift()
      newDirection();
      this.changeDirectionCounter--;
    } else if (this.changeDirectionCounter === 0) {
      this.changeDirectionCounter = 20;
    } else {
      this.changeDirectionCounter--;
    }
  }
  
  this.draw = function(ctx) {
    // Make the character move and make sure we draw the tiles too.
    //ctx.clearRect(this.x * tileW, this.y *tileH, 40, 40);
    drawTile(ctx, Math.round(this.x), Math.round(this.y));
    if (this.shouldMoveRight !== 0) {
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
    }
    if (this.shouldMoveLeft !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) - 1);
    if (this.shouldMoveUp !== 0)
      drawTile(ctx, Math.round(this.x) - 1, Math.round(this.y));
    if (this.shouldMoveDown !== 0)
      drawTile(ctx, Math.round(this.x), Math.round(this.y) + 1);
	this.setNewDirection();
  this.moveLeft(ctx);
  this.moveRight(ctx);
  this.moveDown(ctx);
  this.moveUp(ctx);
  ctx.drawImage(characters, charW * (6 + this.movePosition), charH * (this.direction + 4), charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
  if ((!(this.hasMoved && this.hasAttacked)) && (this.myTurn))
    drawCharacterSide(ctx, this.x, this.y, this.team,true);
  else drawCharacterSide(ctx, this.x, this.y, this.team, false);
  switch(this.movePosition) {
    case 0:
      this.movePosition = 1;
      break;
    case 1:
    if (this.shouldSwitch) {
        this.movePosition = 2;
      } else {
        this.movePosition = 0
      }
      this.shouldSwitch = !this.shouldSwitch
      break
    default:
      this.movePosition = 1;
      break;
  }
  }
}