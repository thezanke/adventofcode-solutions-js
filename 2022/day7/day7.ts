import _ from 'lodash'
import path from 'path'

const CHANGE_DIR = 'cd'
const LIST = 'ls'

type COMMAND_STRING = typeof CHANGE_DIR | typeof LIST

interface Command {
  bin: COMMAND_STRING
  args: string[]
  output: string[][]
}

interface SystemInfo {
  fileTree: Map<string, string | null>
  fileSizes: Map<string, number>
}

const COMMAND_SYMBOL = '$'
const DIR = 'dir'

const parseInput = (input: string): Command[] => {
  const commands: Command[] = []

  for (const line of input.split('\n')) {
    const parts = line.split(' ')
    const [arg1, bin] = parts

    if (arg1 === COMMAND_SYMBOL) {
      commands.push({ bin: bin as COMMAND_STRING, args: parts.slice(2), output: [] })
    } else {
      commands[commands.length - 1].output.push(parts)
    }
  }

  return commands
}

class SystemInfo {
  public fileTree: Map<string, string | null> = new Map([['/', null]])
  public fileSizes: Map<string, number> = new Map()

  constructor (commands: Command[]) {
    this.parseCommands(commands)
  }

  parseCommands (commands: Command[]): void {
    let cwd: string = '/'

    const commandMap = {
      [CHANGE_DIR]: (command: Command) => {
        const [dirname] = command.args
        cwd = path.resolve(path.join(cwd, dirname))
      },
      [LIST]: (command: Command) => {
        for (const line of command.output) {
          const [arg1, fileOrFolder] = line
          const filePath = path.join(cwd, fileOrFolder)

          if (!this.fileTree.has(filePath)) {
            this.fileTree.set(filePath, cwd)
          }

          if (arg1 !== DIR) {
            const [size] = line
            this.fileSizes.set(filePath, parseInt(size, 10))
          }
        }
      }
    }

    for (const command of commands) {
      commandMap[command.bin](command)
    }
  }
}

const generateDirectorySizes = (systemInfo: SystemInfo): Map<string, number> => {
  const directorySizes: Map<string, number> = new Map()

  const getTotalSizeForPath = _.memoize((path: string): number => {
    const fileSize = systemInfo.fileSizes.get(path)
    if (fileSize !== undefined) return fileSize

    const contents = [...systemInfo.fileTree.entries()].filter(([, parent]) => parent === path).map(([dir]) => dir)
    return contents.reduce((t, dir) => t + getTotalSizeForPath(dir), 0)
  })

  const directories = new Set(systemInfo.fileTree.values())

  for (const path of directories) {
    if (path !== null) directorySizes.set(path, getTotalSizeForPath(path))
  }

  return directorySizes
}

const getDirectorySizesFromInput = (input: string): Map<string, number> => {
  const parsedInput = parseInput(input)
  const systemInfo = new SystemInfo(parsedInput)

  return generateDirectorySizes(systemInfo)
}

export const part1 = (input: string): number => {
  const directorySizes = getDirectorySizesFromInput(input)

  let sum = 0

  for (const [, size] of directorySizes) {
    if (size <= 100000) sum += size
  }

  return sum
}

export const part2 = (input: string): number => {
  const directorySizes = getDirectorySizesFromInput(input)

  const totalDiskSpace = 70000000
  const totalRequiredSpace = 30000000
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const unusedDiskSpace = totalDiskSpace - directorySizes.get('/')!
  const requiredFreedSpace = totalRequiredSpace - unusedDiskSpace
  const sortedDirectorySizeArr = [...directorySizes].sort((a, b) => a[1] - b[1])

  return sortedDirectorySizeArr.find(ds => ds[1] > requiredFreedSpace)?.[1] as number
}
