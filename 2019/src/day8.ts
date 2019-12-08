import * as _ from 'lodash';

class Layer {
  zeroCount: number;
  constructor(public rows: number[][]) {
    this.zeroCount = 0;
    rows.forEach(row => {
      this.zeroCount += row.filter(n => n === 0).length;
    });
  }
}

export const getLayers = (input: number[], width: number, height: number) => {
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
