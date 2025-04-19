function drawPlayer() {
  push();
  // Position and mirror based on facing direction
  translate(playerX, playerY);
  const facingLeft = ['west', 'northwest', 'southwest'].includes(currentDirection);
  if (facingLeft) scale(-1, 1);
  imageMode(CENTER);

  // Determine which sprite to draw
  let spriteToDraw;
  if (isMoving &&
      vikingRightFrames[currentFrame] &&
      vikingRightFrames[currentFrame].width > 0 &&
      vikingRightFrames[currentFrame].height > 0) {
    spriteToDraw = vikingRightFrames[currentFrame];
  } else {
    spriteToDraw = vikingStanding;
  }

  // Draw the chosen sprite
  if (spriteToDraw && spriteToDraw.width > 0 && spriteToDraw.height > 0) {
    image(spriteToDraw, 0, 0, 75, 75);
  } else {
    console.log(
      'Viking sprite not loaded for',
      isMoving ? `moving frame ${currentFrame}` : 'standing'
    );
  }

  // Draw shield if equipped
  if (equippedItems.shield && shieldImage && shieldImage.width > 0 && shieldImage.height > 0) {
    // Offset calculated in logic (left/right hand)
    image(shieldImage,
      facingLeft ? 10 : -10,
      15,
      40, 40
    );
  }

  // Draw sword if equipped
  if (equippedItems.sword && swordImage && swordImage.width > 0 && swordImage.height > 0) {
    image(swordImage,
      facingLeft ? 25 : -25,
      15,
      32, 32
    );
  }

  pop();
}