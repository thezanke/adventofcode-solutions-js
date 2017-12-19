// @flow
const PROGRAM_TEST = /^([a-z]+) \((\d+)\)(?: -> ((?:[a-z]+(?:, )?)+))?/;

const processRow = (row: string): { name: string, weight: number, children: string[] } => {
  const [_, name, weightStr, childrenStr] = PROGRAM_TEST.exec(row);
  const weight = parseInt(weightStr, 10);
  const children = childrenStr && childrenStr.split(', ');
  return { name, weight, children };
};

const sumBranch = branch => {
  let total = branch.weight;
  if (children) {
    
  }
}

const buildTree = (_input: string[]) => {
  const input = _input.map(processRow);
  const allChildren = [].concat(...input.map(r => r.children).filter(Boolean));
  const hash = input.reduce((obj, row) => {
    obj[row.name] = row;
    return obj;
  }, {});

  input.forEach(row => {
    if (row.children) {
      hash[row.name].children = row.children.map(childName => hash[childName]);
    }
  });

  const root = input.find(r => !allChildren.includes(r.name));

  return root;
};

module.exports = { buildTree };
