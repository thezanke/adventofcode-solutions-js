/**
 * Shamelessly stolen from a discussion with Alex D.
 */
export const lcm = (array: number[]) => {
  const n = array.length;
  let a = array[0];
  for (let i = 1; i < n; i++) {
    let b = array[i];
    const c = a;
    while (a && b) {
      a > b ? (a %= b) : (b %= a);
    }
    a = (c * array[i]) / (a + b);
  }
  return a;
};
