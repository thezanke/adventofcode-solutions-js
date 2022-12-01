import * as _ from 'lodash';

enum Color {
  black,
  white,
  transparent,
}

class Layer {
  zeroCount: number;

  constructor (public rows: Color[][]) {
    this.zeroCount = 0;
    rows.forEach(row => {
      this.zeroCount += row.filter(n => n === 0).length;
    });
  }
}

export const getLayers = (input: Color[], width: number, height: number) => {
  const rows = _.chunk(input, width);
  const layers = _.map(_.chunk(rows, height), rows => new Layer(rows));
  return layers;
};

export const solvePart1 = (input: string[], width: number, height: number) => {
  const layers = getLayers(input.map(Number), width, height);
  const layer = _.sortBy(layers, 'zeroCount')[0];
  const digits = _.flatten(layer.rows);
  const ones = digits.filter(n => n === 1).length;
  const twos = digits.filter(n => n === 2).length;
  return ones * twos;
};

export const solvePart2 = (input: string[], width: number, height: number) => {
  const layers = getLayers(input.map(Number), width, height);
  const imageRows = Array.from({ length: height }, (_v, rowIndex) =>
    Array.from({ length: width }, (_v, columnIndex) => {
      return layers
        .map(layer => layer.rows[rowIndex][columnIndex])
        .find(n => n != Color.transparent);
    })
  );
  const image = imageRows
    .map(row => row.map(c => (c === Color.black ? ' ' : '#')).join(''))
    .join('\n');

  return image;
};
