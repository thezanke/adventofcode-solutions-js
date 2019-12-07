// tslint:disable no-any
/**
 * Credit to https://xaviergeerinck.com/solve-permutation-heaps
 * all I did was add types and a calling function with a result array.
 */
export const permute = (input: any[]) => {
  const result: any[][] = [];

  function swap(arr: any[], idxA: number, idxB: number) {
    const tmp = arr[idxA];
    arr[idxA] = arr[idxB];
    arr[idxB] = tmp;
  }

  function generate(n: number, arr: any[]) {
    if (n === 1) {
      result.push(arr.slice());
      return;
    }

    for (let i = 0; i < n; i += 1) {
      generate(n - 1, arr);

      if (n % 2 === 0) {
        swap(arr, i, n - 1);
      } else {
        swap(arr, 0, n - 1);
      }
    }
  }

  generate(input.length, input);

  return result;
};
