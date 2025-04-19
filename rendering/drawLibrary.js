// rendering/drawLibrary.js

function drawLibraryInterior() {
    cameraX = playerX - width / (2 * zoom);
    cameraY = playerY - height / (2 * zoom);
    cameraX = constrain(cameraX, 0, libraryInterior.width - width / zoom);
    cameraY = constrain(cameraY, 0, libraryInterior.height - height / zoom);
  
    push();
    translate(width / 2, height / 2);
    scale(zoom);
    translate(-cameraX - width / (2 * zoom),
              -cameraY - height / (2 * zoom));
  
    // Wall background (non-walkable)
    fill(120, 100, 80); // Brownish color for library walls
    rect(0, 0, libraryInterior.width, libraryInterior.height);
  
    // Floor with library floor texture (walkable area)
    imageMode(CORNER);
    if (libraryFloorTexture &&
        libraryFloorTexture.width > 0 &&
        libraryFloorTexture.height > 0) {
      // Tile the texture across the library floor
      for (let x = 0; x < libraryInterior.width; x += libraryFloorTexture.width) {
        for (let y = 0; y < libraryInterior.height; y += libraryFloorTexture.height) {
          image(libraryFloorTexture, x, y, libraryFloorTexture.width, libraryFloorTexture.height);
        }
      }
    } else {
      // Fallback if texture fails to load
      fill(80, 80, 80);
      rect(0, 0, libraryInterior.width, libraryInterior.height);
    }
  
    // Border (visual boundary)
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rect(0, 0, libraryInterior.width, libraryInterior.height);
    noStroke();
  
    // Bottom door
    fill(200, 0, 0);
    rect(libraryBottomDoor.x,
         libraryBottomDoor.y,
         libraryBottomDoor.w,
         libraryBottomDoor.h);
  
    // Player
    drawPlayer();
  
    pop();
}