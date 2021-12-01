export const parseInput = (input: string) => input.split("").map(Number);

const getAnswer = (output: number[]) => {
  let ret = "";
  let pos = (output.indexOf(1) + 1) % output.length;
  while (ret.length < output.length - 1) {
    ret += `${output[pos]}`;
    pos = (pos + 1) % output.length;
  }
  return ret;
};

export const performIterations = (input: number[], count: number) => {
  let output = [...input];
  let max = Math.max(...input);

  let pos = 0;

  const findDestIndex = () => {
    let currVal = output[pos];

    do {
      currVal -= 1;
      if (currVal < 1) currVal = max;
    } while (!output.includes(currVal));

    return output.indexOf(currVal) + 1;
  };

  const iterate = () => {
    let currVal = output[pos];
    const moving = output.splice(pos + 1, 3);
    const displacement = 3 - moving.length;
    if (displacement) {
      moving.push(...output.splice(0, displacement));
      pos -= displacement;
    }
    output.splice(findDestIndex(), 0, ...moving);
    let newValIndex = output.indexOf(currVal);
    if (pos !== newValIndex) {
      output.push(...output.splice(0, newValIndex - pos));
    }
    pos = (pos + (displacement || 1)) % output.length;
  };

  for (let i = 0; i < count; i += 1) iterate();

  return getAnswer(output);
};
