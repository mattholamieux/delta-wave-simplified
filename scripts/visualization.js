
function visualize() {
  let m1Raw = meters[0].getLevel();
  let m1Map = Math.floor(map(m1Raw, -100, 0, 30, 100));
  let m2Raw = meters[1].getLevel();
  let m2Map = Math.floor(map(m2Raw, -100, 0, 30, 100));
  let m3Raw = meters[2].getLevel();
  let m3Map = Math.floor(map(m3Raw, -100, 0, 0, 50));
  let m4Raw = meters[3].getLevel();
  let m4Map = Math.floor(map(m4Raw, -40, -20, 10, 30));
  push();
  translate(0, zoomOut, 0);
  if (m1Map > 0) {
    noStroke();
    fill(200, 100, 200, 100);
    push();
    if (!synthPage) {
      rotateY(angle);
    }
    box(m1Map * 6, 20, 20);
    pop();
  }
  if (m2Map > 0) {
    noStroke();
    strokeWeight(1);
    fill(200, 100, 0, 100);
    push();
    rotateY(angle);
    // rotateZ(angle);
    box(20, m2Map * 6, 20);
    pop();
  }
  if (m3Map > 0) {
    noStroke();
    strokeWeight(1);
    fill(50, 150, 180, 100);
    push();
    rotateY(angle);
    // rotateZ(angle);
    sphere(m3Map * 1.2, 4, 4);
    pop();
  }
  if (m4Map > 0) {
    noStroke();
    strokeWeight(1);
    fill(200, 100, 0, 180);
    push();
    rotateY(angle);
    // rotateZ(angle);
    box(m4Map);
    pop();
  }
  pop();
}