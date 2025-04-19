function drawLevelAndXP() {
    let barWidth = 80;
    let barHeight = 16;
    let x = width - barWidth - 8;
    let y = 28;
  
    stroke(200, 150, 50);
    strokeWeight(1);
    fill(139, 69, 19);
    rect(x, y, barWidth, barHeight, 5);
  
    noStroke();
    fill(0, 150, 150);
    let xpRequired = playerLevel < 100 ? xpToNextLevel[playerLevel] : xpToNextLevel[99];
    let xpWidth = (playerXP / xpRequired) * barWidth;
    rect(x, y, xpWidth, barHeight, 5);
  
    textFont('IM Fell English', 'Arial');
    textSize(14);
    textAlign(RIGHT, TOP);
    fill(0, 0, 0, 150);
    text(`Level: ${playerLevel} | XP: ${playerXP}/${xpRequired}`, width - 7, y + barHeight + 5);
    fill(255, 240, 200);
    text(`Level: ${playerLevel} | XP: ${playerXP}/${xpRequired}`, width - 8, y + barHeight + 4);
  }
  
  // Attach to global scope
  window.drawLevelAndXP = drawLevelAndXP;