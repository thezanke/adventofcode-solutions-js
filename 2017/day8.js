const createRegisters = instructions =>
  instructions.map(i => i[0]).reduce(
    (reg, key) => ({
      ...reg,
      [key]: 0
    }),
    {}
  );

const TESTS = {
  '<': (a, b) => a < b,
  '>': (a, b) => a > b,
  '<=': (a, b) => a <= b,
  '>=': (a, b) => a >= b,
  '==': (a, b) => a == b,
  '!=': (a, b) => a != b
};

const processInstruction = (
  registers,
  [key, mutation, amntStr, _, testKey, test, testValue]
) => {
  if (TESTS[test](registers[testKey], testValue)) {
    const amnt = parseInt(amntStr, 10);
    return {
      ...registers,
      [key]: registers[key] + (mutation === 'inc' ? amnt : -1 * amnt)
    };
  }

  return registers;
};

const processWithHistory = ({ history, registers }, instruction) => {
  const newRegisters = processInstruction(registers, instruction);

  history.push(newRegisters);

  return { history, registers: newRegisters };
};

const processInstructions = (instructionsText, history = false) => {
  const instructions = instructionsText
    .split('\n')
    .map(line => line.split(' '));

  const initialRegisters = createRegisters(instructions);

  if (history) {
    return instructions.reduce(processWithHistory, {
      history: [],
      registers: initialRegisters
    });
  }

  return instructions.reduce(processInstruction, initialRegisters);
};

const findLargestValue = register => Math.max(...Object.values(register));

module.exports = { processInstructions, findLargestValue };
