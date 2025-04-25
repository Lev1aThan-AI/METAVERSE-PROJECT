// input/mouse.js

function mousePressed() {
  // 1) If Settings panel is open (in menu or in-game), handle settings interactions
  if (showSettings) {
    // Define popup rectangle (centered 300×300)
    const popupX = width/2 - 150;
    const popupY = height/2 - 150;
    const popupW = 300;
    const popupH = 300;
    // Scale factors for original 400×300 settings image
    const scaleX = popupW / 400;
    const scaleY = popupH / 300;

    // ON button region
    const onX = popupX + 255 * scaleX;
    const onY = popupY +  45 * scaleY;
    const onW =  60 * scaleX;
    const onH =  35 * scaleY;
    if (mouseX >= onX && mouseX <= onX + onW && mouseY >= onY && mouseY <= onY + onH) {
      toggleGameMusic(true);
      musicMuted = false;
      return false;
    }

    // OFF button region
    const offX = popupX + 320 * scaleX;
    const offY = popupY +  45 * scaleY;
    const offW =  60 * scaleX;
    const offH =  35 * scaleY;
    if (mouseX >= offX && mouseX <= offX + offW && mouseY >= offY && mouseY <= offY + offH) {
      toggleGameMusic(false);
      musicMuted = true;
      return false;
    }

    // MINUS (volume down) region
    const minusX = popupX +  60 * scaleX;
    const minusY = popupY + 230 * scaleY;
    const minusW =  30 * scaleX;
    const minusH =  30 * scaleY;
    if (mouseX >= minusX && mouseX <= minusX + minusW && mouseY >= minusY && mouseY <= minusY + minusH) {
      if (!musicMuted) {
        volumeLevel = constrain(volumeLevel - 0.1, 0, 1);
        if (gameMusic && gameMusic.length) gameMusic[currentMusicIndex].setVolume(volumeLevel);
      }
      return false;
    }

    // PLUS (volume up) region
    const plusX = popupX + 305 * scaleX;
    const plusY = popupY + 230 * scaleY;
    const plusW =  30 * scaleX;
    const plusH =  30 * scaleY;
    if (mouseX >= plusX && mouseX <= plusX + plusW && mouseY >= plusY && mouseY <= plusY + plusH) {
      if (!musicMuted) {
        volumeLevel = constrain(volumeLevel + 0.1, 0, 1);
        if (gameMusic && gameMusic.length) gameMusic[currentMusicIndex].setVolume(volumeLevel);
      }
      return false;
    }

    // Click outside settings closes panel
    if (mouseX < popupX || mouseX > popupX + popupW || mouseY < popupY || mouseY > popupY + popupH) {
      showSettings = false;
    }
    return false;
  }

  // 2) In‑game sound button to open Settings
  if (gameState === 'game') {
    // Coin balance panel dims
    const baseW = coinBalanceImage.width / 2;
    const baseH = coinBalanceImage.height / 2;
    const panelW = baseW * 0.7; // scaled 70%
    const panelH = baseH * 0.7;
    const btnX = 8;
    const btnY = 8 + panelH + 8;
    if (mouseX >= btnX && mouseX <= btnX + panelW && mouseY >= btnY && mouseY <= btnY + panelH) {
      showSettings = true;
      return false;
    }
  }

  
  

  // 3) Title‑screen buttons (only when Settings closed)
  if (gameState === 'menu' && !showSettings) {
    if (mouseX > 105 && mouseX < 255 && mouseY > 400 && mouseY < 450) {
      gameState = 'game';
      return false;
    }
    if (mouseX > 105 && mouseX < 255 && mouseY > 460 && mouseY < 510) {
      showSettings = true;
      return false;
    }
    if (mouseX > 105 && mouseX < 255 && mouseY > 520 && mouseY < 570) {
      window.close();
      return false;
    }
  }


  

  // 4) Shop popup
  if (showShopPopup && !showMarketplace) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showMarketplace = true;
    } else if (mouseX > width/2 + 10 && mouseX < width/2 + 110 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showShopPopup = false;
      hasDismissedShopPopup = true;
    }
    return false;
  }

  // 5) Marketplace
  if (showMarketplace) {
    if (mouseX > width/2 - 140 && mouseX < width/2 + 10 && mouseY > height/2 - 100 && mouseY < height/2 - 80) {
      if (coinScore >= 5) { coinScore -= 5; inventory.apple++; }
    }
    if (mouseX > width/2 - 140 && mouseX < width/2 + 10 && mouseY > height/2 - 60 && mouseY < height/2 - 40) {
      if (coinScore >= 10) { coinScore -= 10; inventory.sword++; }
    }
    if (mouseX > width/2 - 140 && mouseX < width/2 + 10 && mouseY > height/2 - 20 && mouseY < height/2) {
      if (coinScore >= 15) { coinScore -= 15; inventory.shield++; }
    }
    if (mouseX > width/2 - 50 && mouseX < width/2 + 50 && mouseY > height/2 + 120 && mouseY < height/2 + 160) {
      showMarketplace = false;
      showShopPopup  = false;
      hasDismissedShopPopup = true;
    }
    return false;
  }

  // 6) Gatekeeper popup
  if (showGatekeeperPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      hasGatekeeperAccess = true;
      showGatekeeperPopup = false;
      hasDismissedGatekeeperPopup = true;
      isTransitioning = true;
      gameState = 'castleInterior';
      playerX = 600; playerY = 1000;
      cameraX = playerX - width/(2*zoom);
      cameraY = playerY - height/(2*zoom);
      setTimeout(() => { isTransitioning = false; }, 500);
    } else {
      showGatekeeperPopup = false;
      hasDismissedGatekeeperPopup = true;
    }
    return false;
  }

  // 7) Computer popup
  if (showComputerPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      window.open('https://discord.gg/5W7CbDwp','_blank');
      showComputerPopup = false;
      hasDismissedComputerPopup = true;
    } else {
      showComputerPopup = false;
      hasDismissedComputerPopup = true;
    }
    return false;
  }

  // 8) Joniko popup
  if (showJonikoPopup) {
    if (mouseX > width/2 - 50 && mouseX < width/2 + 50 && mouseY > height/2 + 40 && mouseY < height/2 + 80) {
      showJonikoPopup = false;
      hasDismissedJonikoPopup = true;
    }
    return false;
  }

  // 9) Ermalo popup
  if (showErmaloPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      window.open('https://www.youtube.com/watch?v=hJ1B8N2eAF8&t=2s','_blank');
      showErmaloPopup = false;
      hasDismissedErmaloPopup = true;
    } else if (mouseX > width/2 + 10 && mouseX < width/2 + 110 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showErmaloPopup = false;
      hasDismissedErmaloPopup = true;
    }
    return false;
  }

  // 10) Maxo popup
  if (showMaxoPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      window.open('https://www.youtube.com/watch?v=ymtawiy25BA&t=2089s','_blank');
      showMaxoPopup = false;
      hasDismissedMaxoPopup = true;
    } else if (mouseX > width/2 + 10 && mouseX < width/2 + 110 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showMaxoPopup = false;
      hasDismissedMaxoPopup = true;
    }
    return false;
  }

  // 11) Giomari popup
  if (showGiomariPopup) {
    if (mouseX > width/2 - 110 && mouseX < width/2 - 10 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      window.open('https://www.youtube.com/watch?v=HjaWcv8tueA&t=7s','_blank');
      showGiomariPopup = false;
      hasDismissedGiomariPopup = true;
    } else if (mouseX > width/2 + 10 && mouseX < width/2 + 110 && mouseY > height/2 + 10 && mouseY < height/2 + 50) {
      showGiomariPopup = false;
      hasDismissedGiomariPopup = true;
    }
    return false;
  }

  // 12) Inventory clicks
  if (showInventory) {
    if (mouseX > width/2 + 60 && mouseX < width/2 + 140 && mouseY > height/2 - 140 && mouseY < height/2 - 100) {
      if (inventory.apple > 0) { inventory.apple--; playerHP = min(playerHP + 10, 100); }
    } else if (mouseX > width/2 + 60 && mouseX < width/2 + 140 && mouseY > height/2 - 90 && mouseY < height/2 - 50) {
      if (inventory.sword > 0) equippedItems.sword = !equippedItems.sword;
    } else if (mouseX > width/2 + 60 && mouseX < width/2 + 140 && mouseY > height/2 - 40 && mouseY < height/2) {
      if (inventory.shield > 0) equippedItems.shield = !equippedItems.shield;
    } else if (mouseX > width/2 - 50 && mouseX < width/2 + 50 && mouseY > height/2 + 120 && mouseY < height/2 + 160) {
      showInventory = false;
    }
    return false;
  }// 13) Game over "Restart" button
if (gameState === 'gameOver') {
  // Check if the click is within the "Restart" button bounds (x: 150 to 350, y: 330 to 385)
  if (mouseX >= 150 && mouseX <= 350 && mouseY >= 330 && mouseY <= 385) {
    // Reset the game state to 'game'
    gameState = 'game';
    // Reset player position to spawn point near the castle
    playerX = 2000;
    playerY = 850;
    // Reset player health
    playerHP = 100;
    // Reset camera position to center on the player
    cameraX = playerX - width / (2 * zoom);
    cameraY = playerY - height / (2 * zoom);
    // Reset water damage timer
    lastWaterDamageTime = 0;
    return false;
  }
}

}

function mouseReleased() {
  // No actions needed
}
