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

// === Sound vars ===
let jonikoSound;
let goriSound;
let gioMariSound;
let ermaloSound;

// Preload everything before setup()
function preload() {
  grassImage              = loadImage('assets/grass.png',          () => console.log('Loaded grass.png'));
  cobblestoneTexture      = loadImage('assets/cobblestone.png',   () => console.log('Loaded cobblestone.png'));
  carpetTexture           = loadImage('assets/carpet.png',        () => console.log('Loaded carpet.png'));
  treeImage               = loadImage('assets/tree1.png',         () => console.log('Loaded tree1.png'));
  bushImage               = loadImage('assets/bush.png',          () => console.log('Loaded bush.png'));

  castleImage             = loadImage('assets/castle.png',        () => console.log('Loaded castle.png'));
  shopImage               = loadImage('assets/shop.png',          () => console.log('Loaded shop.png'));
  cinemaImage             = loadImage('assets/absolutecinema.png',() => console.log('Loaded absolutecinema.png'));

  castleRoomFloorTexture  = loadImage('assets/castleroom_floor.png',  () => console.log('Loaded castleroom_floor.png'));

  computerImage           = loadImage('assets/computer.png',      () => console.log('Loaded computer.png'));

  coinImage               = loadImage('assets/coin.png',          () => console.log('Loaded coin.png'));
  appleImage              = loadImage('assets/apple.png',         () => console.log('Loaded apple.png'));
  swordImage              = loadImage('assets/sword.png',         () => console.log('Loaded sword.png'));
  shieldImage             = loadImage('assets/shield.png',        () => console.log('Loaded shield.png'));

  gatekeeperImage         = loadImage('assets/anja.png',          () => console.log('Loaded anja.png'));

  vikingStanding          = loadImage('assets/viking_standing.png',
                                      () => console.log('Loaded viking_standing.png'));

  // Load the 5 walk-cycle frames into our array
  for (let i = 1; i <= 5; i++) {
    let frame = loadImage(
      `assets/viking_right_${i}.png`,
      () => console.log(`Loaded viking_right_${i}.png`)
    );
    vikingRightFrames.push(frame);
  }

  // Load Joniko
  jonikoImage = loadImage('assets/joniko.png', () => console.log('Loaded joniko.png'));

  // Load cinema floor texture
  cinemaFloorTexture = loadImage('assets/cinema_floor.png', () => console.log('Loaded cinema_floor.png'));

  // Load Ermalo
  ermaloImage = loadImage('assets/ermalo.png', () => console.log('Loaded ermalo.png'));

  // Load Maxo
  maxoImage = loadImage('assets/maxo.png', () => console.log('Loaded maxo.png'));

  // Load Hospital
  hospitalImage = loadImage('assets/hospital.png', () => console.log('Loaded hospital.png'));

  // Load Healing Station
  healingStationImage = loadImage('assets/healing_station.png', () => console.log('Loaded healing_station.png'));

  // Load Hospital Floor Texture
  hospitalFloorTexture = loadImage('assets/hospital_floor.png', () => console.log('Loaded hospital_floor.png'));

  // Load School
  schoolImage = loadImage('assets/school.png', () => console.log('Loaded school.png'));

  // Load School Floor Texture
  schoolFloorTexture = loadImage('assets/school_floor.png', () => console.log('Loaded school_floor.png'));

  // Load Library
  libraryImage = loadImage('assets/library.png', () => console.log('Loaded library.png'));

  // Load Library Floor Texture
  libraryFloorTexture = loadImage('assets/library_floor.png', () => console.log('Loaded library_floor.png'));

  // Load Starting Image for menu background
  startingImage = loadImage('assets/Starting.png', () => console.log('Loaded Starting.png'));

  // Load Joniko Sound
  jonikoSound = loadSound('assets/Joniko sound 1.mp3', () => console.log('Loaded Joniko sound 1.mp3'));

  // Load Gori Sound for Maxo
  goriSound = loadSound('assets/gori sound 2.mp3', () => console.log('Loaded gori sound 2.mp3'));

  // Load Giomari
  giomariImage = loadImage('assets/Giomari.png', () => console.log('Loaded Giomari.png'));

  // Load Giomari Sound
  gioMariSound = loadSound('assets/Gio mari sound 1.mp3', () => console.log('Loaded Gio mari sound 1.mp3'));

  // Load Ermalo Sound
  ermaloSound = loadSound('assets/Ermalo sound 2.mp3', () => console.log('Loaded Ermalo sound 2.mp3'));
}