// SCRIPT 2 - contains unit definitions for the game.
// Character classes //

//@TODO pmarino: decide reasonable damage values.
//@TODO pmarino: turn-by-turn incremental restoration of MP

// Represents an Archer unit in the game
Archer = function(ctx, x, y, id) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.uid = uidGen();
  this.movementRange = 4;
  
  this.attackStrength = 130 //magic number, testing killCharacter()
  
  this.attackRange = 4;
  this.hp = 50;
  this.maxHp = 50;
  this.mp = 0;
  this.maxMp = 1;
  this.name = "Archer";
  this.direction = 2;
  this.isSelected = false;
  this.isMoving = false;
  this.isAttacking = false;
  this.hasMoved = false;
  this.hasAttacked = false;
  this.draw = function(ctx) {
    ctx.drawImage(characters, charW * 13, charH * this.direction, charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
    if (!(this.hasMoved && this.hasAttacked))
      drawCharacterSide(ctx, this.x, this.y);
  }
}

// Represents a Warrior unit in the game.
Warrior = function(ctx, x, y, id) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.movementRange = 3;
  this.attackRange = 1;
  this.uid = uidGen();
  
  this.attackStrength = 26 //magic number 
  
  this.hp = 75;
  this.maxHp = 75;
  this.mp = 0;
  this.maxMp = 1;
  this.name = "Warrior";
  this.direction = 2;
  this.isSelected = false;
  this.isMoving = false;
  this.isAttacking = false;
  this.hasMoved = false;
  this.hasAttacked = false;
  this.draw = function(ctx) {
    ctx.drawImage(characters, charW * 1, charH * this.direction, charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
    if (!(this.hasMoved && this.hasAttacked))
      drawCharacterSide(ctx, this.x, this.y);
  }
}

// Represents a Mage unit in the game.
Mage = function(ctx, x, y, id) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.movementRange = 3;
  this.attackRange = 1;
  this.uid = uidGen();
  
  this.attackStrength = 12 //magic numbers
  this.magicStrength = 30
  this.magicCost = 20
  
  this.hp = 45;
  this.maxHp = 45;
  this.mp = 40;
  this.maxMp = 40;
  this.name = "Mage";
  this.direction = 2;
  this.isSelected = false;
  this.isMoving = false;
  this.isAttacking = false;
  this.hasMoved = false;
  this.hasAttacked = false;
  this.draw = function(ctx) {
    ctx.drawImage(characters, charW * 4, charH * (this.direction + 4), charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
    if (!(this.hasMoved && this.hasAttacked))
      drawCharacterSide(ctx, this.x, this.y);
  }
}

// Represents a Ninja unit in the game.
//@TODO pmarino: if Ninjas attack from behind, dmg multiplier? down the road of course
Ninja = function(ctx, x, y, id) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.movementRange = 5;
  this.attackRange = 1;
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
  this.hasMoved = false;
  this.hasAttacked = false;
  this.draw = function(ctx) {
    ctx.drawImage(characters, charW * 10, charH * this.direction, charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
    if (!(this.hasMoved && this.hasAttacked))
      drawCharacterSide(ctx, this.x, this.y);
  }
}

// Represents a Cleric unit in the game.
// currently clerics can only heal, and can heal enemies by design
Cleric = function(ctx, x, y, id) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.movementRange = 3;
  this.attackRange = 1;
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
  this.hasMoved = false;
  this.hasAttacked = false;
  this.draw = function(ctx) {
    ctx.drawImage(characters, charW * 7, charH * (this.direction + 4), charW, charH, tileW * this.x + charWoffset, tileH * this.y + charHoffset, charW, charH);
    if (!(this.hasMoved && this.hasAttacked))
      drawCharacterSide(ctx, this.x, this.y);
  }
}