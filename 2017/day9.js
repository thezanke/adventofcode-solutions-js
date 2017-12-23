const initialState = {
  groups: [],
  group: null,
  ignore: false,
};

const readCharacter = (state, char) => {
  if (state.ignore) return { ...state, ignore: false };
  if (char === '!') return { ...state, ignore: true };

  switch (char) {
    case '{':
      if 
      break;
    case '}':
      break;
    case '<':
      break;
    case '>':
      break;
    default:
  }
};

const processStream = (stream, groups = []) =>
  stream.split('').reduce(readCharacter, initialState);

module.exports = { processStream };
