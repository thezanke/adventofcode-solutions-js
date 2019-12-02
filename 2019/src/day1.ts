import { getInput } from './utils/getInput';

export const calculateRequiredFuel = (mass: number) => {
  return Math.floor(mass / 3) - 2;
};

export const calculateAdditionalFuel = (initialFuel: number) => {
  let nextRequiredAmount = calculateRequiredFuel(initialFuel);
  let totalAdditional = nextRequiredAmount;

  while (nextRequiredAmount > 0) {
    nextRequiredAmount = calculateRequiredFuel(nextRequiredAmount);
    if (nextRequiredAmount > 0) totalAdditional += nextRequiredAmount;
  }

  return totalAdditional;
};

export const solvePart1 = async () => {
  const input = await getInput('day1.txt', n =>
    calculateRequiredFuel(Number(n))
  );

  return input.reduce<number>((total, fuel) => total + fuel, 0);
};

export const solvePart2 = async () => {
  const input = await getInput('day1.txt');
  return input.reduce<number>((total, mass) => {
    const initialFuel = calculateRequiredFuel(Number(mass));
    return total + initialFuel + calculateAdditionalFuel(initialFuel);
  }, 0);
};
