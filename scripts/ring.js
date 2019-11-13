class Ring {
  constructor(numTrigs, patLength, spaceBetween, note, synth, dur, vel, synthOpts, kord) {
    this.x = 0;
    this.y = 0;
    this.w = scl;
    this.h = scl;
    this.numTrigs = numTrigs;
    this.patLength = patLength;
    this.spaceBetween = spaceBetween;
    this.isSelected = false;
    this.note = note;
    this.kord = kord;
    this.pattern = beet.pattern(this.numTrigs, this.patLength).seq;
    this.trigs = [];
    this.synth = synth;
    this.synthOpts = synthOpts;
    this.tempo = 1;
    this.dur = dur;
    this.vel = vel;
    this.probability = 10;
    this.tick = new Tick(this.x, this.y, scl, scl, note, this.synth, this.dur, this.vel, this.synthOpts, kord, this.probability);
  }

  passSliderVals(opts) {
    this.synthOpts = opts;
  }

  changePatternVals(trigs, length) {
    this.pattern = beet.pattern(this.numTrigs, this.patLength).seq;
    this.createTrigs();
  }

  newTick() {
    this.tick = new Tick(this.x, this.y, this.w, this.h, this.note, this.synth, this.dur, this.vel, this.synthOpts, this.kord, this.probability);
  }


  changeProbability() {
    probability = this.probability * 10;
    if (keyWentDown(81)) {
      if (this.isSelected && synthPage) {
        if (this.tick.probability > 0) {
          this.probability--;
          this.tick.probability--;
        }
      }
    }
    if (keyWentDown(69)) {
      if (this.tick.probability < 10) {
        this.probability++;
        this.tick.probability++;
      }
    }
  }

  createTrigs() {
    let x = this.x;
    let y = this.y
    let angle = 0;
    for (let t of this.trigs) {
      this.trigs.splice(t, 1);
    }
    for (let i = 0; i < this.pattern.length; i++) {
      if (this.pattern[i] == 1) {
        let trig = new Trig(this.spaceBetween, y, this.w, this.h, angle);
        this.trigs.push(trig);
      }
      angle += 2 * PI / this.pattern.length;
    }
  }

  showPattern() {
    let x = this.x;
    let y = this.y
    let angle = 0;
    for (let i = 0; i < this.pattern.length; i++) {
      push();
      rotateZ(angle);
      translate(this.spaceBetween, y);
      stroke(201, 3, 199);
      if (this.isSelected) {
        noStroke();
        fill(200, 200, 200, 200);
        box(this.w * 1.5, this.h * 1.5);
      }
      fill(201, 3, 199, 150);
      box(this.w, this.h);
      pop();
      angle += 2 * PI / this.pattern.length;
    }
  }

  showTrigs() {
    for (let t of this.trigs) {
      t.show();
    }
  }

  showTick() {
    this.tick.show(this.spaceBetween);
  }

  moveTick(time) {
    this.tick.move(this, time);
  }

}