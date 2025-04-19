let minimapAlpha = 0;
let minimapTargetAlpha = 0;
const FADE_SPEED = 0.1;
let staticMiniMapBuffer;

function setupMiniMapBuffer() {
  staticMiniMapBuffer = createGraphics(160, 160);
  staticMiniMapBuffer.background(34, 139, 34);  // Green background for the map
  // Draw static map elements
  staticMiniMapBuffer.fill(90, 70, 50);  // Cobblestone paths
  for (let path of cobblestonePaths) {
    staticMiniMapBuffer.rect(path.x * (160 / mapWidth), path.y * (160 / mapHeight), path.w * (160 / mapWidth), path.h * (160 / mapHeight));
  }

  staticMiniMapBuffer.fill(150);  // Roads
  for (let road of roads) {
    staticMiniMapBuffer.rect(road.x * (160 / mapWidth), road.y * (160 / mapHeight), road.w * (160 / mapWidth), road.h * (160 / mapHeight));
  }

  staticMiniMapBuffer.fill(0);  // Obstacles
  for (let obstacle of obstacles) {
    if (obstacle.type === 'bush' || obstacle.type === 'tree') {
      staticMiniMapBuffer.rect(obstacle.x * (160 / mapWidth), obstacle.y * (160 / mapHeight), obstacle.w * (160 / mapWidth), obstacle.h * (160 / mapHeight));
    }
  }

  // Buildings
  staticMiniMapBuffer.fill(100);  // Castle
  staticMiniMapBuffer.rect(castleX * (160 / mapWidth), castleY * (160 / mapHeight), castleWidth * (160 / mapWidth), castleHeight * (160 / mapHeight));

  staticMiniMapBuffer.fill(139, 69, 19);  // Shop
  staticMiniMapBuffer.rect(shopX * (160 / mapWidth), shopY * (160 / mapHeight), shopWidth * (160 / mapWidth), shopHeight * (160 / mapHeight));

  staticMiniMapBuffer.fill(200, 150, 150);  // Cinema
  staticMiniMapBuffer.rect(cinemaX * (160 / mapWidth), cinemaY * (160 / mapHeight), cinemaWidth * (160 / mapWidth), cinemaHeight * (160 / mapHeight));

  staticMiniMapBuffer.fill(200, 200, 200);  // Hospital
  staticMiniMapBuffer.rect(hospitalX * (160 / mapWidth), hospitalY * (160 / mapHeight), hospitalWidth * (160 / mapWidth), hospitalHeight * (160 / mapHeight));

  staticMiniMapBuffer.fill(180, 180, 180);  // School
  staticMiniMapBuffer.rect(schoolX * (160 / mapWidth), schoolY * (160 / mapHeight), schoolWidth * (160 / mapWidth), schoolHeight * (160 / mapHeight));

  staticMiniMapBuffer.fill(160, 160, 160);  // Library
  staticMiniMapBuffer.rect(libraryX * (160 / mapWidth), libraryY * (160 / mapHeight), libraryWidth * (160 / mapWidth), libraryHeight * (160 / mapHeight));

  // Doors
  staticMiniMapBuffer.fill(255, 255, 255);
  staticMiniMapBuffer.rect(castleDoor.x * (160 / mapWidth), castleDoor.y * (160 / mapHeight), castleDoor.w * (160 / mapWidth), castleDoor.h * (160 / mapHeight));
  staticMiniMapBuffer.rect(cinemaDoor.x * (160 / mapWidth), cinemaDoor.y * (160 / mapHeight), cinemaDoor.w * (160 / mapWidth), cinemaDoor.h * (160 / mapHeight));
  staticMiniMapBuffer.rect(hospitalDoor.x * (160 / mapWidth), hospitalDoor.y * (160 / mapHeight), hospitalDoor.w * (160 / mapWidth), hospitalDoor.h * (160 / mapHeight));
  staticMiniMapBuffer.rect(schoolDoor.x * (160 / mapWidth), schoolDoor.y * (160 / mapHeight), schoolDoor.w * (160 / mapWidth), schoolDoor.h * (160 / mapHeight));
  staticMiniMapBuffer.rect(libraryDoor.x * (160 / mapWidth), libraryDoor.y * (160 / mapHeight), libraryDoor.w * (160 / mapWidth), libraryDoor.h * (160 / mapHeight));
}

function drawMiniMap() {
  if (!staticMiniMapBuffer) {
    setupMiniMapBuffer();
  }

  let miniMapWidth = 160;
  let miniMapHeight = 160;
  let scaleX = miniMapWidth / mapWidth;
  let scaleY = miniMapHeight / mapHeight;
  let miniMapX = (width - miniMapWidth) / 2;
  let miniMapY = (height - miniMapHeight) / 2;

  minimapTargetAlpha = showMiniMap ? 255 : 0;
  minimapAlpha = lerp(minimapAlpha, minimapTargetAlpha, FADE_SPEED);

  if (minimapAlpha <= 0) return;  // Skip drawing if fully faded out

  // Draw the border and title with current transparency
  fill(0, 0, 0, minimapAlpha);
  rect(miniMapX - 5, miniMapY - 25, miniMapWidth + 10, miniMapHeight + 30, 10);
  fill(255, 255, 200, minimapAlpha);
  textSize(14);
  textAlign(CENTER, TOP);
  text('Minimap', miniMapX + miniMapWidth / 2, miniMapY - 20);

  // Draw the green world map (static buffer) with fade effect
  push();
  tint(255, minimapAlpha);
  image(staticMiniMapBuffer, miniMapX, miniMapY);
  pop();

  // Draw dynamic elements: coin markers and player arrow
  fill(255, 215, 0, minimapAlpha);  // coins in yellow
  for (let coin of coins) {
    ellipse(miniMapX + coin.x * scaleX, miniMapY + coin.y * scaleY, 6);
  }

  // Determine player's position on the world map (use door location if inside)
  let arrowWorldX = playerX;
  let arrowWorldY = playerY;
  if (gameState === 'castleInterior') {
    arrowWorldX = castleDoor.x + castleDoor.w / 2;
    arrowWorldY = castleDoor.y + castleDoor.h / 2;
  } else if (gameState === 'cinemaInterior') {
    arrowWorldX = cinemaDoor.x + cinemaDoor.w / 2;
    arrowWorldY = cinemaDoor.y + cinemaDoor.h / 2;
  } else if (gameState === 'hospitalInterior') {
    arrowWorldX = hospitalDoor.x + hospitalDoor.w / 2;
    arrowWorldY = hospitalDoor.y + hospitalDoor.h / 2;
  } else if (gameState === 'schoolInterior') {
    arrowWorldX = schoolDoor.x + schoolDoor.w / 2;
    arrowWorldY = schoolDoor.y + schoolDoor.h / 2;
  } else if (gameState === 'libraryInterior') {
    arrowWorldX = libraryDoor.x + libraryDoor.w / 2;
    arrowWorldY = libraryDoor.y + libraryDoor.h / 2;
  }

  // Draw the player arrow (red triangle) pointing in current direction
  let playerMiniX = miniMapX + arrowWorldX * scaleX;
  let playerMiniY = miniMapY + arrowWorldY * scaleY;
  fill(255, 0, 0, minimapAlpha);
  push();
  translate(playerMiniX, playerMiniY);
  let angle;
  switch (currentDirection) {
    case 'north':      angle = -PI / 2; break;
    case 'south':      angle =  PI / 2; break;
    case 'east':       angle =  0;      break;
    case 'west':       angle =  PI;     break;
    case 'northeast':  angle = -PI / 4; break;
    case 'northwest':  angle = -3 * PI / 4; break;
    case 'southeast':  angle =  PI / 4; break;
    case 'southwest':  angle =  3 * PI / 4; break;
    default:           angle = 0;
  }
  rotate(angle);
  triangle(-3, 4, 3, 4, 0, -4);
  pop();
}

// Attach to global scope
window.drawMiniMap = drawMiniMap;