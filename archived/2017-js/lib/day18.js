const DEBUG = false;

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

const DEFAULT_COMMANDS = {
  snd (state, key, value) {
    const keyVal = state.dict[key];
    if (DEBUG) console.log(`play a sound w/ freq. ${keyVal}`);
    return { ...state, last: keyVal };
  },
  set (state, key, value) {
    const keyVal = state.dict[key];
    if (DEBUG) console.log(`set register ${key} to ${value}`);
    return { ...state, dict: { ...state.dict, [key]: value } };
  },
  add (state, key, value) {
    const keyVal = state.dict[key];
    if (DEBUG) console.log(`add ${value} to register ${key}`);
    return { ...state, dict: { ...state.dict, [key]: keyVal + value } };
  },
  mul (state, key, value) {
    const keyVal = state.dict[key];
    if (DEBUG) console.log(`multiply register ${key} by ${value} (${keyVal} x ${value})`);
    return { ...state, dict: { ...state.dict, [key]: keyVal * value } };
  },
  mod (state, key, value) {
    const keyVal = state.dict[key];
    if (DEBUG) console.log(`modulate register ${key} by ${value} (${keyVal} % ${value})`);
    return { ...state, dict: { ...state.dict, [key]: keyVal % value } };
  },
  rcv (state, key, value) {
    const keyVal = state.dict[key];
    if (keyVal !== 0) {
      if (DEBUG) console.log(`recover last played value of ${state.last}`);
      return { ...state, recovered: state.last };
    }
    return state;
  },
  jgz (state, key, value) {
    const keyVal = state.dict[key];
    if (keyVal > 0) {
      if (DEBUG) console.log(`jump to position ${state.pos + value}`);
      return { ...state, pos: state.pos + value - 1 };
    }
    return state;
  }
};

const processInstruction = (state, { cmd, key, valueStr }, commands = DEFAULT_COMMANDS) => {
  if (!commands[cmd]) throw Error(`command "${cmd}" not found`);

  const value = valueStr && (isNaN(valueStr) ? state.dict[valueStr] : parseInt(valueStr, 10));
  return commands[cmd](state, key, value);
};

const createProgram = instText => {
  const instructions = parseInstructions(instText);
  if (!instructions.length) throw Error('Program has no instructions');

  let state = createState();

  return {
    getState: () => state,
    next: () => {
      state = processInstruction(state, instructions[state.pos]);
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
