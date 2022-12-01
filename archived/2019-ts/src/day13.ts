import { flatten } from 'lodash';
import { runProgram, Program } from './runProgram';

enum TileType {
  empty,
  wall,
  block,
  paddle,
  ball,
}

enum TileChar {
  ' ',
  'X',
  '#',
  '=',
  '*',
}

export enum JoyPos {
  neutral = 0,
  right = 1,
  left = -1,
}

export class Arcade {
  tiles: number[][] = [];
  score = 0;
  program: Program;
  private readonly nextTile: number[] = [];
  constructor (
    public initalMemory: number[],
    quarters?: number,
    private readonly renderOnUpdate = false
  ) {
    let overrides;
    if (quarters) overrides = { 0: quarters };
    this.program = runProgram(
      initalMemory,
      overrides,
      undefined,
      this.handleOutput
    );
  }

  setTile (x: number, y: number, typeId: number) {
    if (!this.tiles[y]) this.tiles[y] = [];
    this.tiles[y][x] = typeId;
  }

  handleOutput = (output: number) => {
    if (this.nextTile.length < 2) {
      this.nextTile.push(output);
      return;
    }

    const [x, y] = this.nextTile.splice(0, 2);
    if (x === -1 && y === 0) {
      this.score = output;
    } else {
      this.setTile(x, y, output);
    }

    if (this.renderOnUpdate) {
      this.render();
    }
  };

  render () {
    console.clear();
    console.log(
      this.tiles.map(row => row.map(id => TileChar[id]).join('')).join('\n'),
      this.score
    );
  }

  takeInput (input: number) {
    if (this.program.waiting) {
      this.program.input(input);
    }
  }

  run () {
    const i = setInterval(() => {
      if (this.program.exited) {
        clearInterval(i);
        return;
      }

      if (!this.program.waiting) {
        this.program.run();
      }
    }, 66);
  }
}

export const solvePart1 = (initalMemory: number[]) => {
  const arcade = new Arcade(initalMemory);
  return flatten(arcade.tiles).filter(id => id === TileType.block).length;
};

export const solvePart2 = (initalMemory: number[]) => {
  const arcade = new Arcade(initalMemory, 2, true);
  arcade.run();
  return flatten(arcade.tiles).filter(id => id === TileType.block).length;
};
