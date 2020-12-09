const findAddends = (
  sum: number,
  numbers: number[],
): [number, number] | null => {
  let a: number | undefined;
  let b = numbers.find((n) => {
    a = numbers.find((n2) => sum - n === n2);
    if (a) return true;
  });

  if (a && b) return [a, b];

  return null;
};

export const findXmasError = (numbers: number[], groupSize: number) => {
  return numbers.find((num, i) => {
    if (i >= groupSize) {
      const last = numbers.slice(i - groupSize, i);
      const results = findAddends(num, last);
      return !results;
    }

    return false;
  });
};

const sumRange = (range: number[]) => {
  return range.reduce((a: number, b: number) => a + b);
};

export const findEncryptionWeakness = (numbers: number[], vuln: number) => {
  const maskedNumbers = numbers.map((n) => n >= vuln - 1 ? null : n);

  for (let i = 0; i < maskedNumbers.length; i += 1) {
    const a = maskedNumbers[i];

    if (!a) continue;

    for (let j = i + 1; j < maskedNumbers.length; j += 1) {
      const b = maskedNumbers[j];
      if (!b) break;
      let range = maskedNumbers.slice(i, j + 1);
      if (range.includes(null)) throw new Error("null in range");
      if (sumRange(range as number[]) === vuln) {
        const min = Math.min(...range as number[]);
        const max = Math.max(...range as number[]);
        return min + max;
      }
    }
  }
};
