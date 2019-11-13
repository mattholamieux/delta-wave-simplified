
// function toggleInstructions() {
//   if (keyWentDown(13)) {
//     if (!startPage) {
//       instructions = !instructions;
//       instructionsFirstTime = false;
//     }
//   }
// }

function keyPressed(){
  if (instructionsFirstTime){
    loop();
  }
}

function showInstructions() {
  textGraphic.fill(255);
  if (instructions) {
    if (instructionsFirstTime){
      noLoop();
    instructionText.background(0,0,0,0);
  } else {
    instructionText.background(0);
  }
      instructionText.fill(255);
    if (synthPage){
      push();
      instructionText.text('arrows: change sliders', 250, 200);
      instructionText.text('square: change oscillator', 250, 225);
      instructionText.text('triangle: change filter', 250, 250);
      instructionText.text('circle: toggle chord mode', 250, 275);
      instructionText.text('x: return to sequencer', 250, 300);
      rotateX(-xRot);
      translate(0,80,200);
      texture(instructionText);
      plane(1000, 800);
      pop();
    } else if (masterPage){
    translate(currentZoom - 1500, 0, 2000);
      if (masterPage2){
        push();
        instructionText.text('square: FX controls', 250, 300);
        instructionText.text('triangle: scale mode', 250, 325);
        translate(0,80,200);
        texture(instructionText);
        plane(1000, 800);
        pop();
      } else {
        push();
        instructionText.text('square: master controls', 250, 300);
        instructionText.text('L2: return to sequencer', 250, 325);
        translate(0,80,200);
        texture(instructionText);
        plane(1000, 800);
        pop();
      }
    }else {
      push();
      instructionText.text('square: create ring', 250, 150);
      instructionText.text('up, down: add, remove steps', 250, 175);
      instructionText.text('left, right: add, remove trigger', 250, 200);
      instructionText.text('triangle: change speed', 250, 225);
      instructionText.text('circle: change ring', 250, 250);
      instructionText.text('x: view synth params', 250, 275);
      instructionText.text('L1 R1: change sequencers', 250, 300);
      instructionText.text('L2: FX controls', 250, 325);
      instructionText.text('press R2 on any page to toggle instructions', 250, 500);
      translate(0,80,200);
      texture(instructionText);
      plane(1000, 800);
      pop();
    }
  }
}

function showText() {
  if (masterPage) {
    if (!masterPage2) {
      if (master.selector.y === -250 || master.selector.y === -251 || master.selector.y === 100 || master.selector.y === 101) {
        message = 'volume';
      } else if (master.selector.y === -200 || master.selector.y === -201 || master.selector.y === 150 || master.selector.y === 151) {
        message = 'chorus';
      } else if (master.selector.y === -150 || master.selector.y === -151 || master.selector.y === 200 || master.selector.y === 201) {
        message = 'delay';
      } else if (master.selector.y === -100 || master.selector.y === -101 || master.selector.y === 250 || master.selector.y === 251) {
        message = 'reverb';
      }
    } else {
      if (master.selector.y === -250) {
        message = 'chorus frequency';
      } else if (master.selector.y === -200) {
        message = 'chorus delay';
      } else if (master.selector.y === -150) {
        message = 'delay time';
      } else if (master.selector.y === -100) {
        message = 'delay feedback';
      } else if (master.selector.y === 100) {
        message = 'reverb size';
      } else if (master.selector.y === 150) {
        message = 'reverb dampening';
      } else if (master.selector.y === 200) {
        if (master.modeCounter === 0) {
          message = 'scale (major)';
        } else {
          message = 'scale (minor)';
        }
      } else if (master.selector.y === 250) {
        message = 'tempo';
      }

    }
    push();
    textGraphic.fill(255);
    textGraphic.text(message, 125, 50);
    translate(0, 0, 200);
    texture(textGraphic);
    plane(250, 100);
    textGraphic.background(0);
    pop();
  }


  if (synthPage) {
    textGraphic.textSize(18);
    let trans = 0;
    if (sequencers[selectedSequencer].selector.z === 250) {
      message = 'pitch';
      trans = 250;
    } else if (sequencers[selectedSequencer].selector.z === 200) {
      message = 'velocity';
      trans = 200;
    } else if (sequencers[selectedSequencer].selector.z === 150) {
      message = 'attack';
      trans = 150;
    } else if (sequencers[selectedSequencer].selector.z === 100) {
      message = 'sustain';
      trans = 100;
    } else if (sequencers[selectedSequencer].selector.z === 50) {
      message = 'release';
      trans = 50;
    } else if (sequencers[selectedSequencer].selector.z === -50) {
      message = 'base freq';
      trans = -50;
    } else if (sequencers[selectedSequencer].selector.z === -100) {
      message = 'target freq';
      trans = -100;
    } else if (sequencers[selectedSequencer].selector.z === -150) {
      message = 'resonance';
      trans = -150;
    } else if (sequencers[selectedSequencer].selector.z === -200) {
      message = 'filt attack';
      trans = -200;
    } else if (sequencers[selectedSequencer].selector.z === -250) {
      message = 'filt release';
      trans = -250;
    }
    push();
    rotateX(xRot);
    if (xRot > 1.3) {
      textGraphic.fill(255);
      textGraphic.text(message, 125, 50);
      translate(230, 0, 260);
      texture(textGraphic);
      rotateX(-xRot);
      plane(250, 100);
      textGraphic.background(0);

      textGraphic2.text(oscillators[sequencers[selectedSequencer].oscCounter], 20, 50);
      textGraphic2.text(filters[sequencers[selectedSequencer].filterCounter], 20, 75);
      textGraphic2.text(sequencers[selectedSequencer].rings[sequencers[selectedSequencer].selectedRing].probability*10, 20, 100);
      if (sequencers[selectedSequencer].rings[sequencers[selectedSequencer].selectedRing].tick.kord){
            textGraphic2.text('chord', 20, 125);
      }
      translate(-400,0,0);
      texture(textGraphic2);
      plane(250, 100);
      textGraphic2.background(0);
    }
    pop();
  }

if (!startPage){
  push();
  translate(-490, -170, 0);
  texture(textGraphic3);
  plane(300, 400);
  pop();
}


  // unecessary comment
}