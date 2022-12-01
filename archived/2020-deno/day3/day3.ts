import { Vect } from '../common/Vect.ts';

const TREE = '#';

export const countTrees = (lines: string[], trajectory: Vect) => {
  const lineLength = lines[0].length;
  const position = new Vect();

  let treeCount = 0;

  while (position.y < lines.length) {
    const { x, y } = position;
    const linePos = x % lineLength;
    const posChar = lines[y][linePos];
    if (posChar === TREE) treeCount += 1;
    position.add(trajectory);
  }

  return treeCount;
};
