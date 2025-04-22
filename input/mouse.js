// input/mouse.js

// input/mouse.js

function mousePressed() {
  // 1) If we’re on the title screen and Settings is open…
  if (gameState === 'menu' && showSettings) {
    // 1a) Define the popup’s rectangle (centered 300×300)
    const popupX = width/2 - 150;
    const popupY = height/2 - 150;
    const popupW = 300;
    const popupH = 300;
    // 1b) If the click is outside that rect, close Settings
    if (
      mouseX < popupX ||
      mouseX > popupX + popupW ||
      mouseY < popupY ||
      mouseY > popupY + popupH
    ) {
      showSettings = false;
    }
    // Stop here—don’t fall through to START/SETTINGS buttons
    return false;
  }

  // 2) Normal title‐screen buttons (only when Settings is closed)
  if (gameState === 'menu') {
    // START
    if (mouseX > 105 && mouseX < 255 &&
        mouseY > 400 && mouseY < 450) {
      gameState = 'game';
      return false;
    }
    // SETTINGS (opens Settings when closed)
    if (mouseX > 105 && mouseX < 255 &&
        mouseY > 460 && mouseY < 510) {
      showSettings = true;
      return false;
    }
    // QUIT
    if (mouseX > 105 && mouseX < 255 &&
        mouseY > 520 && mouseY < 570) {
      window.close();
      return false;
    }
  }

  // 3) …then all your other click handlers for shop, inventory, etc.…
}


  // Handle Shop popup clicks
  if (showShopPopup && !showMarketplace) {
    // YES button
    if (mouseX > width / 2 - 110 && mouseX < width / 2 - 10 &&
        mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      showMarketplace = true;
    }
    // NO button
    else if (mouseX > width / 2 + 10 && mouseX < width / 2 + 110 &&
             mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
      showShopPopup = false;
      hasDismissedShopPopup = true;
    }
  }

  // Handle Marketplace clicks
  if (showMarketplace) {
    // Apple purchase
    if (mouseX > width / 2 - 140 && mouseX < width / 2 + 10 &&
        mouseY > height / 2 - 100 && mouseY < height / 2 - 80) {
      if (coinScore >= 5) {
        coinScore -= 5;
        inventory.apple += 1;
      }
    }
    // Sword purchase
    if (mouseX > width / 2 - 140 && mouseX < width / 2 + 10 &&
        mouseY > height / 2 - 60 && mouseY < height / 2 - 40) {
      if (coinScore >= 10) {
        coinScore -= 10;
        inventory.sword += 1;
      }
    }
    // Shield purchase
    if (mouseX > width / 2 - 140 && mouseX < width / 2 + 10 &&
        mouseY > height / 2 - 20 && mouseY < height / 2) {
      if (coinScore >= 15) {
        coinScore -= 15;
        inventory.shield += 1;
      }
    }
    // Close Marketplace
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      showMarketplace = false;
      showShopPopup  = false;
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
    // Apple "Use" button
    if (mouseX > width / 2 + 60 && mouseX < width / 2 + 140 &&
        mouseY > height / 2 - 140 && mouseY < height / 2 - 100) {
      if (inventory.apple > 0) {
        inventory.apple -= 1;
        playerHP = min(playerHP + 10, 100); // Heal 10 HP
      }
    }
    // Sword "Equip/Unequip" button
    if (mouseX > width / 2 + 60 && mouseX < width / 2 + 140 &&
        mouseY > height / 2 - 90 && mouseY < height / 2 - 50) {
      if (inventory.sword > 0) {
        equippedItems.sword = !equippedItems.sword;
      }
    }
    // Shield "Equip/Unequip" button
    if (mouseX > width / 2 + 60 && mouseX < width / 2 + 140 &&
        mouseY > height / 2 - 40 && mouseY < height / 2) {
      if (inventory.shield > 0) {
        equippedItems.shield = !equippedItems.shield;
      }
    }
    // Close Inventory
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 &&
        mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      showInventory = false;
    }
  }


function mouseReleased() {
  // No actions needed
}
