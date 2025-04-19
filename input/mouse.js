// input/mouse.js

function mousePressed() {
  if (gameState === 'menu') {
    // Button hitboxes for Starting.png (scaled from 720x1280 to 360x640)
    // Approximate x: 105 to 255 (scaled from 210 to 510)
    // Start: y ~400 to 450 (scaled from 800 to 900)
    if (mouseX > 105 && mouseX < 255 &&
        mouseY > 400 && mouseY < 450) {
      gameState = 'game';
    }
    // Settings: y ~460 to 510 (scaled from 920 to 1020)
    else if (mouseX > 105 && mouseX < 255 &&
             mouseY > 460 && mouseY < 510) {
      alert('Settings not implemented yet!');
    }
    // Quit: y ~520 to 570 (scaled from 1040 to 1140)
    else if (mouseX > 105 && mouseX < 255 &&
             mouseY > 520 && mouseY < 570) {
      window.close();
    }
  }

  // Handle Shop popup clicks
  if (showShopPopup && !showMarketplace) {
    // YES button (width/2 - 110, height/2 + 10, 100, 40)
    if (mouseX > width / 2 - 110 && mouseX < width / 2 - 10 &&
        mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      showMarketplace = true;
    }
    // NO button (width/2 + 10, height/2 + 10, 100, 40)
    else if (mouseX > width / 2 + 10 && mouseX < width / 2 + 110 &&
             mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      showShopPopup = false;
      hasDismissedShopPopup = true;
    }
  }

  // Handle Marketplace clicks
  if (showMarketplace) {
    // Apple purchase (width/2 - 140, height/2 - 100, text width ~150, height ~20)
    if (mouseX > width / 2 - 140 && mouseX < width / 2 + 10 &&
        mouseY > height / 2 - 100 && mouseY < height / 2 - 80) {
      if (coinScore >= 5) {
        coinScore -= 5;
        inventory.apple += 1;
      }
    }
    // Sword purchase (width/2 - 140, height/2 - 60, text width ~150, height ~20)
    if (mouseX > width / 2 - 140 && mouseX < width / 2 + 10 &&
        mouseY > height / 2 - 60 && mouseY < height / 2 - 40) {
      if (coinScore >= 10) {
        coinScore -= 10;
        inventory.sword += 1;
      }
    }
    // Shield purchase (width/2 - 140, height/2 - 20, text width ~150, height ~20)
    if (mouseX > width / 2 - 140 && mouseX < width / 2 + 10 &&
        mouseY > height / 2 - 20 && mouseY < height / 2) {
      if (coinScore >= 15) {
        coinScore -= 15;
        inventory.shield += 1;
      }
    }
    // Close button (width/2 - 50, height/2 + 120, 100, 40)
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      showMarketplace = false;
      showShopPopup = false;
      hasDismissedShopPopup = true;
    }
  }

  // Handle Gatekeeper popup clicks
  if (showGatekeeperPopup) {
    if (mouseX > width / 2 - 110 && mouseX < width / 2 - 10 &&
        mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      hasGatekeeperAccess = true;
      showGatekeeperPopup = false;
      hasDismissedGatekeeperPopup = true;

      isTransitioning = true;
      gameState = 'castleInterior';
      playerX = 600;
      playerY = 1000;
      cameraX = playerX - width  / (2 * zoom);
      cameraY = playerY - height / (2 * zoom);
      setTimeout(() => { isTransitioning = false; }, 500);
    } else {
      showGatekeeperPopup = false;
      hasDismissedGatekeeperPopup = true;
    }
  }

  // Handle Computer popup clicks
  if (showComputerPopup) {
    if (mouseX > width / 2 - 110 && mouseX < width / 2 - 10 &&
        mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      window.open('https://discord.gg/5W7CbDwp', '_blank');
      showComputerPopup = false;
      hasDismissedComputerPopup = true;
    } else {
      showComputerPopup = false;
      hasDismissedComputerPopup = true;
    }
  }

  // Handle Joniko popup clicks
  if (showJonikoPopup) {
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > height / 2 + 40 && mouseY < height / 2 + 80) {
      showJonikoPopup = false;
      hasDismissedJonikoPopup = true;
    }
  }

  // Handle Ermalo popup clicks
  if (showErmaloPopup) {
    // YES button
    if (mouseX > width / 2 - 110 && mouseX < width / 2 - 10 &&
        mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      window.open('https://www.youtube.com/watch?v=hJ1B8N2eAF8&t=2s', '_blank');
      showErmaloPopup = false;
      hasDismissedErmaloPopup = true;
    }
    // NO button
    else if (mouseX > width / 2 + 10 && mouseX < width / 2 + 110 &&
             mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      showErmaloPopup = false;
      hasDismissedErmaloPopup = true;
    }
  }

  // Handle Maxo popup clicks
  if (showMaxoPopup) {
    // YES button
    if (mouseX > width / 2 - 110 && mouseX < width / 2 - 10 &&
        mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      window.open('https://www.youtube.com/watch?v=ymtawiy25BA&t=2089s', '_blank');
      showMaxoPopup = false;
      hasDismissedMaxoPopup = true;
    }
    // NO button
    else if (mouseX > width / 2 + 10 && mouseX < width / 2 + 110 &&
             mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      showMaxoPopup = false;
      hasDismissedMaxoPopup = true;
    }
  }

  // Handle Giomari popup clicks
  if (showGiomariPopup) {
    // YES button
    if (mouseX > width / 2 - 110 && mouseX < width / 2 - 10 &&
        mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      window.open('https://www.youtube.com/watch?v=HjaWcv8tueA&t=7s', '_blank');
      showGiomariPopup = false;
      hasDismissedGiomariPopup = true;
    }
    // NO button
    else if (mouseX > width / 2 + 10 && mouseX < width / 2 + 110 &&
             mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      showGiomariPopup = false;
      hasDismissedGiomariPopup = true;
    }
  }

  // Handle Inventory clicks
  if (showInventory) {
    // Apple "Use" button (width/2 + 60, height/2 - 140, 80, 40)
    if (mouseX > width / 2 + 60 && mouseX < width / 2 + 140 &&
        mouseY > height / 2 - 140 && mouseY < height / 2 - 100) {
      if (inventory.apple > 0) {
        inventory.apple -= 1;
        playerHP = min(playerHP + 10, 100); // Example: Heal 10 HP, max 100
      }
    }
    // Sword "Equip/Unequip" button (width/2 + 60, height/2 - 90, 80, 40)
    if (mouseX > width / 2 + 60 && mouseX < width / 2 + 140 &&
        mouseY > height / 2 - 90 && mouseY < height / 2 - 50) {
      if (inventory.sword > 0) {
        equippedItems.sword = !equippedItems.sword;
      }
    }
    // Shield "Equip/Unequip" button (width/2 + 60, height/2 - 40, 80, 40)
    if (mouseX > width / 2 + 60 && mouseX < width / 2 + 140 &&
        mouseY > height / 2 - 40 && mouseY < height / 2) {
      if (inventory.shield > 0) {
        equippedItems.shield = !equippedItems.shield;
      }
    }
    // Close button (width/2 - 50, height/2 + 120, 100, 40)
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      showInventory = false;
    }
  }
}

function mouseReleased() {
  // No actions needed
}