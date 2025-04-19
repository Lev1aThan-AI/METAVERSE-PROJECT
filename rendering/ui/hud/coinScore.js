function drawCoinScore() {
    fill(0, 0, 0, 150);
    rect(4, 4, 80, 24, 5);
  
    imageMode(CENTER);
    if (coinImage && coinImage.width > 0 && coinImage.height > 0) {
      image(coinImage, 16, 16, 16, 16);
    } else {
      fill(255, 215, 0);
      ellipse(16, 16, 16);
    }
  
    fill(255);
    textSize(16);
    textAlign(LEFT, CENTER);
    text(`${coinScore}`, 28, 16);
  }
  
  // Attach to global scope
  window.drawCoinScore = drawCoinScore;