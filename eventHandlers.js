// SCRIPT 3 - event handlers

//@TODO pmarino: this function 
killCharacter = function(c) {
	//do something :( 
	//maybe set a "dead" field and do it that way, not displaying dead characters? 
	//would cause movement issues so likely better to do the legwork.
}

//@TODO pmarino: allow for handleMagic within this function?
// The player arg[0] attacked the player arg[1]
// :| race conditions here
handleAttack = function(cAttacking, cAttacked) {
	currentHP = cAttacked.hp;
	currentAttack = cAttacking.attackStrength; //maybe magicStrength wah
	currentHP -= currentAttack;
	cAttacked.hp = currentHP;
	console.log("wat");
	if (currentHP <= 0) {
		killCharacter(cAttacked);
	} 
	
}

// The player selected something in the action menu, so let's handle that.
madeActionSelection = function(c) {
  switch (currentActionItem) {
    case 0:
      c.isMoving = true;
      characterIsMoving = true;
      break;
    case 1:
      c.isAttacking = true;
      characterIsAttacking = true;
      break;
    case 2:
      characterIsWaiting = true;
      break;
    default:
      break;
  }
}

// The action menu is currently being displayed, so handle any 
// subsequent events.
handleActionMenu = function(e) {
  switch (e.keyCode) {
    case 38:
      if (currentActionItem > 0) currentActionItem--;
      break;
    case 40:
      if (currentActionItem < 2) currentActionItem++;
      break;
    case 13:
      characterSet.forEach(function (c) {
        if (cursor.x === c.x && cursor.y === c.y) {
          actionMenuShowing = false;
          c.isSelected = true;
          madeActionSelection(c);
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
        selectedCharacter.x = cursor.x;
        selectedCharacter.y = cursor.y;
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
          if (c.hasMoved && c.hasAttacked){
            console.log(c.name + " cannot act again this turn.");
            return;
          }
          c.isSelected = true;
          actionMenuShowing = true;
          selectedCharacter = c;
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
  } else if (characterIsWaiting) {
    handleCharacterWaiting(e);
  } else {
    handleCursorMovement(e);
  }
};