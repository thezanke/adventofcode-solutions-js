let id = 1;

export const createObject = ({ name }) => ({
  id: id++,
  name,
});
