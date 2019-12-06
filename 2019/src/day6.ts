export interface OrbitMapObject {
  id: string;
  orbiting?: OrbitMapObject;
}

interface OrbitMap {
  [key: string]: OrbitMapObject;
}

const inputMapper = (line: string) => {
  return line.split(')');
};

export const createOrbitMap = (input: string[]): OrbitMap => {
  return input.reduce<OrbitMap>((map, inputLine) => {
    const [orbitingId, currentId] = inputLine.split(')');

    const orbiting = map[orbitingId] || { id: orbitingId };
    if (!map[orbitingId]) map[orbitingId] = orbiting;

    const currentObject = map[currentId] || { id: currentId };
    if (!map[currentId]) map[currentId] = currentObject;

    Object.assign(currentObject, { orbiting });

    return map;
  }, {});
};

export const countTotalOrbits = (orbitMap: OrbitMap): number => {
  return Object.values(orbitMap).reduce((total, mapObject) => {
    let localOrbits = 0;
    let { orbiting } = mapObject;

    while (orbiting) {
      localOrbits += 1;
      ({ orbiting } = orbiting);
    }

    return total + localOrbits;
  }, 0);
};

const getSatellites = (target: OrbitMapObject, orbitMap: OrbitMap) => {
  return Object.values(orbitMap).filter(obj => obj.orbiting === target);
};

export const isOrbitedBy = (
  object1: OrbitMapObject,
  object2: OrbitMapObject
) => {
  let { orbiting } = object2;

  while (orbiting) {
    if (orbiting === object1) return true;
    ({ orbiting } = orbiting);
  }

  return false;
};

export const solvePart1 = (input: string[]) => {
  return countTotalOrbits(createOrbitMap(input));
};

export const solvePart2 = (input: string[]) => {
  const orbitMap = createOrbitMap(input);
  const { YOU, SAN } = orbitMap;

  if (!YOU.orbiting || !SAN.orbiting) throw Error('problem with input');

  const { orbiting: start } = YOU;
  const { orbiting: destination } = SAN;

  let { orbiting } = start;
  let pivotObject: OrbitMapObject | undefined;
  let total = 0;

  while (orbiting && !pivotObject) {
    total += 1;

    if (isOrbitedBy(orbiting, destination)) {
      pivotObject = orbiting;
    } else {
      ({ orbiting } = orbiting);
    }
  }

  orbiting = destination;

  while (orbiting && orbiting !== pivotObject) {
    total += 1;
    ({ orbiting } = orbiting);
  }

  return total;
};
