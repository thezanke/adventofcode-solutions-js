import { lcm } from './utils/lcm';

interface Vector {
  x: number;
  y: number;
  z: number;
}

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

  getAxisState(axis: Axis) {
    return this.pos[axis] * 1000 + this.vel[axis];
  }
}

const MOON_COORDINATES = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;

const vectorEnergy = (v: Vector) => {
  return Object.values(v)
    .map(Math.abs)
    .reduce((t, v) => t + v, 0);
};

export class Simulation {
  moons: Moon[];

  constructor(input: string[]) {
    this.moons = this.parseInput(input);
  }

  get totalEnergy() {
    return this.moons.reduce((total, moon) => {
      return total + moon.energy;
    }, 0);
  }

  parseInput(input: string[]) {
    return input.map(moonStr => {
      const res = MOON_COORDINATES.exec(moonStr);
      if (!res) throw Error('error parsing input');
      const [x, y, z] = res.slice(1, 4).map(Number);
      return new Moon({ x, y, z });
    });
  }

  getAxisState(axis: Axis) {
    return this.moons.map(m => m.getAxisState(axis)).join(',');
  }

  next = () => {
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
  };
}

export const solvePart1 = (input: string[], length = 1) => {
  const sim = new Simulation(input);
  for (let i = 0; i < length; i += 1) {
    sim.next();
  }
  return sim.totalEnergy;
};

export const solvePart2 = (input: string[]) => {
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
