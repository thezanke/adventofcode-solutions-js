import * as path from 'path';
import { readFile } from 'fs-extra';

const INPUT_PATH = path.resolve(__dirname, 'input', 'day1.txt');

export const getInput = async () => {
  const input = await readFile(INPUT_PATH, 'utf8');
  return input.split('\n');
};

export const calculateRequiredFuel = (mass: number) => {
  return Math.floor(mass / 3) - 2;
};

export const day1part1 = async () => {
  const input = await getInput();
  return input.reduce((total: number, mass: string) => {
    return total + calculateRequiredFuel(Number(mass));
  }, 0);
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

export const day1part2 = async () => {
  const input = await getInput();
  return input.reduce((total: number, mass: string) => {
    const initialFuel = calculateRequiredFuel(Number(mass));
    return total + initialFuel + calculateAdditionalFuel(initialFuel);
  }, 0);
};
