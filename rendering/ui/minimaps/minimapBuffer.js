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

export { setupMiniMapBuffer, staticMiniMapBuffer };