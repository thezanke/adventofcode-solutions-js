// generated by prepare script
import _ from 'lodash';

class Octo {
  power = 0;
  x = 0;
  y = 0;
  flash = false;

  constructor (power, x, y) {
    this.power = power;
    this.x = x;
    this.y = y;
  }
}

const getNeighbors = _.memoize((octo, zone) => {
  const { x, y } = octo;

  return [
    zone[y - 1]?.[x - 1],
    zone[y - 1]?.[x],
    zone[y - 1]?.[x + 1],
    zone[y]?.[x - 1],
    zone[y]?.[x],
    zone[y]?.[x + 1],
    zone[y + 1]?.[x - 1],
    zone[y + 1]?.[x],
    zone[y + 1]?.[x + 1]
  ].filter(Boolean);
});

export const part1 = (input) => {
  const all = [];
  const zone = input.map((l, y) =>
    l.map((n, x) => {
      const o = new Octo(n, x, y);
      all.push(o);

      return o;
    })
  );

  const flashRecursively = (o) => {
    if (o.flash) return;

    o.power += 1;
    o.flash = o.power > 9;

    if (o.flash) {
      getNeighbors(o, zone).forEach(flashRecursively);
    }
  };

  let flashes = 0;

  for (let step = 0; step < 100; step += 1) {
    all.forEach(flashRecursively);

    flashes += all.reduce((t, o) => {
      if (!o.flash) return t;

      o.flash = false;
      o.power = 0;

      return t + 1;
    }, 0);
  }

  return flashes;
};

export const part2 = (input) => {
  const all = [];
  const zone = input.map((l, y) =>
    l.map((n, x) => {
      const o = new Octo(n, x, y);
      all.push(o);

      return o;
    })
  );

  const flashRecursively = (o) => {
    if (o.flash) return;

    o.power += 1;
    o.flash = o.power > 9;

    if (o.flash) {
      getNeighbors(o, zone).forEach(flashRecursively);
    }
  };

  for (let step = 0; ; step += 1) {
    all.forEach(flashRecursively);

    const totalPower = all.reduce((t, o) => {
      if (o.flash) {
        o.flash = false;
        o.power = 0;
      }

      return t + o.power;
    }, 0);

    if (!totalPower) return step + 1;
  }
};
