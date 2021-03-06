import { getInput } from './utils/getInput';

export const calculateRequiredFuel = (mass: number) => {
  return Math.floor(mass / 3) - 2;
};

export const calculateAdditionalFuel = (initialFuel: number) => {
  let totalAdditional = 0;
  let nextRequiredAmount = initialFuel;

  while (true) {
    nextRequiredAmount = calculateRequiredFuel(nextRequiredAmount);
    if (nextRequiredAmount < 0) break;
    totalAdditional += nextRequiredAmount;
  }

  return totalAdditional;
};

const inputFuelMapper = (n: string) => calculateRequiredFuel(Number(n));

export const solvePart1 = async () => {
  const input: number[] = await getInput('day1.txt', '\n', inputFuelMapper);
  return input.reduce((total, fuel) => total + fuel, 0);
};

export const solvePart2 = async () => {
  const input: number[] = await getInput('day1.txt', '\n', inputFuelMapper);
  return input.reduce((total, initialFuel) => {
    return total + initialFuel + calculateAdditionalFuel(initialFuel);
  }, 0);
};
