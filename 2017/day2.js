const inputMatrix = input =>
  input.split('\n').map(line => line.split('\t').map(num => parseInt(num, 10)));

exports.calculateChecksum = input =>
  inputMatrix(input)
    .map(line => line.sort((a, b) => a - b))
    .reduce((total, row) => total + row[row.length - 1] - row[0], 0);

exports.calculateAdvancedChecksum = input =>
  inputMatrix(input)
    .map(line => line.sort((a, b) => b - a))
    .reduce((total, line) => {
      let result;

      line.some((num1, i) => {
        const num2 = line.slice(i + 1).find(num2 => num1 % num2 === 0);
        if (!num2) return;
        result = num1 / num2;
        return true;
      });

      return total + result;
    }, 0);
