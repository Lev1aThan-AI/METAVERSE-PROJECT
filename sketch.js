let gameState = 'menu';
let playerX, playerY;
let mapWidth = 4000;
let mapHeight = 4000;
let cameraX, cameraY;
let zoom = 0.6;
let showMiniMap = false;
let showInventory = false;
let playerHP = 100;
let volumeLevel = 0.5;
let draggingVolume = false;
let showSettings = false;
let musicMuted = false;

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

// Joniko variables (center, higher up)
let jonikoX = 600;
let jonikoY = 300;
let jonikoWidth = 90;
let jonikoHeight = 90;
let showJonikoPopup = false;
let hasDismissedJonikoPopup = false;
let hasPlayedJonikoSound = false;

// Ermalo variables (left side)
let ermaloX = 340;
let ermaloY = 450;
let ermaloWidth = 90;
let ermaloHeight = 90;
let showErmaloPopup = false;
let hasDismissedErmaloPopup = false;
let hasPlayedErmaloSound = false;

// Maxo variables (right side)
let maxoX = 860;
let maxoY = 450;
let maxoWidth = 90;
let maxoHeight = 90;
let showMaxoPopup = false;
let hasDismissedMaxoPopup = false;
let hasPlayedMaxoSound = false;

// Giomari variables (middle, between Ermalo and Maxo)
let giomariX = 600;
let giomariY = 450;
let giomariWidth = 90;
let giomariHeight = 90;
let showGiomariPopup = false;
let hasDismissedGiomariPopup = false;
let hasPlayedGioMariSound = false;

// Healing Station variables (center of hospital)
let healingStationX = 600;
let healingStationY = 600;
let healingStationWidth = 150;
let healingStationHeight = 150;

// Hospital interior
let hospitalInterior = {
  width: 1200,
  height: 1200
};

// School interior
let schoolInterior = {
  width: 1200,
  height: 1200
};

// Library interior
let libraryInterior = {
  width: 1200,
  height: 1200
};

// Touchpoint variables for the bottom center of shop.png
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
    y: healingStationY - healingStationHeight / 2,
    w: healingStationWidth, h: healingStationHeight });

  // Unlock audio on first user gesture, then start music loop
  userStartAudio().then(() => {
    startGameMusic();
  });
}

function draw() {
  background(220);

  if (gameState === 'menu') {
    drawMenu();
    if (showSettings) {
      drawSettingsWindow(); // now comes from settingsMenu.js
    }
  } else if (gameState === 'game') {
    updatePlayerPosition();
    manageCoins();

    cameraX = playerX - width / (2 * zoom);
    cameraY = playerY - height / (2 * zoom);
    cameraX = constrain(cameraX, 0, mapWidth - width / zoom);
    cameraY = constrain(cameraY, 0, mapHeight - height / zoom);

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

    // **Giomari**
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

    // **Joniko**
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

    // **Ermalo**
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

    // **Maxo**
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
  }

  // Draw settings window if showSettings is true, regardless of game state
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