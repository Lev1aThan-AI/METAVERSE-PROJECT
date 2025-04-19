function drawTouchControls() {
    fill(150, 150, 150, 200);
    ellipse(joystick.x, joystick.y, joystick.radius * 2);
    fill(100, 100, 100, 200);
    ellipse(joystick.x + joystick.dx * joystick.innerRadius,
            joystick.y + joystick.dy * joystick.innerRadius,
            joystick.innerRadius * 2);
  }
  
  // Attach to global scope
  window.drawTouchControls = drawTouchControls;