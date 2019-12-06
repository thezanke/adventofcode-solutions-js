export interface OrbitMapObject {
  id: string;
  orbiting?: OrbitMapObject;
}

interface OrbitMap {
  [key: string]: OrbitMapObject;
}

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
  const orbitMap = createOrbitMap(input);

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

export const solvePart2 = (input: string[]) => {
  const orbitMap = createOrbitMap(input);
  const { orbiting: start } = orbitMap.YOU;
  const { orbiting: destination } = orbitMap.SAN;

  if (!start || !destination) throw Error('problem with input');

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

  ({ orbiting } = destination);

  while (orbiting) {
    total += 1;
    if (orbiting === pivotObject) return total;
    ({ orbiting } = orbiting);
  }

  throw Error("couldn't reach pivot object");
};
