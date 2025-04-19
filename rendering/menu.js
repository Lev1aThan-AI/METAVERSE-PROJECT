// menu.js

function drawButton(label, x, y, w, h) {
  fill(100, 100, 255);
  rect(x, y, w, h, 10);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function drawMenu() {
  // Draw background image
  if (startingImage && startingImage.width > 0 && startingImage.height > 0) {
    image(startingImage, 0, 0, width, height);
  } else {
    // Fallback to gray background if image fails to load
    background(220);
  }
}