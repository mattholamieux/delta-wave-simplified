class Trig {
  constructor(x, y, w, h, angle) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
  }

  show() {
    push();
    rotateZ(this.angle);
    translate(this.x, this.y);
    stroke(1, 203, 99);
    fill(1, 203, 99, 100);
    box(this.w, this.h);
    pop();
  }

}
