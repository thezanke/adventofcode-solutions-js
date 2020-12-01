export const calculateFuelRequiredForMass = (mass: number) => {
  return Math.floor(mass / 3) - 2;
};

export const calculateTotalFuelRequired = (
  massArr: number[],
  calculateFn = calculateFuelRequiredForMass,
) => {
  return massArr.reduce((total, mass) => total + calculateFn(mass), 0);
};

export const calculateFuelRequiredForMassAndFuel = (mass: number) => {
  let total = 0;
  let fuelRequired = calculateFuelRequiredForMass(mass);
  while (fuelRequired > 0) {
    total += fuelRequired;
    fuelRequired = calculateFuelRequiredForMass(fuelRequired);
  }
  return total;
};
