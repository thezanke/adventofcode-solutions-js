import { sortBy, groupBy } from 'lodash';
import { stat } from 'fs';

const ASTEROID = '#';

interface Position {
  x: number;
  y: number;
}

/**
 * Credit to Cyrille Ka on StackOverflow:
 * https://stackoverflow.com/a/328122/2957138
 */
const isBetween = (a: Position, b: Position, c: Position) => {
  const xProduct = (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y);

  if (Math.abs(xProduct) !== 0) return false;

  const dotProduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y) * (b.y - a.y);
  if (dotProduct < 0) return false;

  const squaredLength = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
  if (dotProduct > squaredLength) return false;

  return true;
};

class Asteroid implements Position {
  detected = 0;

  // prettier-ignore
  constructor(
    public x: number,
    public y: number
  ) {}

  detectAsteroids(asteroids: Asteroid[]) {
    asteroids.forEach(a1 => {
      if (a1 === this) return;

      const blocker = asteroids.some(a2 => {
        if (a2 === this || a2 === a1) return false;
        return isBetween(this, a1, a2);
      });

      if (!blocker) this.detected += 1;
    });
  }

  get coordinates() {
    return `${this.x},${this.y}`;
  }
}

export const asteroidsFromInput = (input: string[]) => {
  const asteroids: Asteroid[] = [];

  return input.reduce((asteroids, r, y) => {
    return r.split('').reduce((asteroids, c, x) => {
      if (c === ASTEROID) asteroids.push(new Asteroid(x, y));
      return asteroids;
    }, asteroids);
  }, asteroids);
};

export const findBestStationAsteroid = (asteroids: Asteroid[]) => {
  const bestLocation = asteroids.reduce<Asteroid | undefined>(
    (best, asteroid) => {
      if (!asteroid) return best;
      asteroid.detectAsteroids(asteroids);
      if (!best) return asteroid;
      if (asteroid.detected > best.detected) return asteroid;
      return best;
    },
    undefined
  );

  if (!bestLocation) {
    throw Error('impossible');
  }

  return bestLocation;
};

export const solvePart1 = (input: string[]) => {
  const asteroids = asteroidsFromInput(input);
  const bestLocation = findBestStationAsteroid(asteroids);
  return bestLocation.detected;
};

/**
 * PART 2
 */
class Target implements Position {
  x: number;
  y: number;
  distance: number;
  angle: number;

  constructor(asteroid: Asteroid, homeAsteroid: Asteroid) {
    this.x = asteroid.x;
    this.y = asteroid.y;
    this.distance = this.getDistanceFrom(homeAsteroid);
    this.angle = this.getAngleFrom(homeAsteroid);
  }

  getDistanceFrom(p: Position) {
    const x0 = p.x;
    const y0 = p.y;
    const x1 = this.x;
    const y1 = this.y;
    return Math.abs(x1 - x0) + Math.abs(y1 - y0);
  }

  getAngleFrom(p: Position) {
    const { x: cx, y: cy } = this;
    const { x: ex, y: ey } = p;

    const dy = ey - cy;
    const dx = ex - cx;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0) theta = 360 + theta;
    return theta;
  }
}

class Station {
  targets: Target[];
  destroyedTargets: Target[] = [];

  constructor(public homeAsteroid: Asteroid, asteroids: Asteroid[]) {
    this.targets = this.identifyTargets(asteroids);
  }

  identifyTargets(asteroids: Asteroid[]) {
    return sortBy(
      asteroids
        .filter(a => a !== this.homeAsteroid)
        .map(a => new Target(a, this.homeAsteroid)),
      ['angle', 'distance']
    );
  }

  destroyTarget(target: Target) {
    this.destroyedTargets.push(target);
    this.targets.splice(this.targets.indexOf(target), 1);
  }

  findNextTarget(i: number) {
    const { lastDestroyed } = this;
    let nextTarget = this.targets.find(t => {
      if (i === 0) return t.angle >= 90;
      return t.angle > lastDestroyed.angle;
    });

    // edge case for rolling over to 0º
    if (!nextTarget) nextTarget = this.targets.find(t => t.angle >= 0);

    return nextTarget;
  }

  fireLasers(stopCondition: (iteration: number) => boolean) {
    let i = 0;

    while (!stopCondition(i)) {
      const target = this.findNextTarget(i);
      if (target) this.destroyTarget(target);
      i += 1;
    }
  }

  get lastDestroyed() {
    return this.destroyedTargets[this.destroyedTargets.length - 1];
  }
}

export const solvePart2 = (input: string[], location?: Position) => {
  const asteroids = asteroidsFromInput(input);
  let homeAsteroid;

  if (location) {
    homeAsteroid = asteroids.find(
      a => a.x === location.x && a.y === location.y
    );
  }

  if (!homeAsteroid) homeAsteroid = findBestStationAsteroid(asteroids);

  const station = new Station(homeAsteroid, asteroids);

  station.fireLasers(() => {
    const destroyedCount = station.destroyedTargets.length;
    const targetCount = station.targets.length;
    return targetCount === 0 || destroyedCount === 200;
  });

  const { x, y } = station.lastDestroyed;
  return x * 100 + y;
};
