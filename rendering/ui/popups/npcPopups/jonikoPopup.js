function drawJonikoPopup() {
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
  
    fill(139, 129, 120);
    stroke(100, 90, 80);
    strokeWeight(3);
    rect(width / 2 - 150, height / 2 - 50, 300, 100, 10);
    noStroke();
  
    fill(255, 240, 200);
    textSize(20);
    textAlign(CENTER, CENTER);
    text('NU GECHINIA', width / 2, height / 2);
  
    fill(255, 100, 100);
    rect(width / 2 - 50, height / 2 + 40, 100, 40, 5);
    fill(0);
    textSize(16);
    text('Close', width / 2, height / 2 + 60);
  }
  
  // Attach to global scope
  window.drawJonikoPopup = drawJonikoPopup;