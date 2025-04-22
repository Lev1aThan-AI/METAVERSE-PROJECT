// rendering/ui/hud/soundButton.js

/**
 * Draws the in‑game sound toggle button below the coin score panel.
 * When clicked, this opens the settings panel (handled in mouse.js).
 */
function drawSoundButton() {
    // Match coinScore panel sizing
    const baseW = coinBalanceImage.width / 2;
    const baseH = coinBalanceImage.height / 2;
    const scaleFactor = 0.7;
    const panelW = baseW * scaleFactor;
    const panelH = baseH * scaleFactor;
    const pad = 8;
  
    // Position: same left margin, below coin panel
    const btnX = pad;
    const btnY = pad + panelH + pad;
  
    imageMode(CORNER);
    if (soundButtonImage) {
      image(soundButtonImage, btnX, btnY, panelW, panelH);
    }
  }
  
  // Expose globally
  window.drawSoundButton = drawSoundButton;
  