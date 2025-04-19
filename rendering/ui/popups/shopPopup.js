function drawShopPopup() {
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
  
    fill(255, 255, 200);
    rect(width / 2 - 150, height / 2 - 100, 300, 150, 10);
  
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text('Ready for Shopping?', width / 2, height / 2 - 40);
  
    fill(100, 255, 100);
    rect(width / 2 - 110, height / 2 + 10, 100, 40, 5);
    fill(0);
    textSize(16);
    text('Yes', width / 2 - 60, height / 2 + 30);
  
    fill(255, 100, 100);
    rect(width / 2 + 10, height / 2 + 10, 100, 40, 5);
    fill(0);
    text('No', width / 2 + 60, height / 2 + 30);
  }
  
  // Attach to global scope
  window.drawShopPopup = drawShopPopup;