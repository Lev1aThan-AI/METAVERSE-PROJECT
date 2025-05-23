let gameState = 'menu';
let playerX, playerY;
let mapWidth = 4000;
let mapHeight = 8000;
let cameraX, cameraY;
let zoom = 0.6;
let showMiniMap = false;
let showInventory = false;
let playerHP = 100;
let volumeLevel = 0.5;
let draggingVolume = false;
let showSettings = false;
let musicMuted = false;
let torchFrames = [];
let torches = [];
const TORCH_FRAME_MS = 100;

let inventory = {
  apple: 0,
  sword: 0,
  shield: 0
};
let equippedItems = {
  sword: false,
  shield: false
};

let showShopPopup = false;
let showMarketplace = false;
let hasDismissedShopPopup = false;
let showComputerPopup = false;
let hasDismissedComputerPopup = false;
let hasGatekeeperAccess = false;

let jonikoX = 600;
let jonikoY = 300;
let jonikoWidth = 90;
let jonikoHeight = 90;
let showJonikoPopup = false;
let hasDismissedJonikoPopup = false;
let hasPlayedJonikoSound = false;

let ermaloX = 340;
let ermaloY = 450;
let ermaloWidth = 90;
let ermaloHeight = 90;
let showErmaloPopup = false;
let hasDismissedErmaloPopup = false;
let hasPlayedErmaloSound = false;

let maxoX = 860;
let maxoY = 450;
let maxoWidth = 90;
let maxoHeight = 90;
let showMaxoPopup = false;
let hasDismissedMaxoPopup = false;
let hasPlayedMaxoSound = false;

let giomariX = 600;
let giomariY = 450;
let giomariWidth = 90;
let giomariHeight = 90;
let showGiomariPopup = false;
let hasDismissedGiomariPopup = false;
let hasPlayedGioMariSound = false;

let healingStationX = 600;
let healingStationY = 600;
let healingStationWidth = 150;
let healingStationHeight = 150;

let hospitalInterior = {
  width: 1200,
  height: 1200
};

let schoolInterior = {
  width: 1200,
  height: 1200
};

let libraryInterior = {
  width: 1200,
  height: 1200
};

let touchpointX;
let touchpointY;
let touchpointWidth = 50;
let touchpointHeight = 50;

let currentDirection = 'right';
let lastDirection = 'right';
let currentFrame = 0;
let lastFrameTime = 0;
const FRAME_DURATION = 125;
let isMoving = false;

let keyPressStartTime = 0;
const MIN_KEY_HOLD_TIME = 50;

let joystick = { x: 60, y: 560, radius: 40, innerRadius: 20, active: false, dx: 0, dy: 0 };

let coinScore = 0;

let playerLevel = 1;
let playerXP = 0;
let xpToNextLevel = [];

let castleInterior = {
  width: 1200,
  height: 1200
};

let cinemaInterior = {
  width: 1200,
  height: 1200
};

let isTransitioning = false;
let lastWaterDamageTime = 0;

function setup() {
  createCanvas(360, 640);
  let canvas = select('canvas');
  canvas.elt.setAttribute('willReadFrequently', 'true');

  playerX = 2000;
  playerY = 850;
  cameraX = playerX - width / (2 * zoom);
  cameraY = playerY - height / (2 * zoom);
  generateObstacles();
  spawnCoins();

  const IDEAL_SPACING = 200;
  for (let path of cobblestonePaths) {
    let count = floor(path.h / IDEAL_SPACING) || 1;
    let spacing = path.h / (count + 1);
    for (let i = 1; i <= count; i++) {
      let y = path.y + spacing * i;
      torches.push({ x: path.x, y: y });
      torches.push({ x: path.x + path.w, y: y });
    }
  }

  for (let level = 1; level <= 99; level++) {
    xpToNextLevel[level] = 10 * (level * level) + 10;
  }

  touchpointX = shopX + shopWidth / 2 - touchpointWidth / 2;
  touchpointY = shopY + shopHeight;

  obstacles.push({ type: 'joniko',
    x: jonikoX - jonikoWidth / 2,
    y: jonikoY - jonikoHeight / 2,
    w: jonikoWidth, h: jonikoHeight });
  obstacles.push({ type: 'ermalo',
    x: ermaloX - ermaloWidth / 2,
    y: ermaloY - ermaloHeight / 2,
    w: ermaloWidth, h: ermaloHeight });
  obstacles.push({ type: 'maxo',
    x: maxoX - maxoWidth / 2,
    y: maxoY - maxoHeight / 2,
    w: maxoWidth, h: maxoHeight });
  obstacles.push({ type: 'giomari',
    x: giomariX - giomariWidth / 2,
    y: giomariY - giomariHeight / 2,
    w: giomariWidth, h: giomariHeight });
  obstacles.push({ type: 'healing_station',
    x: healingStationX - healingStationWidth / 2,
    y: healingStationY - healingStationWidth / 2,
    w: healingStationWidth, h: healingStationHeight });

  userStartAudio().then(() => {
    startGameMusic();
  });
}

function draw() {
  if (gameState === 'gameOver') {
    background(0); // Set background to black for game over
  } else {
    background(220); // Set background to light gray for other states
  }
  if (gameState === 'menu') {
    drawMenu();
    if (showSettings) {
      drawSettingsWindow();
    }
  } else if (gameState === 'game') {
    updatePlayerPosition();
    manageCoins();

 
// Check if player is in water (y > 4000 and y <= 6000, excluding bridge x=1850 to x=2150)
if (playerY > 4000 && playerY <= 6000 && (playerX < 1850 || playerX > 2150))   {
      let currentTime = millis();
      if (currentTime - lastWaterDamageTime >= 1000) { // 1 second interval
        playerHP = max(0, playerHP - 10); // Lose 10 HP per second
        lastWaterDamageTime = currentTime;
      }
    } else {
      lastWaterDamageTime = 0; // Reset timer when not in water
    }

    // Check for death
    if (playerHP <= 0) {
      gameState = 'gameOver';
    }

    cameraX = playerX - width / (2 * zoom);
    cameraY = playerY - height / (2 * zoom);
    cameraX = constrain(cameraX, 0, mapWidth - width / zoom);
    cameraY = constrain(cameraY, 0, mapHeight - width / zoom);

    drawGame();

    let isCollidingWithTouchpoint = collides(
      playerX, playerY, 75, 75,
      touchpointX, touchpointY,
      touchpointWidth, touchpointHeight
    );
    if (isCollidingWithTouchpoint && !hasDismissedShopPopup) {
      showShopPopup = true;
    } else if (!isCollidingWithTouchpoint) {
      showShopPopup = false;
      showMarketplace = false;
      hasDismissedShopPopup = false;
    }
    if (showShopPopup && !showMarketplace) drawShopPopup();
    if (showMarketplace) drawMarketplace();

    drawHPBar();
    drawLevelAndXP();
    drawCoinScore();
    drawSoundButton();
    drawLocalTime();

    drawTouchControls();
    try {
      if (showMiniMap) drawMiniMap();
    } catch (error) {
      console.error('Error rendering world minimap:', error);
    }
    if (showInventory) drawInventory();

  } else if (gameState === 'castleInterior') {
    updateCastleInteriorPosition();
    drawCastleInterior();

    let isCollidingWithComputer = collides(
      playerX, playerY, 75, 75,
      computerX - computerWidth / 2,
      computerY - computerHeight / 2,
      computerWidth, computerHeight
    );
    if (isCollidingWithComputer && !hasDismissedComputerPopup) {
      showComputerPopup = true;
    } else if (!isCollidingWithComputer) {
      showComputerPopup = false;
      hasDismissedComputerPopup = false;
    }
    if (showComputerPopup) drawComputerPopup();

    drawTouchControls();
    try {
      if (showMiniMap) drawCastleInteriorMiniMap();
    } catch (error) {
      console.error('Error rendering castle minimap:', error);
    }
    if (showInventory) drawInventory();

  } else if (gameState === 'cinemaInterior') {
    updateCinemaInteriorPosition();
    drawCinemaInterior();

    let isCollidingWithGiomari = collides(
      playerX, playerY, 75, 75,
      giomariX - giomariWidth / 2,
      giomariY - giomariHeight / 2,
      giomariWidth, giomariHeight
    );
    if (isCollidingWithGiomari && !hasDismissedGiomariPopup) {
      showGiomariPopup = true;
      if (!hasPlayedGioMariSound) {
        gioMariSound.play();
        hasPlayedGioMariSound = true;
      }
    } else if (!isCollidingWithGiomari) {
      showGiomariPopup = false;
      hasDismissedGiomariPopup = false;
      hasPlayedGioMariSound = false;
    }
    if (showGiomariPopup) drawGiomariPopup();

    let isCollidingWithJoniko = collides(
      playerX, playerY, 75, 75,
      jonikoX - jonikoWidth / 2,
      jonikoY - jonikoHeight / 2,
      jonikoWidth, jonikoHeight
    );
    if (isCollidingWithJoniko && !hasDismissedJonikoPopup) {
      showJonikoPopup = true;
      if (!hasPlayedJonikoSound) {
        jonikoSound.play();
        hasPlayedJonikoSound = true;
      }
    } else if (!isCollidingWithJoniko) {
      showJonikoPopup = false;
      hasDismissedJonikoPopup = false;
      hasPlayedJonikoSound = false;
    }
    if (showJonikoPopup) drawJonikoPopup();

    let isCollidingWithErmalo = collides(
      playerX, playerY, 75, 75,
      ermaloX - ermaloWidth / 2,
      ermaloY - ermaloHeight / 2,
      ermaloWidth, ermaloHeight
    );
    if (isCollidingWithErmalo && !hasDismissedErmaloPopup) {
      showErmaloPopup = true;
      if (!hasPlayedErmaloSound) {
        ermaloSound.play();
        hasPlayedErmaloSound = true;
      }
    } else if (!isCollidingWithErmalo) {
      showErmaloPopup = false;
      hasDismissedErmaloPopup = false;
      hasPlayedErmaloSound = false;
    }
    if (showErmaloPopup) drawErmaloPopup();

    let isCollidingWithMaxo = collides(
      playerX, playerY, 75, 75,
      maxoX - maxoWidth / 2,
      maxoY - maxoHeight / 2,
      maxoWidth, maxoHeight
    );
    if (isCollidingWithMaxo && !hasDismissedMaxoPopup) {
      showMaxoPopup = true;
      if (!hasPlayedMaxoSound) {
        goriSound.play();
        hasPlayedMaxoSound = true;
      }
    } else if (!isCollidingWithMaxo) {
      showMaxoPopup = false;
      hasDismissedMaxoPopup = false;
      hasPlayedMaxoSound = false;
    }
    if (showMaxoPopup) drawMaxoPopup();

    drawTouchControls();
    try {
      if (showMiniMap) drawCinemaInteriorMiniMap();
    } catch (error) {
      console.error('Error rendering cinema minimap:', error);
    }
    if (showInventory) drawInventory();

  } else if (gameState === 'hospitalInterior') {
    updateHospitalInteriorPosition();
    drawHospitalInterior();
    drawTouchControls();
    try {
      if (showMiniMap) drawHospitalInteriorMiniMap();
    } catch (error) {
      console.error('Error rendering hospital minimap:', error);
    }
    if (showInventory) drawInventory();

  } else if (gameState === 'schoolInterior') {
    updateSchoolInteriorPosition();
    drawSchoolInterior();
    drawTouchControls();
    try {
      if (showMiniMap) drawSchoolInteriorMiniMap();
    } catch (error) {
      console.error('Error rendering school minimap:', error);
    }
    if (showInventory) drawInventory();

  } else if (gameState === 'libraryInterior') {
    if (!showMiniMap) minimapAlpha = 0;
    updateLibraryInteriorPosition();
    drawLibraryInterior();
    drawTouchControls();
    try {
      if (showMiniMap) drawLibraryInteriorMiniMap();
    } catch (error) {
      console.error('Error rendering library minimap:', error);
    }
    if (showInventory) drawInventory();
  }    else if (gameState === 'gameOver') {
    // Render game over popup
    if (gameOverImage && gameOverImage.width > 0 && gameOverImage.height > 0) {
      imageMode(CENTER);
      image(gameOverImage, width / 2, height / 2, 360, 360); // Centered, scaled to fit canvas width
    } else {
      fill(255, 0, 0);
      rect((width - 360) / 2, (height - 360) / 2, 360, 360); // Fallback red rectangle
    }
  }

  if (gameState !== 'menu') {
    drawDayOverlay();
    drawSunriseOverlay();
  }

  if (showSettings) {
    push();
    resetMatrix();
    drawSettingsWindow();
    pop();
  }
}

function keyPressed() {
  if (keyCode === ESCAPE && showSettings) {
    showSettings = false;
  }
}