function drawInventory() {
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
  
    fill(255, 255, 200);
    rect(width / 2 - 160, height / 2 - 200, 320, 350, 10);
  
    fill(0);
    textSize(24);
    textAlign(CENTER, TOP);
    text('Inventory', width / 2, height / 2 - 180);
  
    textSize(18);
    textAlign(LEFT, TOP);
  
    if (appleImage && appleImage.width > 0 && appleImage.height > 0) {
      image(appleImage, width / 2 - 140, height / 2 - 140, 32, 32);
    }
    text(`Apple: ${inventory.apple}`, width / 2 - 100, height / 2 - 130);
    fill(100, 200, 100);
    rect(width / 2 + 60, height / 2 - 140, 80, 40, 5);
    fill(0);
    text('Use', width / 2 + 100, height / 2 - 120);  
  
    if (swordImage && swordImage.width > 0 && swordImage.height > 0) {
      image(swordImage, width / 2 - 140, height / 2 - 80, 32, 32);
    }
    text(`Sword: ${inventory.sword}`, width / 2 - 100, height / 2 - 70);
    fill(equippedItems.sword ? 255 : 100,
         equippedItems.sword ? 100 : 255,
         equippedItems.sword ? 100 : 100);
    rect(width / 2 + 60, height / 2 - 90, 80, 40, 5);
    fill(0);
    text(equippedItems.sword ? 'Unequip' : 'Equip', width / 2 + 100, height / 2 - 70);
  
    if (shieldImage && shieldImage.width > 0 && shieldImage.height > 0) {
      image(shieldImage, width / 2 - 140, height / 2 - 20, 32, 32);
    }
    text(`Shield: ${inventory.shield}`, width / 2 - 100, height / 2 - 10);
    fill(equippedItems.shield ? 255 : 100,
         equippedItems.shield ? 100 : 255,
         equippedItems.shield ? 100 : 100);
    rect(width / 2 + 60, height / 2 - 40, 80, 40, 5);
    fill(0);
    text(equippedItems.shield ? 'Unequip' : 'Equip', width / 2 + 100, height / 2 - 20);
  
    fill(255, 100, 100);
    rect(width / 2 - 50, height / 2 + 120, 100, 40, 5);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text('Close', width / 2, height / 2 + 140);
  }
  
  // Attach to global scope
  window.drawInventory = drawInventory;