const findMostCommonInPosition = (input, pos) => {
  const bits = input.map((n) => n[pos]);
  const filtered = bits.filter((b) => b === '1');
  const isOne = filtered.length >= input.length / 2;

  return isOne ? '1' : '0';
};

const findGamma = (input) => {
  const bitLen = input[0].length;
  let out = '';

  for (let i = 0; i < bitLen; i += 1) {
    out += findMostCommonInPosition(input, i);
  }

  return out;
};

const invertBinaryString = (input) => {
  let out = '';

  for (const c of input) {
    out += c === '0' ? '1' : '0';
  }

  return out;
};

export const part1 = (input) => {
  const gamma = findGamma(input);
  const ep = invertBinaryString(gamma);

  return parseInt(gamma, 2) * parseInt(ep, 2);
};

export const part2 = (input) => {
  const bitLen = input[0].length;

  let oxy = input;
  let co2 = input;

  for (let i = 0; i < bitLen; i += 1) {
    if (oxy.length > 1) {
      oxy = oxy.filter((l) => l[i] === findMostCommonInPosition(oxy, i));
    }

    if (co2.length > 1) {
      co2 = co2.filter((l) => l[i] !== findMostCommonInPosition(co2, i));
    }

    if (oxy.length === 1 && co2.length === 1) {
      return parseInt(oxy[0], 2) * parseInt(co2[0], 2);
    }
  }
};
