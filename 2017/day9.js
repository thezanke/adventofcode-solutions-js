const initialState = {
  nodes: {},
  stack: [],
  ignoring: false
};

const createGarbage = (id, parentNode) => ({
  id,
  parentNode,
  type: 'garbage',
  contents: ''
});

const createGroup = (id, parentNode) => ({
  id,
  parentNode,
  type: 'group',
  children: [],
  score: parentNode ? parentNode.score + 1 : 1
});

const createNode = (() => {
  let nextId = 1;

  return (type, parentNode = null) => {
    let node;

    if (type === 'garbage') {
      node = createGarbage(nextId++, parentNode);
    } else if (type === 'group') {
      node = createGroup(nextId++, parentNode);
    } else {
      throw Error('invalid node type');
    }

    if (parentNode && parentNode.children) parentNode.children.push(node);

    return node;
  };
})();

const readCharacter = (state, char, i) => {
  if (state.ignoring) return { ...state, ignoring: false };
  if (char === '!') return { ...state, ignoring: true };

  const currentNode = state.stack.length ? state.stack[0] : null;

  if (currentNode) {
    if (currentNode.type === 'garbage' && char !== '>') {
      currentNode.contents += char;
      return state;
    }
    if (['}', '>'].includes(char)) return { ...state, stack: state.stack.slice(1) };
    if (char === ',') return state;
  }

  if (['<', '{'].includes(char)) {
    const newNode = createNode(char === '<' ? 'garbage' : 'group', currentNode);
    const nodes = { ...state.nodes, [newNode.id]: newNode };
    const stack = [newNode, ...state.stack];

    return { ...state, nodes, stack };
  }

  throw Error('syntax error at position ' + i);
};

const processStream = (stream, groups = []) => stream.split('').reduce(readCharacter, initialState);

const countGroups = ({ nodes }) => Object.values(nodes).filter(n => n.type === 'group').length;

const calculateTotal = ({ nodes }) =>
  Object.values(nodes)
    .filter(n => n.type === 'group')
    .map(n => n.score)
    .reduce((a, b) => a + b, 0);

const countGarbage = ({ nodes }) =>
  Object.values(nodes)
    .filter(n => n.type === 'garbage')
    .map(n => n.contents.length)
    .reduce((a, b) => a + b, 0);

module.exports = { processStream, calculateTotal, countGroups, countGarbage };
