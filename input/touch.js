function updateJoystick(touchX, touchY) {
  let dx = touchX - joystick.x;
  let dy = touchY - joystick.y;
  let distance = sqrt(dx*dx + dy*dy);
  if (distance > joystick.radius) {
    dx = (dx / distance) * joystick.radius;
    dy = (dy / distance) * joystick.radius;
  }
  joystick.dx = dx / joystick.radius;
  joystick.dy = dy / joystick.radius;
}

function touchStarted() {
  for (let t of touches) {
    if (dist(t.x, t.y, joystick.x, joystick.y) < joystick.radius) {
      joystick.active = true;
      updateJoystick(t.x, t.y);
    }
  }
  // Repeat mousePressed logic for popups/purchases/inventory...
  return false;
}

function touchMoved() {
  if (joystick.active) {
    for (let t of touches) {
      if (dist(t.x, t.y, joystick.x, joystick.y) < joystick.radius*2) {
        updateJoystick(t.x, t.y);
      } else {
        joystick.active = false;
        joystick.dx = 0;
        joystick.dy = 0;
      }
    }
  }
  return false;
}

function touchEnded() {
  joystick.active = false;
  joystick.dx = 0;
  joystick.dy = 0;
  return false;
}