// tslint:disable no-any
/**
 * Credit to https://xaviergeerinck.com/solve-permutation-heaps.
 * All I did was add types and a calling function with a result array.
 *
 * Heaps algorithm is an algorithm that computes every single permutation of a given set of elements.
 * The algorithm is basically going to swap elements based on the iteration k we are in for the current size n.
 * If this iteration k is even then we will swap the kth element with the last element,and else we will
 * swap the last element with the first element.
 *
 * Example input: [1, 2, 3]
 * Output: [
 *   [2, 3, 1], [3, 2, 1], [1, 2, 3], [2, 1, 3],
 *   [3, 1, 2], [1, 3, 2], [2, 3, 1], [3, 2, 1]
 * ]
 */
export const permute = (input: any[]) => {
  const result: any[][] = [];

  function swap (arr: any[], idxA: number, idxB: number) {
    const tmp = arr[idxA];
    arr[idxA] = arr[idxB];
    arr[idxB] = tmp;
  }

  function generate (n: number, arr: any[]) {
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
