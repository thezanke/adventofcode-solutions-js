// deno-lint-ignore-file no-explicit-any
const DEFAULT_RESOLVER = (args: any[]) => args.join('_');

export const memoize = (
  fn: (...args: any[]) => any,
  keyResolver = DEFAULT_RESOLVER
) => {
  const memo: { [key: string]: any } = {};
  return (...args: any[]) => {
    const memoKey = keyResolver(args);
    if (memo[memoKey]) {
      return memo[memoKey];
    }
    const value = fn(...args);
    memo[memoKey] = value;
    return value;
  };
};
