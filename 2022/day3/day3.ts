import _ from 'lodash';

const chars = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const calcTotal = (charArrArr: string[][][]): number => charArrArr.reduce((t: number, charArr) => {
  const subTotal: number = _.intersection(...charArr).reduce((st: number, char: string) => st + chars.indexOf(char), 0);
  return t + subTotal;
}, 0);

export const part1 = (input: string): number => {
  const sacks = input.split('\n').map(s => [s.slice(0, s.length / 2).split(''), s.slice(s.length / 2).split('')]);
  return calcTotal(sacks);
};

export const part2 = (input: string) => {
  const chunks = _.chunk(input.split('\n').map(c => c.split('')), 3);
  return calcTotal(chunks);
};
