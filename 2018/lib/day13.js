const [TURN_LEFT, DONT_TURN, TURN_RIGHT] = [0, 1, 2];
const [CART_UP, CART_RIGHT, CART_DOWN, CART_LEFT] = ['^', '>', 'v', '<'];
const [VERT, HORIZ, RIGHT_DIAG, LEFT_DIAG, INTERSECTION, COLLISION] = ['|', '-', '/', '\\', '+', 'X']; // prettier-ignore

const CART_MAP = new Map([
  [CART_UP, VERT],
  [CART_RIGHT, HORIZ],
  [CART_DOWN, VERT],
  [CART_LEFT, HORIZ]
]);

const createSimulation = (inputStr, handleCollisions = false) => {
  let carts = [];
  let currentTick = 0;
  let collided = false;

  const map = inputStr.split('\n').map((line, y) =>
    line.split('').map((posStr, x) => {
      let facing = posStr;
      if (CART_MAP.has(facing)) {
        carts.push({ x, y, facing, lastTick: 0, nextTurn: TURN_LEFT });
        facing = CART_MAP.get(facing);
      }
      return { x, y, facing };
    })
  );

  const mapWidth = map[0].length;
  const mapHeight = map.length;

  const findCart = ({ x, y }, tick) =>
    carts.find(cart => {
      if (tick && cart.lastTick === tick) return false;
      return cart.x === x && cart.y === y;
    });

  const detectCollision = ({ x, y }) =>
    carts.filter(cart => cart.x === x && cart.y === y).length > 1;

  const getTrack = ({ x, y }) => map[y][x].facing;

  const render = () => {
    const board = map
      .map(row =>
        row
          .map(pos => {
            const cart = findCart(pos);
            if (cart === collided) return COLLISION;
            return cart ? cart.facing : pos.facing;
          })
          .join('')
      )
      .join('\n');

    console.log(board);
  };

  const getNextFacing = ({ facing, nextTurn }, track) => {
    if (track === INTERSECTION) {
      if (nextTurn === TURN_LEFT) {
        if (facing === CART_UP) return CART_LEFT;
        if (facing === CART_LEFT) return CART_DOWN;
        if (facing === CART_DOWN) return CART_RIGHT;
        if (facing === CART_RIGHT) return CART_UP;
      }

      if (nextTurn === TURN_RIGHT) {
        if (facing === CART_UP) return CART_RIGHT;
        if (facing === CART_RIGHT) return CART_DOWN;
        if (facing === CART_DOWN) return CART_LEFT;
        if (facing === CART_LEFT) return CART_UP;
      }
    }

    if (track === RIGHT_DIAG) {
      if (facing === CART_UP) return CART_RIGHT;
      if (facing === CART_RIGHT) return CART_UP;
      if (facing === CART_DOWN) return CART_LEFT;
      if (facing === CART_LEFT) return CART_DOWN;
    }

    if (track === LEFT_DIAG) {
      if (facing === CART_UP) return CART_LEFT;
      if (facing === CART_RIGHT) return CART_DOWN;
      if (facing === CART_DOWN) return CART_RIGHT;
      if (facing === CART_LEFT) return CART_UP;
    }

    return facing;
  };

  const getNextTurn = ({ nextTurn }, track) => {
    if (track !== INTERSECTION) return nextTurn;
    if (nextTurn === 2) return 0;
    return nextTurn + 1;
  };

  const moveCart = cart => {
    const { facing, nextTurn } = cart;

    cart.lastTick += 1;

    if (facing === CART_UP) cart.y -= 1;
    else if (facing === CART_RIGHT) cart.x += 1;
    else if (facing === CART_DOWN) cart.y += 1;
    else if (facing === CART_LEFT) cart.x -= 1;

    if (detectCollision(cart)) return cart;

    const track = getTrack(cart);
    cart.facing = getNextFacing(cart, track);
    cart.nextTurn = getNextTurn(cart, track);

    return false;
  };

  const nextTick = () => {
    currentTick += 1;

    for (let y = 0; y < mapHeight; y += 1) {
      for (let x = 0; x < mapWidth; x += 1) {
        const cart = findCart({ x, y }, currentTick);

        if (cart && moveCart(cart)) {
          collided = cart;
          if (handleCollisions) {
            carts = carts.filter(c => c.x !== x && c.y !== y);
          }
        }
      }
    }

    // render();

    return collided;
  };

  return {
    map,
    get carts() {
      return carts;
    },
    mapWidth,
    mapHeight,
    nextTick,
    render
  };
};

const part1 = input => {
  const sim = createSimulation(input);
  let collision = false;

  while (!collision) {
    collision = sim.nextTick();
  }

  return `${collision.x},${collision.y}`;
};

const part2 = input => {
  const sim = createSimulation(input, true);

  while (sim.carts.length > 1) {
    sim.nextTick();
  }

  const cart = sim.carts[0];

  return `${cart.x},${cart.y}`;
};

module.exports = { part1, part2 };
