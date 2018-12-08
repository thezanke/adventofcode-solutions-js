const nextPos = (pos, stepSize, bufferLength) => {
  const m = (pos + stepSize) % bufferLength;
  return 1 + (m < 0 ? m + bufferLength : m);
};

class Spinlock {
  constructor(stepSize) {
    this.stepSize = stepSize;
    this.buffer = [0];
    this.pos = 0;
  }

  next() {
    const lastValue = this.buffer[this.pos];
    this.pos = nextPos(this.pos, this.stepSize, this.buffer.length);
    this.buffer.splice(this.pos, 0, lastValue + 1);
  }
}

const findSolution = (stepSize, insertions) => {
  let bufferLen = 1;
  let pos = 0;
  let solution = null;

  for (let i = 0; i <= insertions; i += 1) {
    pos = nextPos(pos, stepSize, bufferLen);
    bufferLen += 1;
    if (pos === 1) solution = i + 1;
  }

  return solution;
}

module.exports = { Spinlock, nextPos, findSolution };
