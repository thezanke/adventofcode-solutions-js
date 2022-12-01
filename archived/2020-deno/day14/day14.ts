const INST_MATCHER = /mem\[(\d+)\] = (\d+)/;

const dec2bin = (dec: number) => (dec >>> 0).toString(2);

export class Program {
  private mask?: string;
  private memory: { [addr: string]: number } = {};

  constructor (
    private readonly instructions: string[]
  ) {}

  run () {
    this.instructions.forEach(this.processInstruction);

    return -1;
  }

  processInstruction = (instruction: string) => {
    if (instruction.startsWith('mask')) {
      const [, mask] = instruction.split(' = ');
      this.mask = mask;
    } else {
      const match = instruction.match(INST_MATCHER);
      if (match == null) return;
      const [, addr, vStr] = match;
      let v = Number(vStr);

      if (this.mask) {
        const vDec = dec2bin(v).padStart(36, '0').split('');
        for (let i = 0; i < vDec.length; i += 1) {
          const maskChar = this.mask[this.mask.length - 1 - i];
          if (maskChar !== 'X') {
            vDec[vDec.length - 1 - i] = maskChar;
          }
        }
        v = parseInt(vDec.join(''), 2);
      }

      this.memory[addr] = v;
    }
  };

  sumMemory () {
    return Object.values(this.memory).reduce((t, n) => t + n);
  }
}

export class Program2 {
  private mask?: string;
  private memory: { [addr: string]: number } = {};

  constructor (
    private readonly instructions: string[]
  ) {}

  run () {
    this.instructions.forEach(this.processInstruction);

    return -1;
  }

  processInstruction = (instruction: string) => {
    if (instruction.startsWith('mask')) {
      const [, mask] = instruction.split(' = ');
      this.mask = mask;
    } else {
      const match = instruction.match(INST_MATCHER);
      if (match == null) return;
      const [, addrStr, vStr] = match;
      const val = Number(vStr);

      if (!this.mask) {
        this.memory[addrStr] = val;
        return;
      }

      const addrDec = dec2bin(Number(addrStr)).padStart(36, '0').split('');
      for (let i = 0; i < addrDec.length; i += 1) {
        const maskChar = this.mask[this.mask.length - 1 - i];
        if (maskChar === '1') addrDec[addrDec.length - 1 - i] = '1';
      }

      const floaters = Object.entries(this.mask)
        .filter(([, c]) => c === 'X')
        .map(([i, c]) => Number(i));

      this.floatingWrite(floaters, addrDec, val);
    }
  };

  floatingWrite (
    floaters: number[],
    addrDec: string[],
    val: number
  ) {
    if (!this.mask) return;

    const [curr, ...rest] = floaters;
    const addrDecArr = [
      [...addrDec],
      [...addrDec]
    ];

    addrDecArr[0][curr] = '0';
    addrDecArr[1][curr] = '1';

    addrDecArr.forEach((addrDec2) => {
      if (rest.length > 0) {
        this.floatingWrite(rest, addrDec2, val);
        return;
      }

      const addr = parseInt(addrDec2.join(''), 2);
      this.memory[addr] = val;
    });
  }

  sumMemory () {
    return Object.values(this.memory).reduce((t, n) => t + n);
  }
}
