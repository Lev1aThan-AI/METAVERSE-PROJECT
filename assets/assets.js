// assets/assets.js

// === Image vars ===
let grassImage;
let cobblestoneTexture;
let carpetTexture;
let treeImage;
let bushImage;
let castleImage;
let shopImage;
let cinemaImage;
let castleRoomFloorTexture;
let computerImage;
let coinImage;
let appleImage;
let swordImage;
let shieldImage;
let gatekeeperImage;
let vikingStanding;
let vikingRightFrames = [];
let jonikoImage;
let cinemaFloorTexture;
let ermaloImage;
let maxoImage;
let hospitalImage;
let healingStationImage;
let hospitalFloorTexture;
let giomariImage;
let startingImage;
let schoolImage;
let schoolFloorTexture;
let libraryImage; // Added for library building
let libraryFloorTexture; // Added for library interior floor
let hpbarImage;
let coinBalanceImage;     // ← add this
let xpBalanceImage; 
let settingsImage;
let soundButtonImage;
let gameOverImage;


// === Sound vars ===
let jonikoSound;
let goriSound;
let gioMariSound;
let ermaloSound;
let gameMusic = [];
let currentMusicIndex = 0;
let isMusicPlaying = true;

// Preload everything before setup()
function preload() {
  // — your existing image loads unchanged —
  grassImage              = loadImage('assets/grass.png');
  cobblestoneTexture      = loadImage('assets/cobblestone.png');
  carpetTexture           = loadImage('assets/carpet.png');
  treeImage               = loadImage('assets/tree1.png');
  bushImage               = loadImage('assets/bush.png');
  castleImage             = loadImage('assets/castle.png');
  shopImage               = loadImage('assets/shop.png');
  cinemaImage             = loadImage('assets/absolutecinema.png');
  castleRoomFloorTexture  = loadImage('assets/castleroom_floor.png');
  computerImage           = loadImage('assets/computer.png');
  coinImage               = loadImage('assets/coin.png');
  appleImage              = loadImage('assets/apple.png');
  swordImage              = loadImage('assets/sword.png');
  shieldImage             = loadImage('assets/shield.png');
  gatekeeperImage         = loadImage('assets/anja.png');
  vikingStanding          = loadImage('assets/viking_standing.png');
  for (let i = 1; i <= 5; i++) {
    let frame = loadImage(`assets/viking_right_${i}.png`);
    vikingRightFrames.push(frame);
  }
  jonikoImage             = loadImage('assets/joniko.png');
  cinemaFloorTexture      = loadImage('assets/cinema_floor.png');
  ermaloImage             = loadImage('assets/ermalo.png');
  maxoImage               = loadImage('assets/maxo.png');
  hospitalImage           = loadImage('assets/hospital.png');
  healingStationImage     = loadImage('assets/healing_station.png');
  hospitalFloorTexture    = loadImage('assets/hospital_floor.png');
  schoolImage             = loadImage('assets/school.png');
  schoolFloorTexture      = loadImage('assets/school_floor.png');
  libraryImage            = loadImage('assets/library.png');
  libraryFloorTexture     = loadImage('assets/library_floor.png');
  // Load the new HP‑bar panel background
  hpbarImage = loadImage('assets/hpbar.png');
  startingImage           = loadImage('assets/Starting.png');
  // Load the new coin‑balance panel
  coinBalanceImage = loadImage('assets/coinbalance.png');
  xpBalanceImage  = loadImage('assets/xpbalance.png',  () => console.log('Loaded xpbalance.png'));
  // Restore Giomari image
  settingsImage   = loadImage('assets/settings.png');  // ← preload settings panel graphic
  // Load the new settings icon
  torchFrames = [];
  torchFrames[0] = loadImage('assets/torchanimation1.png');
  torchFrames[1] = loadImage('assets/torchanimation2.png');
  torchFrames[2] = loadImage('assets/torchanimation3.png');
  giomariImage = loadImage('assets/Giomari.png', () => console.log('Loaded Giomari.png'));
  soundButtonImage = loadImage('assets/soundbutton.png');
  // Load sounds
  gameOverImage = loadImage('assets/gameover.png');
 

  jonikoSound = loadSound('assets/Joniko sound 1.mp3');
  goriSound   = loadSound('assets/gori sound 2.mp3');
  gioMariSound= loadSound('assets/Gio mari sound 1.mp3');
  ermaloSound = loadSound('assets/Ermalo sound 2.mp3');

  // Load game music tracks
  for (let i = 1; i <= 4; i++) {
    gameMusic[i - 1] = loadSound(
      `assets/gamemusic${i}.mp3`
    );
  }
}

function startGameMusic() {
  if (!isMusicPlaying) return;

  // Resume audio context if suspended (for autoplay policies)
  if (typeof getAudioContext === 'function') {
    let ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
  }

  let track = gameMusic[currentMusicIndex];
  track.setVolume(0.5);
  track.play();
  track.onended(() => {
    currentMusicIndex = (currentMusicIndex + 1) % gameMusic.length;
    startGameMusic();
  });
}

function toggleGameMusic(shouldPlay) {
  isMusicPlaying = shouldPlay;
  if (shouldPlay) {
    startGameMusic();
  } else {
    // stop whichever is playing
    gameMusic[currentMusicIndex].stop();
  }
}
