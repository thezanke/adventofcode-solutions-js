export const part1 = (arr) => {
  let last;

  return arr.reduce((total, num) => {
    if (last && num > last) total += 1;
    last = num;

    return total;
  }, 0);
};

export const part2 = (arr) => {
  let totals = [];

  arr.forEach((curr, index) => {
    let [prev, last] = [arr[index - 1], arr[index + 1]];

    if (!prev || !last) return;

    totals.push(prev + curr + last);
  });

  return part1(totals);
};
