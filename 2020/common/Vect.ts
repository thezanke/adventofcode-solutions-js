export class Vect {
  constructor(
    public x = 0,
    public y = 0,
  ) {}

  add(vect: Vect) {
    this.x += vect.x;
    this.y += vect.y;
  }
}
