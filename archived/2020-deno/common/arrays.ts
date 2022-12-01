export { permute } from '../../2019/src/utils/permute.ts';

// deno-lint-ignore no-explicit-any
export const intersection = (arr1: any[], arr2: any[]) => {
  return arr1.filter((v) => arr2.includes(v));
};
