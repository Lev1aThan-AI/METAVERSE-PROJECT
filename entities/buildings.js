// entities/buildings.js

// World coordinates for buildings and doors
let castleX = 2000 - 500;
let castleY = -150;
let castleWidth = 1000;
let castleHeight = 1000;

let castleDoor = {
  x: 1950,
  y: 700,
  w: 100,
  h: 100
};

let shopX = 1100;
let shopY = 2000;
let shopWidth = 400;
let shopHeight = 400;

// Library building (left of shop on grass, aligned with shop's base)
let libraryX = 300;
let libraryY = 1650; // Updated to align base with shop at y=2400
let libraryWidth = 750;
let libraryHeight = 750;

let libraryDoor = {
  x: 625, // Centered: 300 + 750 / 2 - 50
  y: 2300, // Near bottom: 1650 + 750 - 100 to align with base
  w: 100,
  h: 100
};

let cinemaX = 2500;
let cinemaY = 1890;
let cinemaWidth = 500;
let cinemaHeight = 500;

let cinemaDoor = {
  x: 2700,
  y: 2290,
  w: 100,
  h: 100
};

// Hospital building (to the right of cinema)
let hospitalX = 3000; // cinemaX + cinemaWidth
let hospitalY = 1890; // Same y as cinema
let hospitalWidth = 500; // Same size as cinema
let hospitalHeight = 500;

let hospitalDoor = {
  x: 3200, // Near right side of hospital
  y: 2290, // Same y as cinemaDoor
  w: 100,
  h: 100
};

// School building (to the right of hospital)
let schoolX = 3500; // hospitalX + hospitalWidth
let schoolY = 1890; // Same y as hospital
let schoolWidth = 500; // Same size as hospital
let schoolHeight = 500;

let schoolDoor = {
  x: 3750, // Centered under SCHOOL sign
  y: 2350, // Adjusted to be just above the bottom edge of the building sprite
  w: 100,
  h: 40 // Reduced height to fit visually within the sprite
};

let bottomDoor = {
  x: 580,
  y: 1180,
  w: 40,
  h: 20
};

let cinemaBottomDoor = {
  x: 580,
  y: 1180,
  w: 40,
  h: 20
};

let hospitalBottomDoor = {
  x: 580,
  y: 1180,
  w: 40,
  h: 20
};

// School bottom door for exiting
let schoolBottomDoor = {
  x: 580,
  y: 1180,
  w: 40,
  h: 20
};

// Library bottom door for exiting
let libraryBottomDoor = {
  x: 580,
  y: 1180,
  w: 40,
  h: 20
};

let computerX = 600;
let computerY = 600;
let computerWidth = 100;
let computerHeight = 100;

// Gatekeeper (Anja) size and position
let gatekeeperWidth = 120;
let gatekeeperHeight = 120;
let gatekeeperX = castleDoor.x + castleDoor.w / 2 - 20;
let gatekeeperY = castleDoor.y + castleDoor.h / 2;

let showGatekeeperPopup = false;
let hasDismissedGatekeeperPopup = false;

/**
 * Draws the castle, shop, library, cinema, hospital, and school on the map.
 */
function drawBuildings() {
  // Castle
  if (castleImage && castleImage.width > 0 && castleImage.height > 0) {
    image(castleImage, castleX, castleY, castleWidth, castleHeight);
  } else {
    fill(139, 69, 19);
    rect(castleX, castleY, castleWidth, castleHeight);
  }

  // Shop
  if (shopImage && shopImage.width > 0 && shopImage.height > 0) {
    image(shopImage, shopX, shopY, shopWidth, shopHeight);
  } else {
    fill(139, 69, 19);
    rect(shopX, shopY, shopWidth, shopHeight);
  }

  // Library
  if (libraryImage && libraryImage.width > 0 && libraryImage.height > 0) {
    image(libraryImage, libraryX, libraryY, libraryWidth, libraryHeight);
  } else {
    fill(160, 160, 160); // Medium gray for library if image fails
    rect(libraryX, libraryY, libraryWidth, libraryHeight);
  }

  // Cinema
  if (cinemaImage && cinemaImage.width > 0 && cinemaImage.height > 0) {
    image(cinemaImage, cinemaX, cinemaY, cinemaWidth, cinemaHeight);
  } else {
    fill(200, 150, 150);
    rect(cinemaX, cinemaY, cinemaWidth, cinemaHeight);
  }

  // Hospital
  if (hospitalImage && hospitalImage.width > 0 && hospitalImage.height > 0) {
    image(hospitalImage, hospitalX, hospitalY, hospitalWidth, hospitalHeight);
  } else {
    fill(200, 200, 200); // Light gray for hospital if image fails
    rect(hospitalX, hospitalY, hospitalWidth, hospitalHeight);
  }

  // School
  if (schoolImage && schoolImage.width > 0 && schoolImage.height > 0) {
    image(schoolImage, schoolX, schoolY, schoolWidth, schoolHeight);
  } else {
    fill(180, 180, 180); // Slightly darker gray for school if image fails
    rect(schoolX, schoolY, schoolWidth, schoolHeight);
  }

  // Gatekeeper
  push();
  imageMode(CENTER);
  if (gatekeeperImage && gatekeeperImage.width > 0 && gatekeeperImage.height > 0) {
    image(gatekeeperImage, gatekeeperX, gatekeeperY, gatekeeperWidth, gatekeeperHeight);
  } else {
    fill(0);
    rect(gatekeeperX - gatekeeperWidth/2, gatekeeperY - gatekeeperHeight/2, gatekeeperWidth, gatekeeperHeight);
  }
  pop();
}

/**
 * Pixel-perfect collision for castle (accounts for transparent edges).
 */
function collidesWithCastle(newX, newY) {
  if (!collides(newX, newY, 75, 75, castleX, castleY, castleWidth, castleHeight)) {
    return false;
  }
  let corners = [
    {x:newX, y:newY},
    {x:newX+75, y:newY},
    {x:newX, y:newY+75},
    {x:newX+75, y:newY+75}
  ];
  for (let corner of corners) {
    let imgX = map(corner.x, castleX, castleX+castleWidth, 0, castleImage.width);
    let imgY = map(corner.y, castleY, castleY+castleHeight, 0, castleImage.height);
    if (imgX>=0 && imgX<castleImage.width && imgY>=0 && imgY<castleImage.height) {
      castleImage.loadPixels();
      let idx = 4 * (int(imgY)*castleImage.width + int(imgX));
      if (castleImage.pixels[idx+3] > 0) return true;
    }
  }
  return false;
}

function collidesWithShop(newX, newY) {
  if (!collides(newX, newY, 75,75, shopX, shopY, shopWidth, shopHeight)) return false;
  let corners = [
    {x:newX, y:newY},
    {x:newX+75, y:newY},
    {x:newX, y:newY+75},
    {x:newX+75, y:newY+75}
  ];
  for (let c of corners) {
    let imgX = map(c.x, shopX, shopX+shopWidth, 0, shopImage.width);
    let imgY = map(c.y, shopY, shopY+shopHeight, 0, shopImage.height);
    if (imgX>=0 && imgX<shopImage.width && imgY>=0 && imgY<shopImage.height) {
      shopImage.loadPixels();
      let idx = 4 * (int(imgY)*shopImage.width + int(imgX));
      if (shopImage.pixels[idx+3] > 0) return true;
    }
  }
  return false;
}

function collidesWithLibrary(newX, newY) {
  if (!collides(newX, newY, 75, 75, libraryX, libraryY, libraryWidth, libraryHeight)) return false;
  // Exclude library door from collision
  if (collides(newX, newY, 75, 75, libraryDoor.x, libraryDoor.y, libraryDoor.w, libraryDoor.h)) {
    return false;
  }
  let corners = [
    {x:newX, y:newY},
    {x:newX+75, y:newY},
    {x:newX, y:newY+75},
    {x:newX+75, y:newY+75}
  ];
  for (let c of corners) {
    let imgX = map(c.x, libraryX, libraryX + libraryWidth, 0, libraryImage.width);
    let imgY = map(c.y, libraryY, libraryY + libraryHeight, 0, libraryImage.height);
    if (imgX >= 0 && imgX < libraryImage.width && imgY >= 0 && imgY < libraryImage.height) {
      libraryImage.loadPixels();
      let idx = 4 * (int(imgY) * libraryImage.width + int(imgX));
      if (libraryImage.pixels[idx + 3] > 0) return true;
    }
  }
  return false;
}

function collidesWithCinema(newX, newY) {
  if (!collides(newX, newY, 75, 75, cinemaX, cinemaY, cinemaWidth, cinemaHeight)) return false;
  // Exclude cinema door from collision
  if (collides(newX, newY, 75, 75, cinemaDoor.x, cinemaDoor.y, cinemaDoor.w, cinemaDoor.h)) {
    return false;
  }
  let corners = [
    {x:newX, y:newY},
    {x:newX+75, y:newY},
    {x:newX, y:newY+75},
    {x:newX+75, y:newY+75}
  ];
  for (let c of corners) {
    let imgX = map(c.x, cinemaX, cinemaX+cinemaWidth, 0, cinemaImage.width);
    let imgY = map(c.y, cinemaY, cinemaY+cinemaHeight, 0, cinemaImage.height);
    if (imgX>=0 && imgX<cinemaImage.width && imgY>=0 && imgY<cinemaImage.height) {
      cinemaImage.loadPixels();
      let idx = 4 * (int(imgY)*cinemaImage.width + int(imgX));
      if (cinemaImage.pixels[idx+3] > 0) return true;
    }
  }
  return false;
}

function collidesWithHospital(newX, newY) {
  if (!collides(newX, newY, 75, 75, hospitalX, hospitalY, hospitalWidth, hospitalHeight)) return false;
  // Exclude hospital door from collision
  if (collides(newX, newY, 75, 75, hospitalDoor.x, hospitalDoor.y, hospitalDoor.w, hospitalDoor.h)) {
    return false;
  }
  let corners = [
    {x:newX, y:newY},
    {x:newX+75, y:newY},
    {x:newX, y:newY+75},
    {x:newX+75, y:newY+75}
  ];
  for (let c of corners) {
    let imgX = map(c.x, hospitalX, hospitalX + hospitalWidth, 0, hospitalImage.width);
    let imgY = map(c.y, hospitalY, hospitalY + hospitalHeight, 0, hospitalImage.height);
    if (imgX >= 0 && imgX < hospitalImage.width && imgY >= 0 && imgY < hospitalImage.height) {
      hospitalImage.loadPixels();
      let idx = 4 * (int(imgY) * hospitalImage.width + int(imgX));
      if (hospitalImage.pixels[idx + 3] > 0) return true;
    }
  }
  return false;
}

function collidesWithSchool(newX, newY) {
  if (!collides(newX, newY, 75, 75, schoolX, schoolY, schoolWidth, schoolHeight)) return false;
  // Exclude school door from collision
  if (collides(newX, newY, 75, 75, schoolDoor.x, schoolDoor.y, schoolDoor.w, schoolDoor.h)) {
    return false;
  }
  let corners = [
    {x:newX, y:newY},
    {x:newX+75, y:newY},
    {x:newX, y:newY+75},
    {x:newX+75, y:newY+75}
  ];
  for (let c of corners) {
    let imgX = map(c.x, schoolX, schoolX + schoolWidth, 0, schoolImage.width);
    let imgY = map(c.y, schoolY, schoolY + schoolHeight, 0, schoolImage.height);
    if (imgX >= 0 && imgX < schoolImage.width && imgY >= 0 && imgY < schoolImage.height) {
      schoolImage.loadPixels();
      let idx = 4 * (int(imgY) * schoolImage.width + int(imgX));
      if (schoolImage.pixels[idx + 3] > 0) return true;
    }
  }
  return false;
}

/**
 * Checks if player is within popup range of the Gatekeeper
 */
function isNearGatekeeper() {
  return collides(
    playerX, playerY, 75, 75,
    gatekeeperX - gatekeeperWidth/2 - 50,
    gatekeeperY - gatekeeperHeight/2 - 50,
    gatekeeperWidth + 100,
    gatekeeperHeight + 100
  );
}

/**
 * Draws the Gatekeeper interaction popup
 */
function drawGatekeeperPopup() {
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  fill(255, 255, 200);
  rect(width/2 - 150, height/2 - 100, 300, 150, 10);

  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text('Do you want to escape?', width/2, height/2 - 40);

  fill(100, 255, 100);
  rect(width/2 - 110, height/2 + 10, 100, 40, 5);
  fill(0);
  textSize(16);
  text('Yes', width/2 - 60, height/2 + 30);

  fill(255, 100, 100);
  rect(width/2 + 10, height/2 + 10, 100, 40, 5);
  fill(0);
  text('No', width/2 + 60, height/2 + 30);
}