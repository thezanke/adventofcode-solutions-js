const { createField } = require('./field');
const { createUnits } = require('./units');

const [OPEN, WALL, ELF, GOBLIN] = ['.', '#', 'E', 'G'];
const [UP, RIGHT, DOWN, LEFT] = [0, 1, 2, 3];
const UNITS = [ELF, GOBLIN];

module.exports = initialState => {
  const field = createField();
  const units = createUnits(field);

  let currentTick = 0;

  const field = initialState.split('\n').map((row, y) => {
    return row.split('').map((entity, x) => {
      if (UNITS.includes(entity)) {
        units.push(createUnit(entity, x, y));
        return OPEN;
      }

      return entity;
    });
  });

  const createUnit = (type, x, y) => ({
    type,
    pos: { x, y },
    power: 3,
    health: 200,
    get alive() {
      return this.health > 0;
    },
    get dead() {
      return !this.alive;
    },
    move(dir) {
      const nextPos = { ...this.pos };

      if (dir === UP) nextPos.y -= 1;
      else if (dir === RIGHT) nextPos.x += 1;
      else if (dir === DOWN) nextPos.y += 1;
      else if (dir === LEFT) nextPos.x -= 1;

      this.pos = nextPos;
      return this;
    },
    identifyTargets() {},
    takeTurn() {
      this.move(RIGHT);
    }
  });

  const findUnit = (x, y) => units.find(({ pos }) => pos.x === x && pos.y === y);

  const tick = fn => {
    fn();
    currentTick += 1;
  };

  const render = () => {
    const rendering = field
      .map((row, y) => {
        return row
          .map((entity, x) => {
            const unit = findUnit(x, y);
            return unit ? unit.type : entity;
          })
          .join(' ');
      })
      .join('\n');

    process.stdout.write(`\n${rendering}\n`);
  };

  render();

  const unit = findUnit(1, 1);

  setInterval(
    () =>
      tick(() => {
        units.forEach(unit => unit.takeTurn());
        render();
      }),
    1000
  );

  // const identifyTargets = ()

  // const performRound = () => {
  //   field.forReach((row, y) => {
  //     row.forEach((unit, x) => {
  //       if (!UNITS.includes(unit)) return;
  //       const targets = identifyTargets({ x, y });
  //     });
  //   });
  // };

  // console.log(field);
};
