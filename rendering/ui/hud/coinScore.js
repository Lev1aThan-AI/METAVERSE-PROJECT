// rendering/ui/hud/coinScore.js

function drawCoinScore() {
  // 1) original panel natural size, previously halved
  const origW = coinBalanceImage.width;
  const origH = coinBalanceImage.height;
  const baseW = origW / 2;
  const baseH = origH / 2;

  // 2) reduce that size by a further 30% (i.e. keep 70% of half)
  const scaleFactor = 0.7;
  const panelWidth  = baseW * scaleFactor;
  const panelHeight = baseH * scaleFactor;

  // 3) position at top‑left (8px margin)
  const panelX = 8;
  const panelY = 8;

  // 4) draw the scaled panel graphic
  imageMode(CORNER);
  image(coinBalanceImage, panelX, panelY, panelWidth, panelHeight);

  // 5) draw the coin count to the right of the baked‑in coin
  textFont('IM Fell English', 'Arial');
  textSize(14); // slightly larger for readability
  textAlign(LEFT, CENTER);
  fill(255, 240, 200);
  // assume coin icon height equals panelHeight
  const iconWidth = panelHeight;
  const textX = panelX + iconWidth + 8;
  const textY = panelY + panelHeight / 2;
  text(`${coinScore}`, textX, textY);
}

// Attach to global scope
window.drawCoinScore = drawCoinScore;
