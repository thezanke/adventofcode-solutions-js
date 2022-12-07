import _ from 'lodash';

const CHANGE_DIR = 'cd';
const LIST = 'ls';

type BIN = typeof CHANGE_DIR | typeof LIST;

interface Command {
  bin: typeof CHANGE_DIR | typeof LIST
  args: string[]
  output: string[][]
}

interface SystemInfo {
  fileTree: Map<string, string | null>
  fileSizes: Map<string, number>
}

const COMMAND_SYMBOL = '$';
const UP = '..';
const DIR = 'dir';

const parseInput = (input: string) => {
  const commands: Command[] = [];

  for (const line of input.split('\n')) {
    const parts = line.split(' ');
    if (parts[0] === COMMAND_SYMBOL) {
      commands.push({ bin: parts[1] as BIN, args: parts.slice(2), output: [] });
    } else {
      commands[commands.length - 1].output.push(parts);
    }
  }

  return commands;
};

class SystemInfo {
  public fileTree: Map<string, string | null> = new Map();
  public fileSizes: Map<string, number> = new Map();

  constructor (commands: Command[]) {
    let current: string | null = null;

    const handleDirectoryChange = (command: Command) => {
      const [to] = command.args;

      if (to === UP) {
        current = this.fileTree.get(current as unknown as string) as string;
      } else {
        current = to;
      }
    };

    const handleListing = (command: Command) => {
      for (const line of command.output) {
        const [,fileOrFolder] = line;
        this.fileTree.set(fileOrFolder, current);

        if (line[0] !== DIR) {
          const [size] = line;
          this.fileSizes.set(fileOrFolder, parseInt(size, 10));
        }
      }
    };

    const commandMap = {
      [CHANGE_DIR]: handleDirectoryChange,
      [LIST]: handleListing
    };

    for (const command of commands) {
      commandMap[command.bin](command);
    }
  }
}

const generateDirectorySizes = (systemInfo: SystemInfo) => {
  const directorySizes: Map<string, number> = new Map();

  const getTotalSizeForPath = _.memoize((path: string): number => {
    const fileSize = systemInfo.fileSizes.get(path);
    if (fileSize !== undefined) return fileSize;

    const contents = [...systemInfo.fileTree.entries()].filter(([, parent]) => parent === path).map(([dir]) => dir);
    return contents.reduce((t, dir) => t + getTotalSizeForPath(dir), 0);
  });

  const directories = new Set(systemInfo.fileTree.values());

  for (const path of directories) {
    if (path !== null) directorySizes.set(path, getTotalSizeForPath(path));
  }

  return directorySizes;
};

const solve = (input: string) => {
  const parsedInput = parseInput(input);
  const systemInfo = new SystemInfo(parsedInput);
  const directorySizes = generateDirectorySizes(systemInfo);

  // console.log(directorySizes);

  let sum = 0;

  for (const [, size] of directorySizes) {
    if (size <= 100000) sum += size;
  }

  return sum;
};

export const part1 = (input: string) => solve(input);
export const part2 = (input: string) => solve(input);
