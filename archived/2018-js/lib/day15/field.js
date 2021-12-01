module.exports = initialState => {
  const field = initialState
    .split('\n')
    .map((row, y) => row.split('').map((entity, x) => (UNITS.includes(entity) ? OPEN : entity)));

  return field;
};
