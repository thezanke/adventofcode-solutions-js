interface Vector {
  x: number;
  y: number;
  z: number;
}

const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items: any) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

type Axis = 'x' | 'y' | 'z';

const DIMENSIONS: Axis[] = ['x', 'y', 'z'];

class Moon {
  pos: Vector;
  vel: Vector = { x: 0, y: 0, z: 0 };
  pNrg = 0;
  kNrg = 0;

  constructor(_pos: Vector, _vel?: Vector) {
    this.pos = { ..._pos };
    if (_vel) this.vel = { ..._vel };
  }

  get energy() {
    return this.pNrg * this.kNrg;
  }

  get state() {
    const { pos, vel } = this;
    // return `${pos.x},${pos.y},${pos.z},${vel.x},${vel.y},${vel.z}`;
    return (
      pos.x * 1e10 +
      pos.y * 1e8 +
      pos.z * 1e6 +
      vel.x * 1e4 +
      vel.y * 1e2 +
      vel.z
    );
  }

  getAxisState(axis: Axis) {
    return this.pos[axis] * 1000 + this.vel[axis];
  }
}

const MOON_COORDINATES = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;

const vectorEnergy = (v: Vector) => {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
};

export class Simulation {
  moons: Moon[];

  constructor(input: string[]) {
    this.moons = this.parseInput(input);
  }

  parseInput(input: string[]) {
    return input.map(moonStr => {
      const res = MOON_COORDINATES.exec(moonStr);
      if (!res) throw Error('error parsing input');
      const [x, y, z] = res.slice(1, 4).map(Number);
      return new Moon({ x, y, z });
    });
  }

  applyUpdates() {
    this.moons = this.moons.reduce<Moon[]>((nextMoons, currentMoon) => {
      const { pos, vel } = currentMoon;

      const newMoon = new Moon(pos, vel);

      this.moons.forEach(targetMoon => {
        if (targetMoon === currentMoon) return;
        DIMENSIONS.forEach(axis => {
          if (currentMoon.pos[axis] > targetMoon.pos[axis]) {
            newMoon.vel[axis] -= 1;
          }
          if (targetMoon.pos[axis] > currentMoon.pos[axis]) {
            newMoon.vel[axis] += 1;
          }
        });
      });

      DIMENSIONS.forEach(axis => {
        newMoon.pos[axis] += newMoon.vel[axis];
      });

      newMoon.pNrg = vectorEnergy(newMoon.pos);
      newMoon.kNrg = vectorEnergy(newMoon.vel);

      nextMoons.push(newMoon);
      return nextMoons;
    }, []);
  }

  next = () => {
    this.applyUpdates();
  };

  get totalEnergy() {
    return this.moons.reduce((total, moon) => {
      return total + moon.energy;
    }, 0);
  }

  get state() {
    return (
      this.moons[0].state * 1e6 +
      this.moons[1].state * 1e4 +
      this.moons[2].state * 1e2 +
      this.moons[3].state
    );
  }

  getAxisState(axis: Axis) {
    return this.moons.map(m => m.getAxisState(axis)).join(',');
  }
}

export const solvePart1 = (input: string[], length = 1) => {
  const sim = new Simulation(input);
  for (let i = 0; i < length; i += 1) {
    sim.next();
  }
  return sim.totalEnergy;
};

/**
 * Shamelessly stolen from a discussion with Alex D.
 */
const lcm = (array: number[]) => {
  const n = array.length;
  let a = array[0];
  for (let i = 1; i < n; i++) {
    let b = array[i];
    const c = a;
    while (a && b) {
      a > b ? (a %= b) : (b %= a);
    }
    a = (c * array[i]) / (a + b);
  }
  return a;
};

export const solvePart2 = (input: string[], maxIterations = 5e9) => {
  const sim = new Simulation(input);
  sim.next();

  const results = { x: 0, y: 0, z: 0 };

  DIMENSIONS.forEach(axis => {
    const initial = sim.getAxisState(axis);

    while (true) {
      sim.next();
      results[axis] += 1;
      if (sim.getAxisState(axis) === initial) break;
    }
  });

  return lcm(DIMENSIONS.map(a => results[a]));
};
