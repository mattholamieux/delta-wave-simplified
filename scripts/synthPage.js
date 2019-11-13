
function toggleSynthParams() {
  // if (keyWentDown(186)) {
  //
  //   if (!startPage && !instructions) {
  //     if (sequencers[selectedSequencer].rings.length > 0 && !masterPage) {
  //       synthPage = !synthPage;
  //     }
  //   }
  // }
  // Set rotation target for animation to synth params page
  if (synthPage) {
    xRotTarget = PI / 2;
  } else {
    xRotTarget = 0;
  }
  // animate rotation to synth params page
  if (xRotTarget > xRot && synthPage) {
    xRot += 0.05;
  } else if (xRotTarget < xRot && !synthPage) {
    xRot -= 0.05;
  } else {
    xRot = xRotTarget;
  }
  rotateX(xRot);
  if (synthPage) {
    push();
    rotateX(-xRot);
    box(600, 600, 10);
    pop();
  }
}
