class Master {
  constructor() {
    this.scaleCounter = 0;
    this.modeCounter = 0;
    this.currentScaleSliderValue = 0;
    this.currentBPMSliderValue = 120;
    this.sliders = [];
    this.masterFXSliders = [];
    this.masterFXSlider0 = new Slider(0, -250, 250, -250, 0, 0.01, 5);
    this.masterFXSlider1 = new Slider(0, -250, 250, -200, 0, 0.01, 4);
    this.masterFXSlider2 = new Slider(0, -250, 250, -150, 0, 0.01, delayTimes.length);
    this.masterFXSlider3 = new Slider(-100, -250, 250, -100, 0, 0.01, 0.99);
    this.masterFXSlider4 = new Slider(0, -250, 250, 100, 0, 0.01, 0.99);
    this.masterFXSlider5 = new Slider(-175, -250, 250, 150, 0, 1, 4000);
    this.masterFXSlider6 = new Slider(-250, -250, 250, 200, 0, 0.1, 11.9);
    this.masterFXSlider7 = new Slider(0, -250, 250, 250, 0, 40, 200);
    this.masterFXSliders.push(this.masterFXSlider0, this.masterFXSlider1, this.masterFXSlider2, this.masterFXSlider3, this.masterFXSlider4, this.masterFXSlider5, this.masterFXSlider6, this.masterFXSlider7);
    this.slider0 = new Slider(-250, -400, -100, -250, 0, -10, 10);
    this.slider1 = new Slider(-399, -400, -100, -200, 0, 0.01, 0.99);
    this.slider2 = new Slider(-399, -400, -100, -150, 0, 0.01, 0.99);
    this.slider3 = new Slider(-399, -400, -100, -100, 0, 0.01, 0.99);
    this.slider4 = new Slider(250, 100, 400, -251, 0, -10, 10);
    this.slider5 = new Slider(101, 100, 400, -201, 0, 0.01, 0.99);
    this.slider6 = new Slider(101, 100, 400, -151, 0, 0.01, 0.99);
    this.slider7 = new Slider(101, 100, 400, -101, 0, 0.01, 0.99);
    this.slider8 = new Slider(-250, -400, -100, 100, 0, -10, 10);
    this.slider9 = new Slider(-399, -400, -100, 150, 0, 0.01, 0.99);
    this.slider10 = new Slider(-399, -400, -100, 200, 0, 0.01, 0.99);
    this.slider11 = new Slider(-399, -400, -100, 250, 0, 0.01, 0.99);
    this.slider12 = new Slider(250, 100, 400, 101, 0, -10, 10);
    this.slider13 = new Slider(101, 100, 400, 151, 0, 0.01, 0.99);
    this.slider14 = new Slider(101, 100, 400, 201, 0, 0.01, 0.99);
    this.slider15 = new Slider(101, 100, 400, 251, 0, 0.01, 0.99);
    this.sliders.push(this.slider0, this.slider1, this.slider2, this.slider3, this.slider4, this.slider5, this.slider6, this.slider7, this.slider8, this.slider9, this.slider10, this.slider11, this.slider12, this.slider13, this.slider14, this.slider15);
    this.selector = new sliderSelector(-399, -250, 0);
    this.graphics = createGraphics(200,200);
  }


  assignSliders() {
    if (masterPage) {
      // if (masterPage2) {
        // chorus.frequency.value = this.masterFXSliders[0].m;
        // chorus.delayTime = this.masterFXSliders[1].m;
        // delay.delayTime.value = delayTimes[Math.floor(this.masterFXSliders[2].m)];
        // delay.feedback.value = this.masterFXSliders[3].m;
        // reverb.roomSize.value = this.masterFXSliders[4].m;
        // reverb.dampening.value = this.masterFXSliders[5].m;

      // } else {
        for (let i = 0; i < sequencers.length; i++) {
          sequencers[i].mixerChannel.set({
            "volume": parseFloat(this.sliders[0 + (i * 4)].m)
          });
          sequencers[i].chorSend.set({
            "gain": parseFloat(this.sliders[1 + (i * 4)].m)
          });
          sequencers[i].delaySend.set({
            "gain": parseFloat(this.sliders[2 + (i * 4)].m)
          });
          sequencers[i].revSend.set({
            "gain": parseFloat(this.sliders[3 + (i * 4)].m)
          });
        }
      // }
    }
  }

  doSliderStuff() {
    for (let slider of this.sliders) {
      slider.mapVals();
    }
    for (let fxSlider of this.masterFXSliders) {
      fxSlider.mapVals();
    }
    if (masterPage) {
      if (masterPage2) {
        for (let s of this.masterFXSliders) {
          s.show();
          if (this.selector.y === s.y) {
            let n = constrain(s.x, s.linex1 + 1, s.linex2 - 1);
            s.x = n;
            this.selector.x = s.x;
            if (keyIsDown(68)) {
              s.x += 5;
            }
            if (keyIsDown(65)) {
              s.x -= 5;
            }
          }
        }
      } else {
        for (let s of this.sliders) {
          s.show();
          if (this.selector.y === s.y) {
            let n = constrain(s.x, s.linex1 + 1, s.linex2 - 1);
            s.x = n;
            this.selector.x = s.x;
            if (keyIsDown(68)) {
              s.x += 5;
            }
            if (keyIsDown(65)) {
              s.x -= 5;
            }
          }
        }
      }
      this.selector.show();
    }
  }


  // KeyChange functionality
  changeKey() {
    if (masterPage2) {
      if (Math.floor(this.masterFXSliders[6].m) !== this.currentScaleSliderValue) {
        this.scaleCounter = Math.floor(this.masterFXSliders[6].m);
        notes.length = 0;
        chords.length = 0;
        keySet(scales[this.scaleCounter], modes[this.modeCounter], 5);
      }
      this.currentScaleSliderValue = Math.floor(this.masterFXSliders[6].m);
      if (keyWentDown(75)){
        if (this.modeCounter === 0){
          this.modeCounter = 1;
        } else {
          this.modeCounter = 0;
        }
        notes.length = 0;
        chords.length = 0;
        keySet(scales[this.scaleCounter], modes[this.modeCounter], 5);
      }
    }
  }

changeTempo(){
  if (masterPage2){
    if (Math.floor(this.masterFXSliders[7].m) != this.currentBPMSliderValue){
      Tone.Transport.bpm.value = Math.floor(this.masterFXSliders[7].m);
    }
    this.currentBPMSliderValue = Math.floor(this.masterFXSliders[7].m);
  }
}


}