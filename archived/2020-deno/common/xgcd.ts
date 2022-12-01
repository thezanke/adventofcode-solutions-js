/*
* Stolen from https://www.w3resource.com/javascript-exercises/javascript-math-exercise-47.php after
* trying my hardest to write it myself
*/

export function xgcd (a: number, b: number) {
  a = +a;
  b = +b;
  if (a !== a || b !== b) {
    return [NaN, NaN, NaN];
  }

  if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
    return [Infinity, Infinity, Infinity];
  }

  // Checks if a or b are decimals
  if ((a % 1 !== 0) || (b % 1 !== 0)) {
    return false;
  }

  const signX = (a < 0) ? -1 : 1;
  const signY = (b < 0) ? -1 : 1;
  let x = 0;
  let y = 1;
  let u = 1;
  let v = 0;
  let q;
  let r;
  let m;
  let n;
  a = Math.abs(a);
  b = Math.abs(b);

  while (a !== 0) {
    q = Math.floor(b / a);
    r = b % a;
    m = x - u * q;
    n = y - v * q;
    b = a;
    a = r;
    x = u;
    y = v;
    u = m;
    v = n;
  }

  return [b, signX * x, signY * y];
}
