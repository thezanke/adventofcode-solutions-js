const [MOVE_LEFT, MOVE_UP, MOVE_RIGHT] = [1, 2, 3];
const [CART_UP, CART_RIGHT, CART_DOWN, CART_LEFT] = ['^', '>', 'v', '<'];
const [VERT, HORIZ, RIGHT_DIAG, LEFT_DIAG, INTERSECTION] = ['|', '-', '/', '\\', '+'];

const CART_MAP = new Map([[CART_UP, VERT], [CART_RIGHT, HORIZ], [CART_DOWN, VERT], [CART_LEFT, HORIZ]]);

const createCart = ({ x, y, dir }) => {
  const pos = { x, y };

  let nextMove = MOVE_LEFT;
  let currentDir = dir;

  return {
    move() {
      let nextPos;
      if (currentDir)
    }
  };
};

const parseInput = inputStr => {
  let carts = [];

  const map = inputStr.split('\n').map((line, y) =>
    line.split('').map((posStr, x) => {
      let str = posStr;
      if (CART_MAP.has(str)) {
        carts.push(createCart({ x, y, dir: str }));
        str = CART_MAP.get(str);
      }
      return { x, y, str };
    })
  );

  const width = map[0].length;
  const height = map.length;

  return { map, carts, width, height };
};

const nextTick = sim => {
  console.log(sim);
}

const part1 = input => {
  let sim = parseInput(input);
  console.log(sim);
  return false;
};

module.exports = { part1 };
