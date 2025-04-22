function updateCinemaInteriorPosition() {
    let speed = 5;
    let newX = playerX;
    let newY = playerY;
  
    let dx = 0;
    let dy = 0;
  
    if (keyIsDown(LEFT_ARROW))  dx -= 1;
    if (keyIsDown(RIGHT_ARROW)) dx += 1;
    if (keyIsDown(UP_ARROW))    dy -= 1;
    if (keyIsDown(DOWN_ARROW))  dy += 1;
  
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
        currentFrame = (currentFrame + 1) % 5;
        lastFrameTime = currentTime;
      }
  
      let shouldMove = false;
      if (joystick.active) shouldMove = true;
      else {
        if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) ||
            keyIsDown(UP_ARROW)   || keyIsDown(DOWN_ARROW)) {
          if (keyPressStartTime === 0) keyPressStartTime = currentTime;
          if (currentTime - keyPressStartTime >= MIN_KEY_HOLD_TIME) shouldMove = true;
        } else keyPressStartTime = 0;
      }
  
      if (shouldMove) {
        newX = playerX + dx * speed;
        newY = playerY + dy * speed;
  
        playerX = newX;
        playerY = newY;
  
        playerX = constrain(playerX, 0, cinemaInterior.width - 75);
        playerY = constrain(playerY, 0, cinemaInterior.height - 75);
  
        // Exit door back to world
        if (collides(playerX, playerY, 75, 75,
                     cinemaBottomDoor.x, cinemaBottomDoor.y, cinemaBottomDoor.w, cinemaBottomDoor.h)
            && !isTransitioning) {
          isTransitioning = true;
          gameState = 'game';
          playerX = 2700;
          playerY = 2350;
          cameraX = playerX - width / (2 * zoom);
          cameraY = playerY - height / (2 * zoom);
          setTimeout(() => { isTransitioning = false; }, 500);
          return;
        }
      }
    } else {
      currentFrame = 0;
      keyPressStartTime = 0;
    }
  }