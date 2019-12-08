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

export const getOrbitChain = (start: OrbitMapObject) => {
  let { orbiting } = start;
  if (!orbiting) return [];

  const chain: OrbitMapObject[] = [];

  while (orbiting) {
    chain.push(orbiting);
    ({ orbiting } = orbiting);
  }
  return chain;
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

export const solvePart2 = (input: string[], startId: string, endId: string) => {
  const orbitMap = createOrbitMap(input);

  const start = orbitMap[startId];
  const end = orbitMap[endId];

  if (!start || !end) throw Error('problem with input');

  const startOrbitChain = getOrbitChain(start);
  const endOrbitChain = getOrbitChain(end);

  let pivotObject = startOrbitChain.find(o => endOrbitChain.includes(o));
  if (!pivotObject) return Number.NEGATIVE_INFINITY;

  return startOrbitChain.indexOf(pivotObject) + endOrbitChain.indexOf(pivotObject);
};
