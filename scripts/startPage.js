
function showStartPage() {
  if (startPage) {

    push();
    titleText.text('DELTA WAVE', 250, 50);
    titleText.background(0, 0, 0, 0);
    titleText2.text('DELTA WAVE', 250, 50);
    titleText2.background(0, 0, 0, 0);
    titleText3.text('polyrhythmic synthesizer', 250, 75);
    titleText3.background(0, 0, 0, 0);
    translate(titleX, -30, 2400);
    titleText.fill(50, 255, 155, 1);
    texture(titleText);
    plane(250, 100);
    translate(0, 0, -10);
    texture(titleText2);
    plane(250, 100);
    translate(0,10,0);
    texture(titleText3);
    plane(250, 100);
    translate(0, 100, 0);
    textGraphic.textSize(18);
    textGraphic.fill(250, 255, 255, 2);
    textGraphic.text('any key to begin', 125, 50);
    textGraphic.background(0, 0, 0, 0);
    texture(textGraphic);
    plane(100, 50);
    pop();
    if (titleX > 0 || titleX < 0) {
      titleX -= 20;
    }
    if (keyWentDown(186) || keyWentDown(74) || keyWentDown(76) || keyWentDown(75)) {
      titleX = -1;
      sequencers[0].rings.length = 0;
      sequencers[0].selectedRing = 0;
      sequencers[0].noteCounter = 0;
      textGraphic.text('', 0,0);
      setTimeout(function() {
        startPage = !startPage;
        // instructions = true;
      }, 500);
    }
  }
}