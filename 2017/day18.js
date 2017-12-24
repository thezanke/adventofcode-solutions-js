const parseInstructions = instText =>
  instText
    .split('\n')
    .filter(line => !!line.length)
    .map(instLine => {
      const [cmd, key, valueStr = null] = instLine.split(' ');
      const instruction = { cmd, key };
      if (valueStr !== null) instruction.valueStr = valueStr;
      return instruction;
    });

const createState = () => ({
  pos: 0,
  recovered: null,
  last: null,
  dict: {}
});

const processInstruction = (state, { cmd, key, valueStr }, debug = false) => {
  let value = valueStr && (isNaN(valueStr) ? state.dict[valueStr] : parseInt(valueStr, 10));
  let keyVal = state.dict[key];

  switch (cmd) {
    case 'snd':
      if (debug) console.log(`play a sound w/ freq. ${keyVal}`);
      return { ...state, last: keyVal };
    case 'set':
      if (debug) console.log(`set register ${key} to ${value}`);
      return { ...state, dict: { ...state.dict, [key]: value } };
    case 'add':
      if (debug) console.log(`add ${value} to register ${key}`);
      return { ...state, dict: { ...state.dict, [key]: keyVal + value } };
    case 'mul':
      if (debug) console.log(`multiply register ${key} by ${value} (${keyVal} x ${value})`);
      return { ...state, dict: { ...state.dict, [key]: keyVal * value } };
    case 'mod':
      if (debug) console.log(`modulate register ${key} by ${value} (${keyVal} % ${value})`);
      return { ...state, dict: { ...state.dict, [key]: keyVal % value } };
    case 'rcv':
      if (keyVal !== 0) {
        if (debug) console.log(`recover last played value of ${state.last}`);
        return { ...state, recovered: state.last };
      }
      return state;
    case 'jgz':
      if (keyVal > 0) {
        if (debug) console.log(`jump to position ${state.pos + value}`);
        return { ...state, pos: state.pos + value - 1 };
      }
      return state;
    default:
      return state;
  }
};

const createProgram = (instText, debug = false) => {
  const instructions = parseInstructions(instText);
  console.log(instructions);
  if (!instructions.length) throw Error('Program has no instructions');

  let state = createState();

  return {
    getState: () => state,
    next: () => {
      state = processInstruction(state, instructions[state.pos], debug);
      state.pos += 1;
      return state.pos === instructions.length;
    }
  };
};

const findFirstRecovered = program => {
  let state = program.getState();

  do {
    program.next();
    state = program.getState();
    // console.log(state);
  } while (!state.recovered);

  return state.recovered;
};

module.exports = { createProgram, findFirstRecovered };
