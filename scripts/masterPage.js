
function toggleMasterPage() {
push();
  if (keyWentDown(32)){
      if (!masterPage) {
        master.selector.y = -250;
        selectedSequencer = 0;
        for (s of sequencers) {
          s.isSelected = false;
        }
        sequencers[selectedSequencer].isSelected = true;
        zoomTarget = 0;
      }
      if (!synthPage && !masterPage2 && !startPage && !instructions) {
        masterPage = !masterPage;
      }
  }


  if (masterPage) {
    // if (keyWentDown(74)) {
    //   masterPage2 = !masterPage2;
    //   master.selector.y = -250;
    //   selectedSequencer = 0;
    //   for (s of sequencers) {
    //     s.isSelected = false;
    //   }
    //   sequencers[selectedSequencer].isSelected = true;
    //   zoomTarget = 0;
    // }
    if (masterPage2) {
      push();
      fill(100, 100, 20, 100);
      box(900, 600, 10);
      pop();
    } else {
      push();
      fill(100, 20, 100, 100);
      box(1300, 1200, 10);
      pop();
    }
    master.doSliderStuff();
    master.assignSliders();
    // translate(-currentZoom + 1500, 0, -2000);
  }
pop();
}

function keySet(scale, mode, numOctaves) {
  for (let i = 1; i < numOctaves; i++) {
    let singleOctave = getScaleRange(scale, mode, i);
    for (let k = 0; k < singleOctave.length; k++) {
      notes.push(singleOctave[k]);
    }
  }

  for (let j = 0; j < 7; j++) {
    let myChord = getChordbyDegree(scale, mode, 3, j);
    chords.push(myChord);
  }
}
