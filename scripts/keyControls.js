function keyControls() {
  if (!startPage && !instructions) {
    let sRing = sequencers[selectedSequencer].selectedRing;
    if (!masterPage) {
      if (!synthPage) {
        // Arrow Keys
        if (keyWentDown(87)) {
          if (sequencers[selectedSequencer].rings.length > 0) {
            if (sequencers[selectedSequencer].rings[sRing].patLength < 20) {
              sequencers[selectedSequencer].rings[sRing].patLength++;
              sequencers[selectedSequencer].rings[sRing].newTick();
            }
          }
        }
        if (keyWentDown(83)) {
          if (sequencers[selectedSequencer].rings.length > 0) {
            if (sequencers[selectedSequencer].rings[sRing].patLength > 0) {
              sequencers[selectedSequencer].rings[sRing].patLength--;
              sequencers[selectedSequencer].rings[sRing].newTick();
            }
          }
        }
        if (keyWentDown(85)){
          sequencers[selectedSequencer].rings[sRing].tick.note--;
          if (sequencers[selectedSequencer].rings[sRing].tick.note < 0){
            sequencers[selectedSequencer].rings[sRing].tick.note = notes.length-1;
          }
        }
        if (keyWentDown(79)){
          sequencers[selectedSequencer].rings[sRing].tick.note++;
          if (sequencers[selectedSequencer].rings[sRing].tick.note > notes.length-1){
            sequencers[selectedSequencer].rings[sRing].tick.note = 0;
          }
        }
        if (keyWentDown(81)) {
          if (selectedSequencer < sequencers.length - 1) {
            selectedSequencer++; //select sequencer
            for (s of sequencers) {
              s.isSelected = false; //unselect all sequences
            }
            sequencers[selectedSequencer].isSelected = true;
            zoomTarget = selectedSequencer * 1000; //set zoom target to selected sequencer
          }
        }
        if (keyWentDown(69)) {
          if (selectedSequencer > 0) {
            selectedSequencer--; //select sequencer
            for (s of sequencers) {
              s.isSelected = false; //unselect all sequences
            }
            sequencers[selectedSequencer].isSelected = true;
            zoomTarget = selectedSequencer * 1000; //set zoom target to selected sequencer
          }
        }

        if (keyWentDown(76)) {
          sequencers[selectedSequencer].changeRing();
        }

        if (keyWentDown(65)) {
          if (sequencers[selectedSequencer].rings.length > 0) {
            if (sequencers[selectedSequencer].rings[sRing].numTrigs > 1) {
              sequencers[selectedSequencer].rings[sRing].numTrigs--;
              sequencers[selectedSequencer].rings[sRing].newTick();
            }
          }
        }

        if (keyWentDown(68)) {
          if (sequencers[selectedSequencer].rings.length > 0) {
            if (sequencers[selectedSequencer].rings[sRing].numTrigs < sequencers[selectedSequencer].rings[sRing].patLength) {
              sequencers[selectedSequencer].rings[sRing].numTrigs++;
              sequencers[selectedSequencer].rings[sRing].newTick();
            }
          }
        }

        if (keyWentDown(74)) {
          sequencers[selectedSequencer].addRing();
        }

        if (keyWentDown(75)) {
          if (sequencers[selectedSequencer].rings.length > 0) {
            sequencers[selectedSequencer].rings[sRing].tempo++;
            if (sequencers[selectedSequencer].rings[sRing].tempo > 2) {
              sequencers[selectedSequencer].rings[sRing].tempo = 0;
            }
          }
        }
      }


      if (synthPage) {
        if (keyWentDown(75)) {
          sequencers[selectedSequencer].filterCounter++;
        }
        if (keyWentDown(74)) {
          sequencers[selectedSequencer].oscCounter++;
        }
        if (keyWentDown(76)) {
            let thisRing = sequencers[selectedSequencer].rings[sRing];
            thisRing.note = 6;
            thisRing.tick.note = 6;
            thisRing.kord = !thisRing.kord;
            thisRing.tick.kord = !thisRing.tick.kord;
        }
      }
    }
  }
}