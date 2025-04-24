function collides(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 &&
         x1 + w1 > x2 &&
         y1 < y2 + h2 &&
         y1 + h1 > y2;
}

function collidesWithTree(newX, newY, tree) {
  if (!collides(newX, newY, 75, 75, tree.x, tree.y, tree.w, tree.h)) {
    return false;
  }

  let playerCorners = [
    { x: newX, y: newY },
    { x: newX + 75, y: newY },
    { x: newX, y: newY + 75 },
    { x: newX + 75, y: newY + 75 }
  ];

  for (let corner of playerCorners) {
    let imgX = map(corner.x, tree.x, tree.x + tree.w, 0, treeImage.width);
    let imgY = map(corner.y, tree.y, tree.y + tree.h, 0, treeImage.height);

    if (imgX >= 0 && imgX < treeImage.width && imgY >= 0 && imgY < treeImage.height) {
      treeImage.loadPixels();
      let index = 4 * (int(imgY) * treeImage.width + int(imgX));
      let alpha = treeImage.pixels[index + 3];
      if (alpha > 0) {
        return true;
      }
    }
  }
  return false;
}

function isWalkable(x, y) {
  // Check water (y=4000 to y=6000, excluding bridge x=1975 to x=2025)
  if (y > 4000 && y <= 6000 && (x < 1975 || x > 2025)) {
    return false;
  }
  // Grass area (y>6000) is walkable
  if (y > 6000) {
    return true;
  }

  for (let obstacle of obstacles) {
    if (obstacle.type === 'bush') {
      if (collides(x - COIN_RADIUS, y - COIN_RADIUS, COIN_RADIUS * 2, COIN_RADIUS * 2, obstacle.x, obstacle.y, obstacle.w, obstacle.h)) {
        return false;
      }
    } else if (obstacle.type === 'tree') {
      let imgX = map(x, obstacle.x, obstacle.x + obstacle.w, 0, treeImage.width);
      let imgY = map(y, obstacle.y, obstacle.y + obstacle.h, 0, treeImage.height);

      if (imgX >= 0 && imgX < treeImage.width && imgY >= 0 && imgY < treeImage.height) {
        treeImage.loadPixels();
        let index = 4 * (int(imgY) * treeImage.width + int(imgX));
        let alpha = treeImage.pixels[index + 3];
        if (alpha > 0) {
          return false;
        }
      }
    }
  }

  if (collides(x - COIN_RADIUS, y - COIN_RADIUS, COIN_RADIUS * 2, COIN_RADIUS * 2, castleX, castleY, castleWidth, castleHeight)) {
    let imgX = map(x, castleX, castleX + castleWidth, 0, castleImage.width);
    let imgY = map(y, castleY, castleY + castleHeight, 0, castleImage.height);

    if (imgX >= 0 && imgX < castleImage.width && imgY >= 0 && imgY < castleImage.height) {
      castleImage.loadPixels();
      let index = 4 * (int(imgY) * castleImage.width + int(imgX));
      let alpha = castleImage.pixels[index + 3];
      if (alpha > 0) {
        return false;
      }
    }
  }

  if (collides(x - COIN_RADIUS, y - COIN_RADIUS, COIN_RADIUS * 2, COIN_RADIUS * 2, shopX, shopY, shopWidth, shopHeight)) {
    let imgX = map(x, shopX, shopX + shopWidth, 0, shopImage.width);
    let imgY = map(y, shopY, shopY + shopHeight, 0, shopImage.height);

    if (imgX >= 0 && imgX < shopImage.width && imgY >= 0 && imgY < shopImage.height) {
      shopImage.loadPixels();
      let index = 4 * (int(imgY) * shopImage.width + int(imgX));
      let alpha = shopImage.pixels[index + 3];
      if (alpha > 0) {
        return false;
      }
    }
  }

  if (collides(x - COIN_RADIUS, y - COIN_RADIUS, COIN_RADIUS * 2, COIN_RADIUS * 2, cinemaX, cinemaY, cinemaWidth, cinemaHeight)) {
    let imgX = map(x, cinemaX, cinemaX + cinemaWidth, 0, cinemaImage.width);
    let imgY = map(y, cinemaY, cinemaY + cinemaHeight, 0, cinemaImage.height);

    if (imgX >= 0 && imgX < cinemaImage.width && imgY >= 0 && imgY < cinemaImage.height) {
      cinemaImage.loadPixels();
      let index = 4 * (int(imgY) * castleImage.width + int(imgX));
      let alpha = cinemaImage.pixels[index + 3];
      if (alpha > 0) {
        return false;
      }
    }
  }

  for (let coin of coins) {
    if (dist(x, y, coin.x, coin.y) < COIN_RADIUS * 2) {
      return false;
    }
  }

  return true;
}