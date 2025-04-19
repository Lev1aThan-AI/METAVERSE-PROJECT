// rendering/drawSchool.js

function drawSchoolInterior() {
    cameraX = playerX - width / (2 * zoom);
    cameraY = playerY - height / (2 * zoom);
    cameraX = constrain(cameraX, 0, schoolInterior.width - width / zoom);
    cameraY = constrain(cameraY, 0, schoolInterior.height - height / zoom);
  
    push();
    translate(width / 2, height / 2);
    scale(zoom);
    translate(-cameraX - width / (2 * zoom),
              -cameraY - height / (2 * zoom));
  
    // Floor with school floor texture
    imageMode(CORNER);
    if (schoolFloorTexture &&
        schoolFloorTexture.width > 0 &&
        schoolFloorTexture.height > 0) {
      // Tile the texture across the school floor
      for (let x = 0; x < schoolInterior.width; x += schoolFloorTexture.width) {
        for (let y = 0; y < schoolInterior.height; y += schoolFloorTexture.height) {
          image(schoolFloorTexture, x, y, schoolFloorTexture.width, schoolFloorTexture.height);
        }
      }
    } else {
      // Fallback if texture fails to load
      fill(80, 80, 80);
      rect(0, 0, schoolInterior.width, schoolInterior.height);
    }
  
    // Border
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rect(0, 0,
         schoolInterior.width,
         schoolInterior.height);
    noStroke();
  
    // Bottom door
    fill(200, 0, 0);
    rect(schoolBottomDoor.x,
         schoolBottomDoor.y,
         schoolBottomDoor.w,
         schoolBottomDoor.h);
  
    // Player
    drawPlayer();
  
    pop();
}