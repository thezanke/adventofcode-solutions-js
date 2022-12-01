import { degreeToRadian } from './degreeToRadian.ts';

export class Vect {
  constructor (
    public x = 0,
    public y = 0
  ) {}

  add (vect: Vect) {
    this.x += vect.x;
    this.y += vect.y;

    return this;
  }

  multiply (amount: number | Vect) {
    if (amount instanceof Vect) {
      this.x *= amount.x;
      this.y *= amount.y;
    } else {
      this.x *= amount;
      this.y *= amount;
    }

    return this;
  }

  rotate (deg: number, around = new Vect(0, 0)) {
    // TODO: deal with rotating around another vector

    const angle = degreeToRadian(deg);
    const newX = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const newY = this.y * Math.cos(angle) + this.x * Math.sin(angle);
    this.x = newX;
    this.y = newY;

    return this;
  }

  mDistance (from = new Vect(0, 0)) {
    const x = this.x - from.x;
    const y = this.y - from.y;
    return Math.abs(x) + Math.abs(y);
  }

  copy () {
    return new Vect(this.x, this.y);
  }
}
