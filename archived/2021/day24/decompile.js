const [a, b, c, d, e, f, g, h, i, j, k, m, n, p] = [
  1, 1, 2, 1, 1, 6, 1, 9, 5, 4, 1, 7, 1, 3
];

// max = 65984919997939
// min = 11211619541713

// d <-> c - 1
// f <-> e + 5
// h <-> g + 8
// i <-> b + 4
// j <-> a + 3
// n <-> m - 6
// p <-> k + 2

let x = 0;
let x2 = 0;
let z = 0;

x = (z % 26) + 12;
x2 = Number(x !== a);
z = z * (25 * x2 + 1) + (a + 7) * x2; // [a]
console.log({ x, x2, z });

x = (z % 26) + 11;
x2 = Number(x !== b);
z = z * (25 * x2 + 1) + (b + 15) * x2; // [a, b]
console.log({ x, x2, z });

x = (z % 26) + 12;
x2 = Number(x !== c);
z = z * (25 * x2 + 1) + (c + 2) * x2; // [a, b, c]
console.log({ x, x2, z });

x = (z % 26) - 3;
x2 = Number(x !== d);
z = Math.floor(z / 26) * (25 * x2 + 1) + (d + 15) * x2; // d <-> c   [a, b]
console.log({ x, x2, z });

x = (z % 26) + 10;
x2 = Number(x !== e);
z = z * (25 * x2 + 1) + (e + 14) * x2; // [a, b, e]
console.log({ x, x2, z });

x = (z % 26) - 9;
x2 = Number(x !== f);
z = Math.floor(z / 26) * (25 * x2 + 1) + (f + 2) * x2; // f <-> e   [a, b]
console.log({ x, x2, z });

x = (z % 26) + 10;
x2 = Number(x !== g);
z = z * (25 * x2 + 1) + (g + 15) * x2; // [a, b, g]
console.log({ x, x2, z });

x = (z % 26) - 7;
x2 = Number(x !== h);
z = Math.floor(z / 26) * (25 * x2 + 1) + (h + 1) * x2; // [a, b] h <-> g
console.log({ x, x2, z });

x = (z % 26) - 11;
x2 = Number(x !== i);
z = Math.floor(z / 26) * (25 * x2 + 1) + (i + 15) * x2; // [a] i <-> b
console.log({ x, x2, z });

x = (z % 26) - 4;
x2 = Number(x !== j);
z = Math.floor(z / 26) * (25 * x2 + 1) + (j + 15) * x2; // [] j <-> a
console.log({ x, x2, z });

x = (z % 26) + 14;
x2 = Number(x !== k);
z = z * (25 * x2 + 1) + (k + 12) * x2; // [k]
console.log({ x, x2, z });

x = (z % 26) + 11;
x2 = Number(x !== m);
z = z * (25 * x2 + 1) + (m + 2) * x2; // [k, m]
console.log({ x, x2, z });

x = (z % 26) - 8;
x2 = Number(x !== n);
z = Math.floor(z / 26) * (25 * x2 + 1) + (n + 14) * x2; // [k]   n <-> m
console.log({ x, x2, z });

x = (z % 26) - 10;
x2 = Number(x !== p);
z = Math.floor(z / 26) * (25 * x2 + 1) + (p + 13) * x2; // [] p <-> k
console.log({ x, x2, z });
