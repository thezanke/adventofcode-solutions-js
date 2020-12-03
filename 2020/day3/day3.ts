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

const TREE = "#";

export const countTrees = (lines: string[], trajectory: Vect) => {
  const lineLength = lines[0].length;
  const position = new Vect();
  const locationsVisited = [];

  while (position.y < lines.length) {
    const { x, y } = position;
    const linePos = x % lineLength;
    const posChar = lines[y][linePos];
    locationsVisited.push(posChar);
    position.add(trajectory);
  }

  return locationsVisited.filter((c) => c === TREE).length;
};
