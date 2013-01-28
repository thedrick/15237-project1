// SCRIPT 3 - event handlers

//@TODO pmarino: maybe we should start passing around uids instead of characters to functions here.

hasMP = function(c) {
	return (c.mp >= c.magicCost);
}

switchTurn = function() {
	console.log("Switching now.");
	for (var i=0; i < characterSet.length; i++) {
		
	    if (characterSet[i].isMagical) {
		   characterSet[i].mp = ((characterSet[i].mp + 5 < characterSet[i].maxMp) ? characterSet[i].mp += 5 : characterSet[i].maxMp); 
		}
		characterSet[i].hasMoved = false;
		characterSet[i].hasAttacked = false;
		characterSet[i].myTurn = !(characterSet[i].myTurn);
	}
	currentPlayer = ((currentPlayer === 1) ? 2 : 1);
	
}


killCharacter = function(c) {
	var index = -1;
	//var index = characterSet.indexOf(c); 
	//maybe try something like this to be more efficient, but not necessary 
    var gameOver = true;
	var temp = characterSet[0].team;
	
	for (var i=0; i < characterSet.length; i++) {
		if (characterSet[i].uid === c.uid) {
			index = i;
		} else if (characterSet[i].team !== temp) gameOver = false;
	}
	console.log(index);
	if (index >= 0) {
		characterSet.splice(index,1);
	}
	
	if (characterSet.length === 1) gameOver = true;
	
	if (gameOver) {
		//@TODO: DISPLAY A WIN SCREEN!!!
		characterSet = [];
	}
}


// The player arg[0] attacked the player arg[1]
handleAttack = function(cAttacking, cAttacked) {
	currentHP = cAttacked.hp;
	currentAttack = cAttacking.attackStrength; 
	currentHP -= currentAttack;
	//cAttacked.hp = ((currentHP > cAttacked.maxHp) ? cAttacked.maxHp : currentHP); //unnecessary
	cAttacked.showDamage(currentAttack);
	if (currentHP <= 0) {
		killCharacter(cAttacked);
	} 
	
}

handleMagic = function(cAttacking, cAttacked) {
    currentHP = cAttacked.hp;
	currentMagic = cAttacking.magicStrength; 
	cAttacking.mp -= cAttacking.magicCost;
	currentHP -= currentMagic;
	cAttacked.hp = ((currentHP > cAttacked.maxHp) ? cAttacked.maxHp : currentHP);
	console.log(currentHP);
	if (currentHP <= 0) {
		killCharacter(cAttacked);
	}
}	

// The player selected something in the action menu, so let's handle that.
//note the bool refers to whether or not magic is possible.
madeActionSelection = function(c, b) {
  switch (currentActionItem) {
    case 0:
	  if (selectedCharacter.hasMoved) {
	    resetGameState();
        break;
      }
      c.isMoving = true;
      characterIsMoving = true;
      break;
    case 1:
	  if (selectedCharacter.hasAttacked) {
	    resetGameState();
	    currentActionItem = 0;
        break;
      }
      c.isAttacking = true;
      characterIsAttacking = true;
      break;
    case 2:
	  if (!b) {
		characterIsWaiting = true;
		break;
	  }
	  else {
	    if (selectedCharacter.hasAttacked || (!hasMP(c))) {
		  currentActionItem = 0;
		  resetGameState();
          break;
        }
		characterIsMagicking = true;
		break
	  }
	case 3:
		characterIsWaiting = true;
		break;
    default:
      break;
  }
}

// The action menu is currently being displayed, so handle any 
// subsequent events.
handleActionMenu = function(e) {
  var actionMin = 0;
  var actionMax = ((actionMagicMenuShowing) ? 3 : 2);
  
  switch (e.keyCode) {
    case 38:
      if (currentActionItem > actionMin) currentActionItem--;
      break;
    case 40:
      if (currentActionItem < actionMax) currentActionItem++;
      break;
    case 13:
      characterSet.forEach(function (c) {
        if (cursor.x === c.x && cursor.y === c.y) {
          actionMenuShowing = false;
		  actionMagicMenuShowing = false
          c.isSelected = true;
          madeActionSelection(c, c.isMagical, e);
        }
      });
      break;
  }
}

// check if the tile at newX, newY is occupied by another character.
alreadyOccupied = function(newX, newY) {
  isOccupied = false;
  characterSet.forEach(function(c) {
    if (c.x === newX && c.y === newY) {
      isOccupied = true;
    }
  });
  return isOccupied;
}

// find the character at location (xLoc, yLoc)
characterAtLocation = function(xLoc, yLoc) {
  var charAtLoc = null;
  characterSet.forEach(function(c) {
    if (c.x === xLoc && c.y === yLoc) {
      charAtLoc = c;
    }
  });
  return charAtLoc;
}

handleCharacterWaiting = function(e) {
  switch(e.keyCode) {
    case 37:
      selectedCharacter.direction = 3;
      break;
    case 38:
      selectedCharacter.direction = 0;
      break;
    case 39:
      selectedCharacter.direction = 1;
      break;
    case 40:
      selectedCharacter.direction = 2;
      break;
    case 13:
      selectedCharacter.hasAttacked = true;
      selectedCharacter.hasMoved = true;
      resetGameState();
      break;
  }
}

// The characterIsMoving game state is active, so lets handle movement.
handleCharacterMoving = function(e) {
  var curX = cursor.x;
  var curY = cursor.y;
  switch(e.keyCode) {
    case 37:
      cursor.moveLeft();
      break;
    case 38:
      cursor.moveUp();
      break;
    case 39:
      cursor.moveRight();
      break;
    case 40:
      cursor.moveDown();
      break;
    case 13:
      if (!alreadyOccupied(curX, curY)) {
        var toMoveX = cursor.x - selectedCharacter.x;
        var toMoveY = cursor.y - selectedCharacter.y;
        var charachterToMove = selectedCharacter
        while (toMoveX !== 0) {
          if (toMoveX < 0) {
            selectedCharacter.movementDirections.push(function() {charachterToMove.shouldMoveLeft = 10});
            toMoveX++;
          } else {
            selectedCharacter.movementDirections.push(function() {charachterToMove.shouldMoveRight = 10});
            toMoveX--;
          }
        }
        while (toMoveY !== 0) {
          if (toMoveY < 0) {
            selectedCharacter.movementDirections.push(function() {charachterToMove.shouldMoveUp = 10});
            toMoveY++;
          } else {
            selectedCharacter.movementDirections.push(function() {charachterToMove.shouldMoveDown = 10});
            toMoveY--;
          }
        }
        selectedCharacter.hasMoved = true;
        resetGameState();
        return;
      }
      break;
  }
  var dist = Math.abs(cursor.x - selectedCharacter.x) + Math.abs(cursor.y - selectedCharacter.y);
  if (dist > selectedCharacter.movementRange) {
    cursor.x = curX;
    cursor.y = curY;
  }
};

// the characterIsAttacking game state is active, so let's handle attacking.
handleCharacterAttacking = function(e) {
  var curX = cursor.x;
  var curY = cursor.y;
  switch(e.keyCode) {
    case 37:
      cursor.moveLeft();
      break;
    case 38:
      cursor.moveUp();
      break;
    case 39:
      cursor.moveRight();
      break;
    case 40:
      cursor.moveDown();
      break;
    case 13:
      // cannot attack yourself
      if (curX === selectedCharacter.x && curY === selectedCharacter.y) 
        return;
      // there is someone there we can attack!
      if (alreadyOccupied(curX, curY)) {
        var attackedPlayer = characterAtLocation(curX, curY);
        console.log(selectedCharacter.name + " attacked " + attackedPlayer.name);
		handleAttack(selectedCharacter, attackedPlayer);
        selectedCharacter.hasAttacked = true;
        resetGameState();
        return;
      }
      break;
  }
  var dist = Math.abs(cursor.x - selectedCharacter.x) + Math.abs(cursor.y - selectedCharacter.y);
  if (dist > selectedCharacter.attackRange) {
    cursor.x = curX;
    cursor.y = curY;
  }
};

handleCharacterMagicking = function(e) {
  var curX = cursor.x;
  var curY = cursor.y;
  switch(e.keyCode) {
    case 37:
      cursor.moveLeft();
      break;
    case 38:
      cursor.moveUp();
      break;
    case 39:
      cursor.moveRight();
      break;
    case 40:
      cursor.moveDown();
      break;
    case 13:
      // cannot attack yourself
      if (curX === selectedCharacter.x && curY === selectedCharacter.y) 
        return;
      // there is someone there we can attack!
      if (alreadyOccupied(curX, curY)) {
        var attackedPlayer = characterAtLocation(curX, curY);
        console.log(selectedCharacter.name + " magicked " + attackedPlayer.name);
		handleMagic(selectedCharacter, attackedPlayer);
        selectedCharacter.hasAttacked = true;
        resetGameState();
        return;
      }
      break;
  }
  var dist = Math.abs(cursor.x - selectedCharacter.x) + Math.abs(cursor.y - selectedCharacter.y);
  if (dist > selectedCharacter.magicRange) {
    cursor.x = curX;
    cursor.y = curY;
  }
};


// Allows the cursor to move around the game board. This is only called when we are not
// moving, attacking, or selecting an action item.
handleCursorMovement = function(e) {
  switch(e.keyCode) {
    case 37:
      cursor.moveLeft();
      break;
    case 38:
      cursor.moveUp();
      break;
    case 39:
      cursor.moveRight();
      break;
    case 40:
      cursor.moveDown();
      break;
    case 13:
      characterSet.forEach(function (c) {
        if (cursor.x === c.x && cursor.y === c.y) {
          if ((c.hasMoved && c.hasAttacked) || (!c.myTurn)){
            console.log(c.name + " cannot act again this turn. myTurn:" + c.myTurn);
            return;
          }
          c.isSelected = true;
          actionMenuShowing = true;
		  if (c.isMagical) actionMagicMenuShowing = true;
          selectedCharacter = c;
		  console.log(selectedCharacter);
        }
      });
  }
};

// Keyboard event handler that dispatches the event to the proper
// function which will handle it based on the current game state.
// note that game states exist in a hierarchy to make sure players
// are limited to certain actions based on the current state.
keyboardHandler = function(e) {
  if (e.keyCode === 27) { // ESC key
    resetGameState();
  } else if (actionMenuShowing) {
    handleActionMenu(e);
  } else if (characterIsMoving) {
    handleCharacterMoving(e);
  } else if (characterIsAttacking) {
    handleCharacterAttacking(e);
  } else if (characterIsMagicking) {
    handleCharacterMagicking(e);
  } else if (characterIsWaiting) {
    handleCharacterWaiting(e);
  } else {
    handleCursorMovement(e);
  }
};