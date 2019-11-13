function normalTempo(time) {
  for (let s of sequencers) {
    if (counter != 0) {
      for (let r of s.rings) {
        if (r.tempo === 1) {
          r.moveTick(time);
        }
      }
    }
  }
  counter++;
}

function twiceTempo(time) {
  for (let s of sequencers) {
    if (counter != 0) {
      for (let r of s.rings) {
        if (r.tempo === 2) {
          r.moveTick(time);
        }
      }
    }
  }
}
//
function halfTempo(time) {
  for (let s of sequencers) {
    if (counter != 0) {
      for (let r of s.rings) {
        if (r.tempo === 0) {
          r.moveTick(time);
        }
      }
    }
  }
}