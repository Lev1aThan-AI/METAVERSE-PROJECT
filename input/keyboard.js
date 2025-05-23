// input/keyboard.js

function keyPressed() {
  // Toggle Settings popup on 'Escape' key
  if (keyCode === ESCAPE) {
    showSettings = !showSettings;
    return false; // prevent default browser behavior
  }

  // Toggle Minimap on 'M' key (press again to close)
  if (key === 'M' || key === 'm') {
    showMiniMap = !showMiniMap;
  }
  // Toggle Inventory on 'I' key
  if (key === 'I' || key === 'i') {
    showInventory = !showInventory;
  }
  // (Other key handling for movement or interaction remains unchanged)
}

function keyReleased() {
  // No action needed for 'M' here, minimap now toggles on press
  // (Other key release handling remains unchanged)
}
