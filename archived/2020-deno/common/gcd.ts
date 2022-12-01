/*
 * Edited version of iterative GCD function from use Yannis on StackOverflow
 * https://stackoverflow.com/a/17445322
 *
 * "You can also use the Euclidean Algorithm to find GCD of more than two numbers.
 * Since GCD is associative, the following operation is valid:  GCD(a,b,c) == GCD(GCD(a,b), c)
 * Calculate the GCD of the first two numbers, then find GCD of the result and the next number.
 *
 * Example: GCD(203,91,77) == GCD(GCD(203,91),77) == GCD(7, 77) == 7
 *
 * You can find GCD of n numbers in the same way."
 *
 * source: https://www.freecodecamp.org/news/how-to-use-the-euclidean-algorithm-to-find-the-greatest-common-divisor-gcd/
*/

export const gcd = (a: number, b: number) => {
  a = Math.abs(a);
  b = Math.abs(b);

  if (b > a) {
    [a, b] = [b, a];
  }

  while (true) {
    if (b == 0) return a;
    a %= b;
    if (a == 0) return b;
    b %= a;
  }
};
