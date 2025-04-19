function drawHPBar() {
    let barWidth = 80;
    let barHeight = 16;
    let x = width - barWidth - 8;
    let y = 8;
  
    stroke(200, 150, 50);
    strokeWeight(1);
    fill(139, 69, 19);
    rect(x, y, barWidth, barHeight, 5);
  
    noStroke();
    fill(200, 0, 0);
    let hpWidth = (playerHP / 100) * barWidth;
    rect(x, y, hpWidth, barHeight, 5);
  
    textFont('IM Fell English', 'Arial');
    textSize(14);
    textAlign(RIGHT, TOP);
    fill(0, 0, 0, 150);
    text(`HP: ${playerHP}%`, width - 7, 9);
    fill(255, 240, 200);
    text(`HP: ${playerHP}%`, width - 8, 8);
  }
  
  // Attach to global scope
  window.drawHPBar = drawHPBar;