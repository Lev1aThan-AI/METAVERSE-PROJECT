// rendering/ui/hud/time.js

function drawLocalTime() {
    // 24-hour HH:MM:SS in Tbilisi (UTC+4)
    const now = new Date().toLocaleTimeString('en-GB', {
      hour12: false,
      timeZone: 'Asia/Tbilisi',
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  
    // styling: small white font, centered at top
    fill(255);            // white
    textSize(16);         // small
    textAlign(CENTER, TOP);
    text(now, width / 2 - 20, 8); 
  }
  
  // expose globally
  window.drawLocalTime = drawLocalTime;
  