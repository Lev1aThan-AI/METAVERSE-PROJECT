function drawCastleInterior() {
  cameraX = playerX - width / (2 * zoom);
  cameraY = playerY - height / (2 * zoom);
  cameraX = constrain(cameraX, 0, castleInterior.width - width / zoom);
  cameraY = constrain(cameraY, 0, castleInterior.height - height / zoom);

  push();
  translate(width / 2, height / 2);
  scale(zoom);
  translate(-cameraX - width / (2 * zoom),
            -cameraY - height / (2 * zoom));

  // Floor texture
  imageMode(CORNER);
  if (castleRoomFloorTexture &&
      castleRoomFloorTexture.width > 0 &&
      castleRoomFloorTexture.height > 0) {
    image(castleRoomFloorTexture,
          0, 0,
          castleInterior.width,
          castleInterior.height);
  } else {
    fill(80, 80, 80);
    rect(0, 0, castleInterior.width, castleInterior.height);
  }

  // Computer
  imageMode(CENTER);
  if (computerImage &&
      computerImage.width > 0 &&
      computerImage.height > 0) {
    image(computerImage,
          computerX, computerY,
          computerWidth, computerHeight);
  } else {
    fill(150, 150, 150);
    rect(computerX - computerWidth/2,
         computerY - computerHeight/2,
         computerWidth, computerHeight);
  }

  // Border
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);
  rect(0, 0,
       castleInterior.width,
       castleInterior.height);
  noStroke();

  // Bottom door
  fill(200, 0, 0);
  rect(bottomDoor.x,
       bottomDoor.y,
       bottomDoor.w,
       bottomDoor.h);

  // Player
  drawPlayer();

  pop();
}