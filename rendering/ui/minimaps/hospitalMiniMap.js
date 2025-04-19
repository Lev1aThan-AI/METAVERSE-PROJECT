let minimapAlpha = 0;
let minimapTargetAlpha = 0;
const FADE_SPEED = 0.1;

function drawHospitalInteriorMiniMap() {
  let miniMapWidth = 160;
  let miniMapHeight = 160;
  let scaleX = miniMapWidth / hospitalInterior.width;
  let scaleY = miniMapHeight / hospitalInterior.height;
  let miniMapX = (width - miniMapWidth) / 2;
  let miniMapY = (height - miniMapHeight) / 2;

  minimapTargetAlpha = showMiniMap ? 255 : 0;
  minimapAlpha = lerp(minimapAlpha, minimapTargetAlpha, FADE_SPEED);

  fill(0, 0, 0, minimapAlpha);
  rect(miniMapX - 5, miniMapY - 25, miniMapWidth + 10, miniMapHeight + 30, 10);

  fill(255, 255, 200, minimapAlpha);
  textSize(14);
  textAlign(CENTER, TOP);
  text('Hospital Minimap', miniMapX + miniMapWidth / 2, miniMapY - 20);

  fill(50, 50, 50, minimapAlpha);
  rect(miniMapX, miniMapY, miniMapWidth, miniMapHeight);

  fill(80, 80, 80, minimapAlpha);
  rect(miniMapX, miniMapY, miniMapWidth, miniMapHeight);

  fill(150, 150, 150, minimapAlpha);
  rect(miniMapX + healingStationX * scaleX - (computerWidth * scaleX) / 2,
       miniMapY + healingStationY * scaleY - (computerHeight * scaleY) / 2,
       healingStationWidth * scaleX,
       healingStationHeight * scaleY);

  fill(255, 255, 255, minimapAlpha);
  rect(miniMapX + hospitalBottomDoor.x * scaleX,
       miniMapY + hospitalBottomDoor.y * scaleY,
       hospitalBottomDoor.w * scaleX,
       hospitalBottomDoor.h * scaleY);

  let playerMiniX = miniMapX + playerX * scaleX;
  let playerMiniY = miniMapY + playerY * scaleY;
  fill(255, 0, 0, minimapAlpha);
  push();
  translate(playerMiniX, playerMiniY);
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
  rotate(angle);
  triangle(-3, 4, 3, 4, 0, -4);
  pop();
}

// Attach to global scope
window.drawHospitalInteriorMiniMap = drawHospitalInteriorMiniMap;