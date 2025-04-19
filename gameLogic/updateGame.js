// gameLogic/updateGame.js

function updatePlayerPosition() {
  let speed = 5;
  let newX = playerX;
  let newY = playerY;

  let dx = 0;
  let dy = 0;

  // Remove any 'M' key handling if it exists
  // Only keep movement controls
  if (keyIsDown(LEFT_ARROW)) dx -= 1;
  if (keyIsDown(RIGHT_ARROW)) dx += 1;
  if (keyIsDown(UP_ARROW)) dy -= 1;
  if (keyIsDown(DOWN_ARROW)) dy += 1;

  if (joystick.active) {
    dx = joystick.dx;
    dy = joystick.dy;
  }

  let mag = sqrt(dx * dx + dy * dy);
  if (mag > 1) {
    dx /= mag;
    dy /= mag;
  }

  let newDirection = currentDirection;
  if (dx !== 0 || dy !== 0) {
    if (dx < 0 && dy > 0) newDirection = 'southwest';
    else if (dx > 0 && dy < 0) newDirection = 'northeast';
    else if (dx < 0 && dy === 0) newDirection = 'west';
    else if (dx > 0 && dy === 0) newDirection = 'east';
    else if (dy < 0 && dx === 0) newDirection = 'north';
    else if (dy > 0 && dx === 0) newDirection = 'south';
    else if (dx < 0 && dy < 0) newDirection = 'northwest';
    else if (dx > 0 && dy > 0) newDirection = 'southeast';
  }

  if (newDirection !== currentDirection) {
    currentDirection = newDirection;
    currentFrame = 0;
    lastDirection = currentDirection;
  }

  isMoving = mag > 0;
  if (isMoving) {
    let currentTime = millis();
    if (currentTime - lastFrameTime >= FRAME_DURATION) {
      currentFrame = (currentFrame + 1) % vikingRightFrames.length;
      lastFrameTime = currentTime;
    }

    let shouldMove = joystick.active;
    if (!shouldMove) {
      if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
        if (keyPressStartTime === 0) keyPressStartTime = currentTime;
        if (currentTime - keyPressStartTime >= MIN_KEY_HOLD_TIME) shouldMove = true;
      } else {
        keyPressStartTime = 0;
      }
    }

    if (shouldMove) {
      newX = playerX + dx * speed;
      newY = playerY + dy * speed;

      let canMove = true;

      if (collidesWithCastle(newX, newY)) canMove = false;
      if (collidesWithShop(newX, newY)) canMove = false;
      if (collidesWithCinema(newX, newY)) canMove = false;
      if (collidesWithHospital(newX, newY)) canMove = false;
      if (collidesWithSchool(newX, newY)) canMove = false;
      if (collidesWithLibrary(newX, newY)) canMove = false;

      for (let obstacle of obstacles) {
        if (obstacle.type === 'bush' || obstacle.type === 'tree') {
          if (collides(newX, newY, 75, 75, obstacle.x, obstacle.y, obstacle.w, obstacle.h)) {
            canMove = false;
            break;
          }
        }
      }

      if (canMove) {
        playerX = newX;
        playerY = newY;

        for (let i = coins.length - 1; i >= 0; i--) {
          let coin = coins[i];
          if (dist(playerX + 37.5, playerY + 37.5, coin.x, coin.y) < 75) {
            coins.splice(i, 1);
            coinScore += 1;
            if (coins.length === 0) {
              lastDisappearanceTime = millis();
            }
          }
        }

        if (isNearGatekeeper() && !hasDismissedGatekeeperPopup) {
          showGatekeeperPopup = true;
        } else if (!isNearGatekeeper()) {
          showGatekeeperPopup = false;
          hasDismissedGatekeeperPopup = false;
        }

        if (collides(playerX, playerY, 75, 75, castleDoor.x, castleDoor.y, castleDoor.w, castleDoor.h) && !isTransitioning && hasGatekeeperAccess) {
          isTransitioning = true;
          gameState = 'castleInterior';
          playerX = 600;
          playerY = 1000;
          cameraX = playerX - width / (2 * zoom);
          cameraY = playerY - height / (2 * zoom);
          setTimeout(() => { isTransitioning = false; }, 500);
          return;
        }

        if (collides(playerX, playerY, 75, 75, cinemaDoor.x, cinemaDoor.y, cinemaDoor.w, cinemaDoor.h) && !isTransitioning) {
          isTransitioning = true;
          gameState = 'cinemaInterior';
          playerX = 600;
          playerY = 1100;
          cameraX = playerX - width / (2 * zoom);
          cameraY = playerY - height / (2 * zoom);
          setTimeout(() => { isTransitioning = false; }, 500);
          return;
        }

        if (collides(playerX, playerY, 75, 75, hospitalDoor.x, hospitalDoor.y, hospitalDoor.w, hospitalDoor.h) && !isTransitioning) {
          isTransitioning = true;
          gameState = 'hospitalInterior';
          playerX = 600;
          playerY = 1100;
          cameraX = playerX - width / (2 * zoom);
          cameraY = playerY - height / (2 * zoom);
          setTimeout(() => { isTransitioning = false; }, 500);
          return;
        }

        if (collides(playerX, playerY, 75, 75, schoolDoor.x, schoolDoor.y, schoolDoor.w, schoolDoor.h) && !isTransitioning) {
          isTransitioning = true;
          gameState = 'schoolInterior';
          playerX = 600;
          playerY = 1000;
          cameraX = playerX - width / (2 * zoom);
          cameraY = playerY - height / (2 * zoom);
          setTimeout(() => { isTransitioning = false; }, 500);
          return;
        }

        if (collides(playerX, playerY, 75, 75, libraryDoor.x, libraryDoor.y, libraryDoor.w, libraryDoor.h) && !isTransitioning) {
          isTransitioning = true;
          gameState = 'libraryInterior';
          playerX = 600;
          playerY = 1100; // Adjusted to place player just above bottom door
          cameraX = playerX - width / (2 * zoom);
          cameraY = playerY - height / (2 * zoom);
          setTimeout(() => { isTransitioning = false; }, 500);
          return;
        }
      }
    }
  } else {
    currentFrame = 0;
    keyPressStartTime = 0;
  }
}

// Add this function to handle key presses if it doesn't exist
function keyPressed() {
  // Explicitly ignore 'M' key to prevent freezing
  if (key === 'M' || key === 'm') {
    return false; // Prevents default behavior
  }
  return true; // Allows other keys to work normally
}