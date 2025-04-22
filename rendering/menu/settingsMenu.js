// settingsMenu.js

// settingsMenu.js
function drawSettingsWindow() {
  const popupX = width/2 - 150;
  const popupY = height/2 - 150;
  const popupW = 300;
  const popupH = 300;

  // ONLY draw the background graphic — nothing else
  image(settingsImage, popupX, popupY, popupW, popupH);
}
