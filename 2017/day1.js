const sum = (a, b) => a + b;

exports.solveCaptcha = input => {
  const arr = input.split('').map(num => parseInt(num, 10));

  return arr
    .filter((num, i) => num === arr[i < arr.length - 1 ? i + 1 : 0])
    .reduce(sum, 0);
};

exports.solveAdvancedCaptcha = input => {
  const arr = input.split('').map(num => parseInt(num, 10));
  const doubleArr = [...arr, ...arr];

  return arr
    .filter((num, i) => num === doubleArr[i + input.length / 2])
    .reduce(sum, 0);
};
