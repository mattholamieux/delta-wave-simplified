const majorScales = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  G: ["G", "A", "B", "C", "D", "E", "F#"],
  D: ["D", "E", "F#", "G", "A", "B", "C#"],
  A: ["A", "B", "C#", "D", "E", "F#", "G#"],
  E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
  B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
  Gb: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
  Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
  F: ["F", "G", "A", "Bb", "C", "D", "E"]
}

const minorScales = {
  C: ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
  G: ["G", "A", "Bb", "C", "D", "Eb", "F"],
  D: ["D", "E", "F", "G", "A", "Bb", "C"],
  A: ["A", "B", "C", "D", "E", "F", "G"],
  E: ["E", "F#", "G", "A", "B", "C", "D"],
  B: ["B", "C#", "D", "E", "F#", "G", "A"],
  Gb: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "Fb"],
  Db: ["Db", "Eb", "Fb", "Gb", "Ab", "Bb", "Cb"],
  Ab: ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb"],
  Eb: ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db"],
  Bb: ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"],
  F: ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],
}

const minorChords =
{
  "C": ["C", "Eb", "G"],
  "G": ["G", "Bb", "D"],
  "D": ["D", "F", "A"],
  "A": ["A", "C", "E"],
  "E": ["E", "G", "B"],
  "B": ["B", "D", "F#"],
  "Gb": ["Gb", "Bb", "Db"],
  "Db": ["Db", "Fb", "Ab"],
  "Ab": ["Ab", "Cb", "Eb"],
  "Eb": ["Eb", "Gb", "Bb"],
  "Bb": ["Bb", "Db", "F"],
  "F": ["F", "Ab", "C"],
}


const getScaleRange = (scale, mode, range) => {

  let notes;
  if (mode === 'major') {
    notes = majorScales[scale];
  } else if (mode === 'minor') {
    notes = minorScales[scale];
  } else {
    console.error("That's not a mode built into the helper function, choose minor or major for now or download Tonal.js");
  }

  // assign numbers incrementing at C
  var overC = false;
  var noteRange = notes.map((el, i) => {
    if (i > 0 && (el === 'C' || el === 'Db')) {
      overC = true;
    }

    if (overC) {
      el = `${el}${range + 1}`;
    } else {
      el = `${el}${range}`;
    }
    return el;
  })

  return noteRange;
}


const getChord = (scale, mode, range) => {

  var notes
  if (mode === 'major') {
    notes = getScaleRange(scale, mode, range);
    return [notes[0], notes[2], notes[4]];
  } else if (mode === 'minor') {
    notes = minorChords[scale];
    var overC = false;
    var noteRange = notes.map((el, i) => {
      if (i > 0 && (el === 'C' || el === 'Db')) {
        overC = true;
      }

      if (overC) {
        el = `${el}${range + 1}`;
      } else {
        el = `${el}${range}`;
      }
      return el;
    })

    return noteRange;
  } else {
    console.error("That's not a mode built into the helper function, choose minor or major for now or download Tonal.js");
  }
}


const getChordbyDegree = (scale, mode, range, degree) => {
  var notes
  // if (mode === 'major') {
    notes = getScaleRange(scale, mode, range);
    octaveUp = getScaleRange(scale, mode, range+1);
    // console.log(notes);
    // console.log(octaveUp);
    firstNote = notes[degree];
    secondNote = notes[degree+2];
    if ((degree+2)>(notes.length-1)){
      secondNote = octaveUp[(degree+2)%notes.length];
    }
      thirdNote = notes[degree+4];
    if ((degree+4)>(notes.length-1)){
      thirdNote = octaveUp[(degree+4)%notes.length];
    }
    return [firstNote, secondNote, thirdNote];
  // }
  // else if (mode === 'minor') {
  //   notes = minorChords[scale];
  //   var overC = false;
  //   var noteRange = notes.map((el, i) => {
  //     if (i > 0 && (el === 'C' || el === 'Db')) {
  //       overC = true;
  //     }
  //
  //     if (overC) {
  //       el = `${el}${range + 1}`;
  //     } else {
  //       el = `${el}${range}`;
  //     }
  //     return el;
  //   })
  //
  //   return noteRange;
  // }
  // else {
    // console.error("That's not a mode built into the helper function, choose minor or major for now or download Tonal.js");
  // }
}


