function drawMenu() {
  if (startingImage) image(startingImage, 0, 0, width, height);
  else background(220);

  if (showSettings) drawSettingsWindow();
}
