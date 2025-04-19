// rendering/drawCinema.js

function drawCinemaInterior() {
  cameraX = playerX - width / (2 * zoom);
  cameraY = playerY - height / (2 * zoom);
  cameraX = constrain(cameraX, 0, cinemaInterior.width - width / zoom);
  cameraY = constrain(cameraY, 0, cinemaInterior.height - height / zoom);

  push();
  translate(width / 2, height / 2);
  scale(zoom);
  translate(-cameraX - width / (2 * zoom),
            -cameraY - height / (2 * zoom));

  // Floor with cinema floor texture
  if (cinemaFloorTexture && cinemaFloorTexture.width > 0 && cinemaFloorTexture.height > 0) {
    imageMode(CORNER);
    for (let x = 0; x < cinemaInterior.width; x += cinemaFloorTexture.width) {
      for (let y = 0; y < cinemaInterior.height; y += cinemaFloorTexture.height) {
        image(cinemaFloorTexture, x, y, cinemaFloorTexture.width, cinemaFloorTexture.height);
      }
    }
  } else {
    fill(80, 80, 80);
    rect(0, 0, cinemaInterior.width, cinemaInterior.height);
  }

  // Border
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);
  rect(0, 0, cinemaInterior.width, cinemaInterior.height);
  noStroke();

  // Bottom door
  fill(200, 0, 0); // Changed to red to match other interiors
  rect(cinemaBottomDoor.x, cinemaBottomDoor.y, cinemaBottomDoor.w, cinemaBottomDoor.h);

  // Draw Joniko
  if (jonikoImage && jonikoImage.width > 0 && jonikoImage.height > 0) {
    imageMode(CENTER);
    image(jonikoImage, jonikoX, jonikoY, jonikoWidth, jonikoHeight);
  } else {
    fill(255, 0, 255);
    rect(jonikoX - jonikoWidth / 2, jonikoY - jonikoHeight / 2, jonikoWidth, jonikoHeight);
  }

  // Draw Ermalo
  if (ermaloImage && ermaloImage.width > 0 && ermaloImage.height > 0) {
    imageMode(CENTER);
    image(ermaloImage, ermaloX, ermaloY, ermaloWidth, ermaloHeight);
  } else {
    fill(255, 0, 255);
    rect(ermaloX - ermaloWidth / 2, ermaloY - ermaloHeight / 2, ermaloWidth, ermaloHeight);
  }

  // Draw Maxo
  if (maxoImage && maxoImage.width > 0 && maxoImage.height > 0) {
    imageMode(CENTER);
    image(maxoImage, maxoX, maxoY, maxoWidth, maxoHeight);
  } else {
    fill(255, 0, 255);
    rect(maxoX - maxoWidth / 2, maxoY - maxoHeight / 2, maxoWidth, maxoHeight);
  }

  // Draw Giomari
  if (giomariImage && giomariImage.width > 0 && giomariImage.height > 0) {
    imageMode(CENTER);
    image(giomariImage, giomariX, giomariY, giomariWidth, giomariHeight);
  } else {
    fill(255, 0, 255);
    rect(giomariX - giomariWidth / 2, giomariY - giomariHeight / 2, giomariWidth, giomariHeight);
  }

  // Player
  drawPlayer();

  pop();
}