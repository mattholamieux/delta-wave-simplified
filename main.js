let beet, ctx, loopOne, loopTwo, loopThree, reverb, chorus, delay, compressor, master, centerX, centerY, myFont, textGraphic, textGraphic2, textGraphic3, titleText, titleText2, titleX, probability;
let scl = 15;
let counter = 0;
let notes = [];
let activeTicks = [];
let chords = [];
let scales = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
let modes = ['major', 'minor'];
let filters = ['lowpass', 'allpass', 'highpass', 'bandpass'];
let oscillators = ['sawtooth', 'sine', 'square', 'triangle'];
let delayTimes = ['48n', '40n', '32n', '24n', '16n', '12n', '8n', '4n', '2n'];
let sustainTimes = [0.01, 0.02, 0.4, 0.1, 0.2, 0.01, 0.03, 0.07, 0.05, 0.01];
let attackTimes = [0.001, 0.002, 0.005, 0.2, 0.001, 0.3, 0.1, 0.001, 0.1];
let synths = [];
let chorSends = [];
let delaySends = [];
let revSends = [];
let meters = [];
let mixer = [];
let sequencers = [];
let selectedSequencer = 0;
let zoomTarget = 0;
let currentZoom = 0;
let angle = 0;
let xRot = 0;
let xRotTarget = 0;
let r1val = 1;
let r2val = 1;
let r2isOn = false;
let push1val = 0;
let push2val = 0;
let push3val = 0;
let slider1val = 0;
let slider2val = 0;
let slider1prev = 0;
let synthPage = false;
let masterPage = false;
let masterPage2 = false;
let startPage = true;
let instructions = false;
let seqInstructions = false;
let synthInstructions = false;
let masterInstructions = false;
let master2Instructions = false;
let r1val4synthPage = -147;
let r2val4synthPage = -147;
let zoomOut = 0;
let randomXs = [];
let randomYs = [];
let randomZs = [];
let message = "";
let firstPress = false;
let instructionsFirstTime = true;
let introSong;

function preload() {
  myFont = loadFont('assets/SFAlienEncountersSolid.ttf');
  titleFont = loadFont('assets/SFAlienEncounters.ttf');
  titleFontItalic = loadFont('assets/SFAlienEncounters-Italic.ttf');
  myFontItalic = loadFont('assets/SFAlienEncountersSolid-Ital.ttf');
  introSong = loadSound('assets/dwdemo2.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  introSong.setVolume(0.1);
  introSong.loop();
  initText();
  perspective();
  centerX = windowWidth / 2;
  cenerY = windowHeight / 2;
  ctx = new Tone.Context();
  beet = new Beet({
    context: ctx
  });
  loopOne = new Tone.Loop(normalTempo, '8n');
  loopTwo = new Tone.Loop(twiceTempo, '16n');
  loopThree = new Tone.Loop(halfTempo, '4n');
  Tone.Transport.bpm.value = 120;
  keySet(scales[0], modes[0], 5);
  initMixer();
  initFX();
  initMeters();
  initSynths();
  initSeqs();
  sequencers[selectedSequencer].isSelected = true;
  master = new Master();
  Tone.Transport.start();
  loopOne.start(0);
  loopTwo.start(0);
  loopThree.start(0);
  for (let i = 0; i < 200; i++) {
    randomX = Math.floor(random(-centerX, centerX));
    randomY = Math.floor(random(-400, 100));
    randomZ = Math.floor(random(0, 200));
    randomXs.push(randomX);
    randomYs.push(randomY);
    randomZs.push(randomZ);
  }
  master.assignSliders();
  for (let i = 0; i < 2; i++) {
    sequencers[0].addRing();
  }
  sequencers[0].rings[1].patLength = 8;
  sequencers[0].rings[1].numTrigs = 4;
  sequencers[0].rings[1].tempo = 2;
  sequencers[0].rings[0].tick.vel = 0;
  sequencers[0].rings[1].tick.vel = 0;
}

function draw() {
  background(0);
  showText();
  keyControls();
  push();
  stroke(101, 103, 99, 10);
  fill(101, 100, 199, 100);
  translate(0, 300, 0);
  rotateY(-currentZoom / 640);
  ellipsoid(800, 1, 800, 8, 8);
  pop();
  for (let i = 0; i < 200; i++) {
    push();
    translate(randomXs[i], randomYs[i], randomZs[i]);
    fill(255, 255, 255, 100);
    noStroke();
    box(2, 2, 2);
    pop();
  }
  changeSequencer();
  toggleSynthParams();
  toggleMasterPage();
  // toggleInstructions();
  if (startPage) {
    if (keyWentDown(186) || keyWentDown(74) || keyWentDown(76) || keyWentDown(75)) {
      introSong.stop();
      Tone.context.resume();
    }
    translate(0, 0, -2000);
  }
  if (masterPage) {
    translate(-currentZoom + 1500, 0, -2000);
  }
  push();
  translate(0, -20, 0);
  if (!startPage) {
    visualize();
  }
  pop();
  push();
  translate(currentZoom, -20, 0);
  if (sequencers.length > 0) {
    for (let s of sequencers) {
      s.modifyPattern();
      s.doPatternStuff();
    }
    sequencers[selectedSequencer].synthRandomize();
  }
  pop();
  showInstructions();
  master.changeKey();
  master.changeTempo();
  showStartPage();
  angle += -0.01;
  push1val = 0;
  push2val = 0;
  push3val = 0;
  r2isOn = false;
  activeTicks.length = 0;
}



function changeSequencer() {
  if (zoomTarget > currentZoom) {
    currentZoom += 100;
  } else if (zoomTarget < currentZoom) {
    currentZoom -= 100;
  } else {
    currentZoom = zoomTarget;
  }
}
