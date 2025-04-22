// rendering/ui/hud/levelAndXP.js

function drawLevelAndXP() {
  // Base HP panel width (half size of hpbarImage)
  const hpPanelWidth = hpbarImage.width * 0.5;
  // XP panel width at 90% of HP panel width
  const panelWidth  = hpPanelWidth * 0.9;
  const scaleFactor = panelWidth / xpBalanceImage.width;
  const panelHeight = xpBalanceImage.height * scaleFactor;

  // Position XP panel: right-aligned below HP panel
  const x = width - panelWidth - 8;
  const y = 8 + (hpbarImage.height * 0.5) + 26;

  // Draw the XP/Level panel
  imageMode(CORNER);
  image(xpBalanceImage, x, y, panelWidth, panelHeight);

  // Draw level and XP text: 10% larger and centered
  const xpRequired = playerLevel < 100 ? xpToNextLevel[playerLevel] : xpToNextLevel[99];
  textFont('IM Fell English', 'Arial');
  textSize(panelHeight * 0.308); // 10% increase over 0.28
  textAlign(CENTER, CENTER);
  fill(255, 240, 200);
  const textX = x + panelWidth / 2;
  const textY = y + panelHeight / 2;
  text(`Level: ${playerLevel} | XP: ${playerXP}/${xpRequired}`, textX, textY);
}

// Attach to global scope
window.drawLevelAndXP = drawLevelAndXP;
