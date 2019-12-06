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

export const solvePart1 = (input: string[]) => {
  return countTotalOrbits(createOrbitMap(input));
};

export const solvePart2 = (input: string[]) => {
  return 0;
};
