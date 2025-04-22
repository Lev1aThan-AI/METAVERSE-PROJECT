// input/mouse.js

function mousePressed() {
  // 1) If we’re on the title screen and Settings is open…
  if (gameState === 'menu' && showSettings) {
    // Define the popup’s rectangle (centered 300×300)
    const popupX = width/2 - 150;
    const popupY = height/2 - 150;
    const popupW = 300;
    const popupH = 300;

    // compute scale factors (original settings.png is 400×300)
    const scaleX = popupW / 400;
    const scaleY = popupH / 300;

    // ON button region (original at 255,45 size 60×35)
    const onX = popupX + 255 * scaleX;
    const onY = popupY +  45 * scaleY;
    const onW =  60 * scaleX;
    const onH =  35 * scaleY;
    if (
      mouseX >= onX && mouseX <= onX + onW &&
      mouseY >= onY && mouseY <= onY + onH
    ) {
      // turn music ON
      toggleGameMusic(true);
      musicMuted = false;
      return false;
    }

    // OFF button region (original at 320,45 size 60×35)
    const offX = popupX + 320 * scaleX;
    const offY = popupY +  45 * scaleY;
    const offW =  60 * scaleX;
    const offH =  35 * scaleY;
    if (
      mouseX >= offX && mouseX <= offX + offW &&
      mouseY >= offY && mouseY <= offY + offH
    ) {
      // turn music OFF
      toggleGameMusic(false);
      musicMuted = true;
      return false;
    }

    // MINUS button region (original at 60,230 size 30×30)
    const minusX = popupX + 60 * scaleX;
    const minusY = popupY + 220 * scaleY; // moved up 10px
    const minusW = 30 * scaleX;
    const minusH = 30 * scaleY;
    if (
      mouseX >= minusX && mouseX <= minusX + minusW &&
      mouseY >= minusY && mouseY <= minusY + minusH
    ) {
      // decrease volume by 10% if music is on
      if (!musicMuted) {
        volumeLevel = constrain(volumeLevel - 0.1, 0, 1);
        // adjust current music track volume
        if (gameMusic && gameMusic.length) {
          gameMusic[currentMusicIndex].setVolume(volumeLevel);
        }
      }
      return false;
    }

    // PLUS button region (original at 305,230 size 30×30)
    const plusX = popupX + 305 * scaleX;
    const plusY = popupY + 220 * scaleY; // moved up 10px
    const plusW = 30 * scaleX;
    const plusH = 30 * scaleY;
    if (
      mouseX >= plusX && mouseX <= plusX + plusW &&
      mouseY >= plusY && mouseY <= plusY + plusH
    ) {
      // increase volume by 10% if music is on
      if (!musicMuted) {
        volumeLevel = constrain(volumeLevel + 0.1, 0, 1);
        if (gameMusic && gameMusic.length) {
          gameMusic[currentMusicIndex].setVolume(volumeLevel);
        }
      }
      return false;
    }

    // Click outside the popup closes Settings
    if (
      mouseX < popupX ||
      mouseX > popupX + popupW ||
      mouseY < popupY ||
      mouseY > popupY + popupH
    ) {
      showSettings = false;
    }
    return false;
  }

  // 2) Normal title‑screen buttons (only when Settings is closed)
  if (gameState === 'menu') {
    // START button
    if (mouseX > 105 && mouseX < 255 &&
        mouseY > 400 && mouseY < 450) {
      gameState = 'game';
      return false;
    }
    // SETTINGS button (opens Settings)
    if (mouseX > 105 && mouseX < 255 &&
        mouseY > 460 && mouseY < 510) {
      showSettings = true;
      return false;
    }
    // QUIT button
    if (mouseX > 105 && mouseX < 255 &&
        mouseY > 520 && mouseY < 570) {
      window.close();
      return false;
    }
  }

  // 3) Handle Shop popup clicks
  if (showShopPopup && !showMarketplace) {
    // YES button
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 &&
        mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showMarketplace = true;
    }
    // NO button
    else if (mouseX > width/2 + 10 && mouseX < width/2 + 110 &&
             mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showShopPopup = false;
      hasDismissedShopPopup = true;
    }
    return false;
  }

  // 4) Handle Marketplace clicks
  if (showMarketplace) {
    // Apple purchase
    if (mouseX > width/2 - 140 && mouseX < width/2 + 10 &&
        mouseY > height/2 - 100 && mouseY < height/2 - 80) {
      if (coinScore >= 5) { coinScore -= 5; inventory.apple += 1; }
    }
    // Sword purchase
    if (mouseX > width/2 - 140 && mouseX < width/2 + 10 &&
        mouseY > height/2 - 60  && mouseY < height/2 - 40) {
      if (coinScore >= 10) { coinScore -= 10; inventory.sword += 1; }
    }
    // Shield purchase
    if (mouseX > width/2 - 140 && mouseX < width/2 + 10 &&
        mouseY > height/2 - 20  && mouseY < height/2) {
      if (coinScore >= 15) { coinScore -= 15; inventory.shield += 1; }
    }
    // Close Marketplace
    if (mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
        mouseY > height/2 + 120 && mouseY < height/2 + 160) {
      showMarketplace = false;
      showShopPopup  = false;
      hasDismissedShopPopup = true;
    }
    return false;
  }

  // 5) Handle Gatekeeper popup clicks
  if (showGatekeeperPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 &&
        mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      hasGatekeeperAccess = true;
      showGatekeeperPopup = false;
      hasDismissedGatekeeperPopup = true;

      isTransitioning = true;
      gameState = 'castleInterior';
      playerX = 600;
      playerY = 1000;
      cameraX = playerX - width/(2*zoom);
      cameraY = playerY - height/(2*zoom);
      setTimeout(() => { isTransitioning = false; }, 500);
    } else {
      showGatekeeperPopup = false;
      hasDismissedGatekeeperPopup = true;
    }
    return false;
  }

  // 6) Handle Computer popup clicks
  if (showComputerPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 &&
        mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      window.open('https://discord.gg/5W7CbDwp', '_blank');
      showComputerPopup = false;
      hasDismissedComputerPopup = true;
    } else {
      showComputerPopup = false;
      hasDismissedComputerPopup = true;
    }
    return false;
  }

  // 7) Handle Joniko popup clicks
  if (showJonikoPopup) {
    if (mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
        mouseY > height/2 + 40 && mouseY < height/2 + 80) {
      showJonikoPopup = false;
      hasDismissedJonikoPopup = true;
    }
    return false;
  }

  // 8) Handle Ermalo popup clicks
  if (showErmaloPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 &&
        mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      window.open('https://www.youtube.com/watch?v=hJ1B8N2eAF8&t=2s', '_blank');
      showErmaloPopup = false;
      hasDismissedErmaloPopup = true;
    } else if (mouseX > width/2 + 10 && mouseX < width/2 + 110 &&
               mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showErmaloPopup = false;
      hasDismissedErmaloPopup = true;
    }
    return false;
  }

  // 9) Handle Maxo popup clicks
  if (showMaxoPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 &&
        mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      window.open('https://www.youtube.com/watch?v=ymtawiy25BA&t=2089s', '_blank');
      showMaxoPopup = false;
      hasDismissedMaxoPopup = true;
    } else if (mouseX > width/2 + 10 && mouseX < width/2 + 110 &&
               mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showMaxoPopup = false;
      hasDismissedMaxoPopup = true;
    }
    return false;
  }

  // 10) Handle Giomari popup clicks
  if (showGiomariPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 &&
        mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      window.open('https://www.youtube.com/watch?v=HjaWcv8tueA&t=7s', '_blank');
      showGiomariPopup = false;
      hasDismissedGiomariPopup = true;
    } else if (mouseX > width/2 + 10 && mouseX < width/2 + 110 &&
               mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showGiomariPopup = false;
      hasDismissedGiomariPopup = true;
    }
    return false;
  }

  // 11) Handle Inventory clicks
  if (showInventory) {
    // Apple “Use” button
    if (mouseX > width/2 + 60 && mouseX < width/2 + 140 &&
        mouseY > height/2 - 140 && mouseY < height/2 - 100) {
      if (inventory.apple > 0) { inventory.apple -= 1; playerHP = min(playerHP + 10, 100); }
    }
    // Sword “Equip/Unequip” button
    else if (mouseX > width/2 + 60 && mouseX < width/2 + 140 &&
             mouseY > height/2 - 90 && mouseY < height/2 - 50) {
      if (inventory.sword > 0) equippedItems.sword = !equippedItems.sword;
    }
    // Shield “Equip/Unequip” button
    else if (mouseX > width/2 + 60 && mouseX < width/2 + 140 &&
             mouseY > height/2 - 40 && mouseY < height/2) {
      if (inventory.shield > 0) equippedItems.shield = !equippedItems.shield;
    }
    // Close Inventory
    if (mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
        mouseY > height/2 + 120 && mouseY < height/2 + 160) {
      showInventory = false;
    }
    return false;
  }
}

function mouseReleased() {
  // No actions needed
}
