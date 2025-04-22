// rendering/ui/hud/hpBar.js

function drawHPBar() {
  // 1) panel size from asset
  const panelWidth  = hpbarImage.width;
  const panelHeight = hpbarImage.height;

  // 2) top‑right position (8px margin)
  const panelX = width  - panelWidth  - 8;
  const panelY = 8;

  // 3) draw the wooden HP panel
  imageMode(CORNER);
  image(hpbarImage, panelX, panelY);

  // 4) percentage text under "HP:"
  textFont('IM Fell English', 'Arial');
  textSize(12);
  textAlign(CENTER, CENTER);
  fill(255, 240, 200);
  const labelX = panelX + panelWidth * 0.2;
  const labelY = panelY + panelHeight * 0.75;
  text(`${playerHP}%`, labelX, labelY);

  // 5) full bar region (right 60% of panel)
  const fullW = panelWidth * 0.6;
  const barX  = panelX + panelWidth * 0.4;
  const barY  = panelY + panelHeight   * 0.25;
  const barH  = panelHeight * 0.5;

  // 6) increase padding from 4px to 10px for greater left shift
  const padding = 10;
  const innerMaxW = fullW - padding;

  // 7) draw green fill
  noStroke();
  fill(0, 200, 0);
  const fillW = innerMaxW * (playerHP / 100);
  rect(barX, barY, fillW, barH, 4);

  // 8) draw red (only for missing HP)
  if (playerHP < 100) {
    fill(150, 0, 0);
    rect(barX + fillW, barY, innerMaxW - fillW, barH, 4);
  }
}
