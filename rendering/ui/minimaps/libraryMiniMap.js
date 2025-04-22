let minimapAlpha = 0;
let minimapTargetAlpha = 0;
const FADE_SPEED = 0.1;

function drawLibraryInteriorMiniMap() {
  try {
    // Create a buffer for the minimap, smaller than the world minimap
    let miniMapWidth = 120; // Reduced from 160 to 120
    let miniMapHeight = 120; // Reduced from 160 to 120
    let miniMapBuffer = createGraphics(miniMapWidth, miniMapHeight);
    
    // Draw static elements into the buffer
    miniMapBuffer.fill(50, 50, 50, 255); // Background of the library interior
    miniMapBuffer.rect(0, 0, miniMapWidth, miniMapHeight);

    miniMapBuffer.fill(80, 80, 80, 255); // Floor
    miniMapBuffer.rect(0, 0, miniMapWidth, miniMapHeight);

    // Draw the bottom door if variables are defined
    if (libraryBottomDoor && typeof libraryBottomDoor.x !== 'undefined') {
      miniMapBuffer.fill(255, 255, 255, 255); // White door
      let scaleX = miniMapWidth / libraryInterior.width;
      let scaleY = miniMapHeight / libraryInterior.height;
      miniMapBuffer.rect(
        libraryBottomDoor.x * scaleX,
        libraryBottomDoor.y * scaleY,
        libraryBottomDoor.w * scaleX,
        libraryBottomDoor.h * scaleY
      );
    } else {
      console.warn('libraryBottomDoor variables undefined in drawLibraryInteriorMiniMap');
    }

    // Draw the player’s position
    let scaleX = miniMapWidth / libraryInterior.width;
    let scaleY = miniMapHeight / libraryInterior.height;
    let playerMiniX = playerX * scaleX;
    let playerMiniY = playerY * scaleY;
    miniMapBuffer.fill(255, 0, 0, 255); // Red player arrow
    miniMapBuffer.push();
    miniMapBuffer.translate(playerMiniX, playerMiniY);
    let angle;
    switch (currentDirection) {
      case 'north': angle = -PI / 2; break;
      case 'south': angle = PI / 2; break;
      case 'east': angle = 0; break;
      case 'west': angle = PI; break;
      case 'northeast': angle = -PI / 4; break;
      case 'northwest': angle = -3 * PI / 4; break;
      case 'southeast': angle = PI / 4; break;
      case 'southwest': angle = 3 * PI / 4; break;
      default: angle = 0;
    }
    miniMapBuffer.rotate(angle);
    miniMapBuffer.triangle(-3, 4, 3, 4, 0, -4);
    miniMapBuffer.pop();

    // Position the minimap to match the world minimap
    let miniMapX = width - miniMapWidth - 15; // 15 pixels from the right edge, adjusted for smaller width
    let miniMapY = 165; // 165 pixels from the top edge

    minimapTargetAlpha = showMiniMap ? 255 : 0;
    minimapAlpha = lerp(minimapAlpha, minimapTargetAlpha, FADE_SPEED);

    if (minimapAlpha <= 0) return;  // Skip drawing if fully faded out

    // Draw the buffer with all elements
    push();
    tint(255, minimapAlpha);
    image(miniMapBuffer, miniMapX, miniMapY);
    pop();

    // Draw a thin black frame with explicit offsets to match the world minimap
    let frameWeight = 2;
    stroke(0, 0, 0, minimapAlpha); // Black frame with matching alpha
    strokeWeight(frameWeight); // Thin frame
    noFill();
    let frameOffsetX = -80; // Your manual offset
    let frameOffsetY = -80; // Your manual offset
    let frameX = miniMapX + frameOffsetX;
    let frameY = miniMapY + frameOffsetY;
    let frameWidth = miniMapWidth; // Match the smaller minimap width
    let frameHeight = miniMapHeight; // Match the smaller minimap height
    rect(frameX, frameY, frameWidth, frameHeight);
    noStroke();
  } catch (error) {
    console.error('Error in drawLibraryInteriorMiniMap:', error);
  }
}

// Attach to global scope
window.drawLibraryInteriorMiniMap = drawLibraryInteriorMiniMap;