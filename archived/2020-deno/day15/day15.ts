const createMemory = (input: number[]) => {
  const memory: { [key: string]: number } = {};

  input.forEach((num, i) => {
    memory[num] = i;
  });

  return memory;
};

export const findValueInSequence = (start: number[], position: number) => {
  const mem = createMemory(start.slice(0, start.length - 1));
  let last = start[start.length - 1];

  console.log(last);

  for (let i = start.length - 1; i < position - 1; i += 1) {
    let curr = 0;
    if (mem[last] !== undefined) curr = i - mem[last];
    // console.log(last, curr);
    mem[last] = i;
    last = curr;
    console.log(i + 1);
  }

  return last;
};
