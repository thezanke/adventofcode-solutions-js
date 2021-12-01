enum Op {
  noop = "nop",
  accumulate = "acc",
  jump = "jmp",
}

interface Instruction {
  op: Op;
  arg: number;
  completed?: boolean;
}

export const parseBootCode = (instructions: string[]) => {
  return instructions.map((i) => {
    const [op, argStr] = i.split(" ");
    const arg = Number(argStr);
    return { op, arg } as Instruction;
  });
};

export class GameConsole {
  private curr = 0;
  public accumulator = 0;
  public error = false;

  constructor(private bootInstructions: Instruction[]) {}

  boot() {
    while (true) {
      const inst = this.bootInstructions[this.curr];

      if (inst.completed) {
        this.error = true;
        break;
      }

      switch (inst.op) {
        case Op.noop: {
          this.curr += 1;
          break;
        }
        case Op.accumulate: {
          this.accumulator += inst.arg;
          this.curr += 1;
          break;
        }
        case Op.jump: {
          this.curr += inst.arg;
          break;
        }
      }

      inst.completed = true;

      if (this.curr === this.bootInstructions.length) return;
    }
  }
}

const SWITCH_OPS = [Op.noop, Op.jump];

const switchInstruction = (inst: Instruction) => {
  const newOp = inst.op === Op.noop ? Op.jump : Op.noop;
  return { ...inst, op: newOp };
};

export const findWorkingConsole = (instructions: Instruction[]) => {
  const possibles = instructions.filter((i) => SWITCH_OPS.includes(i.op));
  return possibles.map((instruction) => {
    const tweakedInstructions = instructions.map((i) => ({ ...i }));
    const switched = switchInstruction(instruction);
    tweakedInstructions[instructions.indexOf(instruction)] = switched;

    const gc = new GameConsole(tweakedInstructions);
    gc.boot();
    return gc;
  }).find((gc) => !gc.error);
};
