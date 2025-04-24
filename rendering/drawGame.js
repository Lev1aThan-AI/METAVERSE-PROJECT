let roads = [
  {
    x: 2000 - 25,
    y: 800,
    w: 50,
    h: 1600
  },
  {
    x: 2000 - 25,
    y: 2400,
    w: 50,
    h: 1600
  }
];

let cobblestonePaths = [
  {
    x: 1500,
    y: 800,
    w: 1975 - 1500,
    h: 1600
  },
  {
    x: 2025,
    y: 800,
    w: 2500 - 2025,
    h: 1600
  },
  {
    x: 0,
    y: 2400,
    w: 4000,
    h: 400
  },
  {
    x: 1500,
    y: 2400,
    w: 1975 - 1500,
    h: 1600
  },
  {
    x: 2025,
    y: 2400,
    w: 2500 - 2025,
    h: 1600
  }
];

let bridge = {
  x: 2000 - 25,
  y: 4000,
  w: 50,
  h: 4000
};

function drawGame() {
  push();
  translate(width / 2, height / 2);
  scale(zoom);
  translate(-cameraX - width / (2 * zoom),
            -cameraY - height / (2 * zoom));

  // Grass background (extended to 8000 height)
  imageMode(CORNER);
  if (grassImage && grassImage.width > 0 && grassImage.height > 0) {
    let tileSize = 768;
    for (let x = 0; x < mapWidth; x += tileSize) {
      for (let y = 0; y < mapHeight; y += tileSize) {
        let tileWidth = min(tileSize, mapWidth - x);
        let tileHeight = min(tileSize, mapHeight - y);
        image(grassImage,
              x, y, tileWidth, tileHeight,
              0, 0, tileWidth, tileHeight);
      }
    }
  } else {
    fill(34, 139, 34);
    rect(0, 0, mapWidth, mapHeight);
  }

  // Water (y=4000 to y=6000, excluding bridge)
  fill(0, 105, 148); // Blue for water
  rect(0, 4000, mapWidth, 2000); // Water area

  // Bridge (overwrites water where applicable)
  fill(139, 69, 19); // Brown for bridge
  rect(bridge.x, bridge.y, bridge.w, bridge.h);

  // Cobblestone paths
  imageMode(CORNER);
  for (let path of cobblestonePaths) {
    if (cobblestoneTexture &&
        cobblestoneTexture.width > 0 &&
        cobblestoneTexture.height > 0) {
      let tileSize = 256;
      for (let x = path.x; x < path.x + path.w; x += tileSize) {
        for (let y = path.y; y < path.y + path.h; y += tileSize) {
          let tileWidth = min(tileSize, path.x + path.w - x);
          let tileHeight = min(tileSize, path.y + path.h - y);
          image(cobblestoneTexture,
                x, y, tileWidth, tileHeight,
                0, 0, tileWidth, tileHeight);
        }
      }
    } else {
      fill(100, 80, 60);
      rect(path.x, path.y, path.w, path.h);
    }
  }

  // Roads (carpet texture)
  imageMode(CORNER);
  for (let road of roads) {
    if (carpetTexture && carpetTexture.width > 0 && carpetTexture.height > 0) {
      let tileWidth = 50;
      let tileHeight = 75;
      let numTiles = Math.ceil(road.h / tileHeight);
      for (let i = 0; i < numTiles; i++) {
        let y = road.y + i * tileHeight;
        if (y < road.y + road.h) {
          let drawHeight = min(tileHeight, road.y + road.h - y);
          image(carpetTexture,
                road.x, y, tileWidth, drawHeight,
                0, 0,
                carpetTexture.width,
                carpetTexture.height * (drawHeight / tileHeight));
        }
      }
    } else {
      fill(150);
      rect(road.x, road.y, road.w, road.h);
    }
  }

  drawBuildings();
  drawObstacles();
  drawCoins();
  drawPlayer();

  let frame = floor(millis() / TORCH_FRAME_MS) % torchFrames.length;
  push();
  imageMode(CENTER);
  for (let t of torches) {
    image(torchFrames[frame], t.x, t.y - 32, 64, 96);
  }
  pop();

  pop();

  if (showGatekeeperPopup) {
    drawGatekeeperPopup();
  }
}