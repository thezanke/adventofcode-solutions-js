export const transformInput = (directions) => {
  return directions.map((d) => {
    const [direction, distance] = d;
    return [direction, parseInt(distance, 10)];
  });
};
