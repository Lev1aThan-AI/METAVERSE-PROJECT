// rendering/drawHospital.js

function drawHospitalInterior() {
    cameraX = playerX - width / (2 * zoom);
    cameraY = playerY - height / (2 * zoom);
    cameraX = constrain(cameraX, 0, hospitalInterior.width - width / zoom);
    cameraY = constrain(cameraY, 0, hospitalInterior.height - height / zoom);
  
    push();
    translate(width / 2, height / 2);
    scale(zoom);
    translate(-cameraX - width / (2 * zoom),
              -cameraY - height / (2 * zoom));
  
    // Floor with hospital floor texture
    imageMode(CORNER);
    if (hospitalFloorTexture &&
        hospitalFloorTexture.width > 0 &&
        hospitalFloorTexture.height > 0) {
      // Tile the texture across the hospital floor
      for (let x = 0; x < hospitalInterior.width; x += hospitalFloorTexture.width) {
        for (let y = 0; y < hospitalInterior.height; y += hospitalFloorTexture.height) {
          image(hospitalFloorTexture, x, y, hospitalFloorTexture.width, hospitalFloorTexture.height);
        }
      }
    } else {
      // Fallback if texture fails to load
      fill(80, 80, 80);
      rect(0, 0, hospitalInterior.width, hospitalInterior.height);
    }
  
    // Healing Station
    imageMode(CENTER);
    if (healingStationImage &&
        healingStationImage.width > 0 &&
        healingStationImage.height > 0) {
      image(healingStationImage,
            healingStationX, healingStationY,
            healingStationWidth, healingStationHeight);
    } else {
      fill(150, 150, 150);
      rect(healingStationX - healingStationWidth/2,
           healingStationY - healingStationHeight/2,
           healingStationWidth, healingStationHeight);
    }
  
    // Border
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rect(0, 0,
         hospitalInterior.width,
         hospitalInterior.height);
    noStroke();
  
    // Bottom door
    fill(200, 0, 0);
    rect(hospitalBottomDoor.x,
         hospitalBottomDoor.y,
         hospitalBottomDoor.w,
         hospitalBottomDoor.h);
  
    // Player
    drawPlayer();
  
    pop();
  }