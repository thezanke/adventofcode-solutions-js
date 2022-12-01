import { sortBy, groupBy } from 'lodash';
import { Program, runProgram } from './runProgram';
import { posix } from 'path';

enum Direction {
  left,
  right,
  up,
  down,
}

enum Color {
  black,
  white,
  transparent,
}

class Panel {
  painted = false;
  constructor (public x: number, public y: number, public color = Color.black) {}
}

enum Mode {
  paint,
  turn,
}

class Robot {
  program: Program;
  private x = 0;
  private y = 0;
  private heading = Direction.up;
  private mode = Mode.paint;

  constructor (initialMemory: number[] = [], private readonly panels: Panel[] = []) {
    this.program = runProgram(
      initialMemory,
      undefined,
      undefined,
      this.processOutput.bind(this)
    );
  }

  getCurrentPanel () {
    let panel = this.panels.find(p => p.x === this.x && p.y === this.y);
    if (panel == null) {
      panel = new Panel(this.x, this.y);
      this.panels.push(panel);
    }
    return panel;
  }

  turnLeft () {
    switch (this.heading) {
      case Direction.up:
        this.heading = Direction.left;
        break;
      case Direction.left:
        this.heading = Direction.down;
        break;
      case Direction.down:
        this.heading = Direction.right;
        break;
      case Direction.right:
        this.heading = Direction.up;
        break;
      default:
    }
  }

  turnRight () {
    switch (this.heading) {
      case Direction.up:
        this.heading = Direction.right;
        break;
      case Direction.right:
        this.heading = Direction.down;
        break;
      case Direction.down:
        this.heading = Direction.left;
        break;
      case Direction.left:
        this.heading = Direction.up;
        break;
      default:
    }
  }

  toggleMode () {
    this.mode = Math.abs(this.mode - 1);
  }

  move () {
    switch (this.heading) {
      case Direction.up:
        this.y -= 1;
        break;
      case Direction.right:
        this.x += 1;
        break;
      case Direction.down:
        this.y += 1;
        break;
      case Direction.left:
        this.x -= 1;
        break;
      default:
    }
  }

  processOutput (output: number) {
    const currentPanel = this.getCurrentPanel();

    switch (this.mode) {
      case Mode.paint:
        currentPanel.color = output;
        if (!currentPanel.painted) {
          currentPanel.painted = true;
        }
        break;
      case Mode.turn:
        if (output === Direction.left) {
          this.turnLeft();
        } else {
          this.turnRight();
        }
        this.move();
        break;
      default:
    }

    this.toggleMode();
  }

  run () {
    while (!this.program.exited) {
      if (this.program.waiting) {
        const currentPanel = this.getCurrentPanel();
        const input = currentPanel.color;
        // console.log({ currentPanel, input });
        this.program.input(input);
      }
    }
  }

  paintedCount () {
    return this.panels.filter(p => p.painted).length;
  }
}

const printLicense = (panels: Panel[]) => {
  const panelsByY = groupBy(panels, 'y');
  const maxX = Math.max(...panels.map(p => p.x));
  const maxY = Math.max(...panels.map(p => p.y));

  return Array.from({ length: maxY + 1 })
    .map((_, y) => {
      const rowPanels = panelsByY[y];
      return Array.from({ length: maxX + 1 })
        .map((_, x) => {
          const panel = rowPanels.find(p => p.x === x && p.y === y);
          if (!panel || !panel.color) return ' ';
          return '#';
        })
        .join('');
    })
    .join('\n');
};

export const solvePart1 = (input?: number[]) => {
  const robot = new Robot(input);
  robot.run();
  return robot.paintedCount();
};

export const solvePart2 = (input?: number[]) => {
  const panels = [new Panel(0, 0, Color.white)];
  const robot = new Robot(input, panels);
  robot.run();
  const license = printLicense(panels);
  return license;
};
