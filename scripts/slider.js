class Slider {
  constructor(x, linex1, linex2, y, z, min, max) {
    this.linex1 = linex1;
    this.linex2 = linex2;
    this.y = y;
    this.x = x;
    this.z = z;
    this.w = 20;
    this.h = 20;
    this.m;
    this.min = min;
    this.max = max;
  }

  show() {
    push();
    stroke(201, 3, 199, 150);
    translate(0, 0, this.z);
    line(this.linex1, this.y, this.linex2, this.y);
    strokeWeight(2);
    pop();
    push();
    translate(this.x, this.y, this.z);
    noStroke();
    fill(251, 203, 199, 150);
    box(this.w, this.h, 20);
    pop();
  }

  mapVals() {
    this.m = map(this.x, this.linex1, this.linex2, this.min, this.max).toFixed(2);
  }
}

class sliderSelector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  show() {
    push();
    translate(this.x, this.y, this.z);
    noStroke();
    box(30, 30, 30);
    stroke(201, 3, 199, 150);
    box(20, 20, 20);
    pop();
    if (masterPage) {
      if (keyWentDown(83) && this.y < 251) {
        this.y += 50;
      }

      if (masterPage2){
        if (this.y === -50){
          this.y = 100;
        }
        if (this.y === 50){
          this.y = -100;
        }
        if (this.y === 300){
          this.y = 250;
        }
      }
      else {
      if (this.y === -50){
        this.y = -251;
        selectedSequencer++; //select sequencer using slider
        for (s of sequencers) {
          s.isSelected = false; //unselect all sequences
        }
        sequencers[selectedSequencer].isSelected = true;
        zoomTarget = selectedSequencer * 1000; //set zoom target to selected sequencer
      }
      if (this.y === -51){
        this.y = 100;
        selectedSequencer++; //select sequencer using slider
        for (s of sequencers) {
          s.isSelected = false; //unselect all sequences
        }
        sequencers[selectedSequencer].isSelected = true;
        zoomTarget = selectedSequencer * 1000; //set zoom target to selected sequencer
      }
      if (this.y === -251 && keyWentDown(87)){
        this.y = -50;
        selectedSequencer--; //select sequencer using slider
        for (s of sequencers) {
          s.isSelected = false; //unselect all sequences
        }
        sequencers[selectedSequencer].isSelected = true;
        zoomTarget = selectedSequencer * 1000; //set zoom target to selected sequencer
      }
      if (this.y === 300){
        this.y = 101;
        selectedSequencer++; //select sequencer using slider
        for (s of sequencers) {
          s.isSelected = false; //unselect all sequences
        }
        sequencers[selectedSequencer].isSelected = true;
        zoomTarget = selectedSequencer * 1000; //set zoom target to selected sequencer
      }
      if (this.y === 101 && keyWentDown(87)){
        this.y = 300;
        selectedSequencer--; //select sequencer using slider
        for (s of sequencers) {
          s.isSelected = false; //unselect all sequences
        }
        sequencers[selectedSequencer].isSelected = true;
        zoomTarget = selectedSequencer * 1000; //set zoom target to selected sequencer
      }
      if (this.y === 50){
        this.y = -101;
        selectedSequencer--; //select sequencer using slider
        for (s of sequencers) {
          s.isSelected = false; //unselect all sequences
        }
        sequencers[selectedSequencer].isSelected = true;
        zoomTarget = selectedSequencer * 1000; //set zoom target to selected sequencer
      }
    }
      if (keyWentDown(87) && this.y > -250) {
        this.y -= 50;
      }
    }


    if (synthPage) {
      if (keyWentDown(83) && this.z > -250) {
        this.z -= 50;
        if (this.z === 0) {
          this.z = -50;
        }
      }
      if (keyWentDown(87) && this.z < 250) {
        this.z += 50;
        if (this.z === 0) {
          this.z = 50;
        }
      }
    }
  }

}