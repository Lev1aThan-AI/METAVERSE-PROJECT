let coins = [];
let lastCoinSpawnTime = 0;
let lastDisappearanceTime = 0;
const COIN_LIFETIME = 300000;
const COIN_RESPAWN_DELAY = 300000;
const COIN_COUNT = 30;
const COIN_RADIUS = 10;

function drawCoins() {
  imageMode(CENTER);
  for (let coin of coins) {
    push();
    translate(coin.x, coin.y);
    rotate(radians(coin.rotation));
    if (coinImage && coinImage.width > 0 && coinImage.height > 0) {
      image(coinImage, 0, 0, COIN_RADIUS * 2, COIN_RADIUS * 2);
    } else {
      fill(255, 215, 0);
      ellipse(0, 0, COIN_RADIUS * 2);
    }
    pop();
    coin.rotation = (coin.rotation + 2) % 360;
  }
}

function spawnCoins() {
  coins = [];
  for (let i = 0; i < COIN_COUNT; i++) {
    let x, y;
    let validPosition = false;

    while (!validPosition) {
      x = random(COIN_RADIUS, mapWidth - COIN_RADIUS);
      y = random(COIN_RADIUS, mapHeight - COIN_RADIUS);
      if (isWalkable(x, y)) {
        validPosition = true;
      }
    }

    coins.push({
      x: x,
      y: y,
      spawnTime: millis(),
      rotation: 0
    });
  }
  lastCoinSpawnTime = millis();
}

function manageCoins() {
  let currentTime = millis();

  for (let i = coins.length - 1; i >= 0; i--) {
    let coin = coins[i];
    if (currentTime - coin.spawnTime >= COIN_LIFETIME) {
      coins.splice(i, 1);
      if (coins.length === 0) {
        lastDisappearanceTime = currentTime;
      }
    }
  }

  if (coins.length === 0 && lastDisappearanceTime > 0) {
    if (currentTime - lastDisappearanceTime >= COIN_RESPAWN_DELAY) {
      spawnCoins();
      lastDisappearanceTime = 0;
    }
  }
}