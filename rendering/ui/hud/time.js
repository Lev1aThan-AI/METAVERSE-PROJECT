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
  
  // Returns a number in [0,1): 0 at 00:00:00, 0.5 at 12:00:00, etc.
function getDayProgress() {
    const now = new Date();                             // local machine time
    const secondsSinceMidnight =
      now.getHours() * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds();
    return secondsSinceMidnight / 86400;               // 86400 = 24*3600
  }
  
  // Expose globally
  window.getDayProgress = getDayProgress;

  // rendering/ui/hud/time.js

// ... your existing drawLocalTime() and getDayProgress()

/**
 * Draws a fullscreen tint overlay based on time of day.
 * @visibility If getDayProgress() is 0 (midnight) or 1, it's darkest; at 0.5 (noon) it's clear.
 */
/**
 * Draws a smooth HSL‐tinted day/night cycle plus a subtle radial vignette.
 */
function drawDayOverlay() {
    const dayFrac = getDayProgress();
    const cosv    = (Math.cos(dayFrac * TWO_PI) + 1) / 2;
  
    // Map cosv → lightness: 60% (day) → 20% (night)
    let L = map(cosv, 0, 1, 60, 20);
  
    // 1) Full-screen HSL tint (clearer, less foggy)
    colorMode(HSL, 360, 100, 100, 1);
    noStroke();
    fill(220, 30, L, 0.1);    // alpha 0.4 instead of 0.6
    rect(0, 0, width, height);
  
    // 2) Softer edge vignette
    let vg = drawingContext.createRadialGradient(
      width/2, height/2, width*0.1,
      width/2, height/2, width*0.8
    );
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.2)'); // outer alpha 0.2 instead of 0.4
    drawingContext.fillStyle = vg;
    drawingContext.fillRect(0, 0, width, height);
  
    // back to RGB
    colorMode(RGB, 255, 255, 255, 1);
  }
  window.drawDayOverlay = drawDayOverlay;
  
function drawSunriseOverlay() {
    const frac = getDayProgress();        // 0 … 1 over the day
    const start = 6/24;                   // 06:00 → 0.25
    const end   = 8/24;                   // 08:00 → 0.333...
    if (frac >= start && frac <= end) {
      // alpha fades from 150 → 0 as we go from 06:00 to 08:00
      let alpha = map(frac, start, end, 150, 0);
      noStroke();
      fill(255, 153, 51, alpha);          // warm orange
      rect(0, 0, width, height);
    }
  }
  window.drawSunriseOverlay = drawSunriseOverlay;
  