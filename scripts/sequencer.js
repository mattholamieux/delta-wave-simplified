class Sequencer {
  constructor(synth, oscillator, mixerChannel, chorSend, delaySend, revSend, translate) {
    this.rings = [];
    this.sliders = [];
    this.selectedRing = 0;
    this.isSelected = false;
    this.synth = synth;
    this.synth.set({
      "oscillator": {
        "type": oscillators[oscillator]
      }
    });
    this.synthOpts;
    this.mixerChannel = mixerChannel;
    this.chorSend = chorSend;
    this.delaySend = delaySend;
    this.revSend = revSend;
    this.translate = translate;
    this.dur = '32n';
    if (oscillator === 1) {
      this.vel = 0.8;
    } else if (oscillator === 3) {
      this.vel = 0.5;
    } else {
      this.vel = 0.2;
    }
    this.filterCounter = 0;
    this.oscCounter = oscillator;
    this.kord = false;
    this.noteCounter = 0;
    this.chordCounter = 0;
    this.currentNote = 0;
    this.slider0 = new Slider(0, -150, 150, 0, 250, 0, notes.length); //note
    this.slider9 = new Slider(-90, -150, 150, 0, 200, 0.01, 0.9); // velocity
    this.slider1 = new Slider(-147, -150, 150, 0, 150, 0.01, 0.4); //attack
    this.slider2 = new Slider(-120, -150, 150, 0, 100, 0.01, 0.5); // sustain
    this.slider3 = new Slider(0, -150, 150, 0, 50, 0.01, 1.9); //release
    this.slider4 = new Slider(-132, -150, 150, 0, -50, 20, 1500); //filter base freq
    this.slider6 = new Slider(0, -150, 150, 0, -100, 0.1, 8); //filter octaves
    this.slider5 = new Slider(-150, -150, 150, 0, -150, 0.5, 10); // filter resonance
    this.slider7 = new Slider(-147, -150, 150, 0, -200, 0.001, 0.5); //filter attack
    this.slider8 = new Slider(-90, -150, 150, 0, -250, 0.02, 0.5); // filter release
    this.slider10 = new Slider(-90, -150, 150, 0, -300, 0.02, 0.5); //
    this.sliders.push(this.slider0, this.slider9, this.slider1, this.slider2, this.slider3, this.slider4, this.slider6, this.slider5, this.slider7, this.slider8);
    this.selector = new sliderSelector(-150, 0, 250);
  }


  synthRandomize() {
    if (keyWentDown(186)) {
      let aatk = attackTimes[Math.floor(random(0, 8.9))];
      let sust = sustainTimes[Math.floor(random(0, 8.9))];
      let rels = random(0.01, 1);
      // console.log(aatk, sust, rels);
      for (let r of this.rings) {
        if (this.rings.length > 0) {
          r.tick.synth.set({
            "envelope": {
              "attack": aatk,
              "release": rels
            },
            "filter": {
              "Q": random(0.5, 10)
            },
            "filterEnvelope": {
              "baseFrequency": random(20, 1500),
              "octaves": random(0.5, 8)
            }
          });
          r.dur = sust;
          r.tick.dur = sust;
        }
      }
    }
  }

  addRing() {
    let randomNote = Math.floor(random(5, notes.length));
    let randomChord = Math.floor(random(0, chords.length));
    if (this.isSelected && this.rings.length < 4) {
      let ring;
      if (this.kord) {
        ring = new Ring(1, 4, scl * ((this.noteCounter + 1) * 4), randomChord, this.synth, this.dur, this.vel, this.synthOpts, true);
      } else {
        ring = new Ring(1, 4, scl * ((this.noteCounter + 1) * 4), randomNote, this.synth, this.dur, this.vel, this.synthOpts, false);
      }
      ring.createTrigs();
      this.rings.push(ring);
      this.noteCounter++;
      this.chordCounter++;
      this.selectedRing = this.rings.length - 1;
    }
  }


  changeRing() {
    if (this.rings.length > 0) {
      if (this.isSelected) {
        this.selectedRing++;
        if (this.selectedRing > this.rings.length - 1) {
          this.selectedRing = 0;
        }
      }
    }
  }

  modifyPattern() {
    if (this.rings.length > 0) {
      if (this.isSelected && !synthPage) {
        for (let r of this.rings) {
          r.isSelected = false;
          // if (keyWentDown(87) || keyWentDown(83) || keyWentDown(75)){
          this.rings[this.selectedRing].changePatternVals();
          // }
          this.rings[this.selectedRing].isSelected = true;
        }
      }
    }
  }


  doPatternStuff() {
    if (sequencers.indexOf(this) !== 0) {
      translate(this.translate, 0, 0);
    }
    push();
    if (!synthPage) {
      rotateY(angle);
    }
    for (let r of this.rings) {
      r.showPattern();
      r.showTrigs();
      r.showTick();
      if (this.isSelected) {
        r.changeProbability();
      }
    }
    pop();
    // sliders
    for (let slider of this.sliders) {
      slider.mapVals();
    }
    if (synthPage && xRot > 1.0) {
      for (let s of this.sliders) {
        s.show();
        if (this.selector.z === s.z && this.isSelected) {
          let n = constrain(s.x, s.linex1 + 1, s.linex2 - 1);
          s.x = n;
          this.selector.x = s.x;
          if (this.isSelected && synthPage) {
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
      if (this.filterCounter > filters.length - 1) {
        this.filterCounter = 0;
      }
      if (this.oscCounter > oscillators.length - 1) {
        this.oscCounter = 0;
      }
    }
  }

  removeRing() {
    if (this.isSelected) {
      if (this.rings.length > 1) {
        this.rings.pop();
      }
    }
  }


}