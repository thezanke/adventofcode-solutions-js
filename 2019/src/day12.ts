interface Vector {
  x: number;
  y: number;
  z: number;
}

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
}

const MOON_COORDINATES = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;

const DIMENSIONS: Array<'x' | 'y' | 'z'> = ['x', 'y', 'z'];

const vectorEnergy = (v: Vector) => {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
};

export class Simulation {
  moons: Moon[];
  step = 0;

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
    this.step += 1;
  };

  get totalEnergy() {
    return this.moons.reduce((total, moon) => {
      return total + moon.energy;
    }, 0);
  }
}

export const solvePart1 = (input: string[], length = 1) => {
  const sim = new Simulation(input);
  Array.from({ length }).forEach(sim.next);
  return sim.totalEnergy;
};
