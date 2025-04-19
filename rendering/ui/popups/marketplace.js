function drawMarketplace() {
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
  
    fill(255, 255, 200);
    rect(width / 2 - 160, height / 2 - 200, 320, 350, 10);
  
    fill(0);
    textSize(24);
    textAlign(CENTER, TOP);
    text('Marketplace', width / 2, height / 2 - 180);
  
    textSize(16);
    textAlign(LEFT, TOP);
    text(`Coins: ${coinScore}`, width / 2 - 140, height / 2 - 140);
    textSize(18);
    textAlign(LEFT, TOP);
    text(`Apple: 5 coins (Owned: ${inventory.apple})`, width / 2 - 140, height / 2 - 100);
    text(`Sword: 10 coins (Owned: ${inventory.sword})`, width / 2 - 140, height / 2 - 60);
    text(`Shield: 15 coins (Owned: ${inventory.shield})`, width / 2 - 140, height / 2 - 20);
  
    fill(255, 100, 100);
    rect(width / 2 - 50, height / 2 + 120, 100, 40, 5);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text('Close', width / 2, height / 2 + 140);
  }
  
  // Attach to global scope
  window.drawMarketplace = drawMarketplace;