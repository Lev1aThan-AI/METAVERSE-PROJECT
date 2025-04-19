let obstacles = [];

function generateObstacles() {
  let numBushes = 20;
  let bushSize = 40;

  for (let i = 0; i < numBushes; i++) {
    let validPosition = false;
    let x, y;

    while (!validPosition) {
      x = random(0, mapWidth - bushSize);
      y = random(0, mapHeight - bushSize);

      let overlapsCastle = x + bushSize > castleX && x < castleX + castleWidth &&
                          y + bushSize > castleY && y < castleY + castleHeight;
      let overlapsCobblestone = false;
      let overlapsCarpet = false;

      for (let path of cobblestonePaths) {
        if (x + bushSize > path.x && x < path.x + path.w &&
            y + bushSize > path.y && y < path.y + path.h) {
          overlapsCobblestone = true;
          break;
        }
      }

      for (let road of roads) {
        if (x + bushSize > road.x && x < road.x + road.w &&
            y + bushSize > road.y && y < road.y + road.h) {
          overlapsCarpet = true;
          break;
        }
      }

      let overlapsShop = x + bushSize > shopX && x < shopX + shopWidth &&
                         y + bushSize > shopY && y < shopY + shopHeight;

      let overlapsCinema = x + bushSize > cinemaX && x < cinemaX + cinemaWidth &&
                           y + bushSize > cinemaY && y < cinemaY + cinemaHeight;

      let overlapsHospital = x + bushSize > hospitalX && x < hospitalX + hospitalWidth &&
                             y + bushSize > hospitalY && y < hospitalY + hospitalHeight;

      let overlapsSchool = x + bushSize > schoolX && x < schoolX + schoolWidth &&
                           y + bushSize > schoolY && y < schoolY + schoolHeight;

      let overlapsLibrary = x + bushSize > libraryX && x < libraryX + libraryWidth &&
                           y + bushSize > libraryY && y < libraryY + libraryHeight;

      if (!overlapsCastle && !overlapsCobblestone && !overlapsCarpet && !overlapsShop && !overlapsCinema && !overlapsHospital && !overlapsSchool && !overlapsLibrary) {
        validPosition = true;
      }
    }

    obstacles.push({
      x: x,
      y: y,
      w: bushSize,
      h: bushSize,
      type: 'bush'
    });
  }

  let numTrees = 10;
  let treeWidth = 100;
  let treeHeight = 150;

  for (let i = 0; i < numTrees; i++) {
    let validPosition = false;
    let x, y;

    while (!validPosition) {
      x = random(0, mapWidth - treeWidth);
      y = random(0, mapHeight - treeHeight);

      let overlapsCastle = x + treeWidth > castleX && x < castleX + castleWidth &&
                           y + treeHeight > castleY && y < castleY + castleHeight;
      let overlapsCobblestone = false;
      let overlapsCarpet = false;

      for (let path of cobblestonePaths) {
        if (x + treeWidth > path.x && x < path.x + path.w &&
            y + treeHeight > path.y && y < path.y + path.h) {
          overlapsCobblestone = true;
          break;
        }
      }

      for (let road of roads) {
        if (x + treeWidth > road.x && x < road.x + road.w &&
            y + treeHeight > road.y && y < road.y + road.h) {
          overlapsCarpet = true;
          break;
        }
      }

      let overlapsShop = x + treeWidth > shopX && x < shopX + shopWidth &&
                         y + treeHeight > shopY && y < shopY + shopHeight;

      let overlapsCinema = x + treeWidth > cinemaX && x < cinemaX + cinemaWidth &&
                           y + treeHeight > cinemaY && y < cinemaY + cinemaHeight;

      let overlapsHospital = x + treeWidth > hospitalX && x < hospitalX + hospitalWidth &&
                             y + treeHeight > hospitalY && y < hospitalY + hospitalHeight;

      let overlapsSchool = x + treeWidth > schoolX && x < schoolX + schoolWidth &&
                           y + treeHeight > schoolY && y < schoolY + schoolHeight;

      let overlapsLibrary = x + treeWidth > libraryX && x < libraryX + libraryWidth &&
                           y + treeHeight > libraryY && y < libraryY + libraryHeight;

      let overlapsBush = false;
      for (let obstacle of obstacles) {
        if (obstacle.type === 'bush') {
          if (x + treeWidth > obstacle.x && x < obstacle.x + obstacle.w &&
              y + treeHeight > obstacle.y && y < obstacle.y + obstacle.h) {
            overlapsBush = true;
            break;
          }
        }
      }

      if (!overlapsCastle && !overlapsCobblestone && !overlapsCarpet && !overlapsShop && !overlapsCinema && !overlapsHospital && !overlapsSchool && !overlapsLibrary && !overlapsBush) {
        validPosition = true;
      }
    }

    obstacles.push({
      x: x,
      y: y,
      w: treeWidth,
      h: treeHeight,
      type: 'tree'
    });
  }
}

function drawObstacles() {
  imageMode(CORNER);
  for (let obstacle of obstacles) {
    if (obstacle.type === 'bush') {
      if (bushImage && bushImage.width > 0 && bushImage.height > 0) {
        image(bushImage, obstacle.x, obstacle.y, obstacle.w, obstacle.h);
      } else {
        fill(20, 100, 20);
        rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
      }
    } else if (obstacle.type === 'tree') {
      if (treeImage && treeImage.width > 0 && treeImage.height > 0) {
        image(treeImage, obstacle.x, obstacle.y, obstacle.w, obstacle.h);
      } else {
        fill(139, 90, 43);
        rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
      }
    }
  }
}