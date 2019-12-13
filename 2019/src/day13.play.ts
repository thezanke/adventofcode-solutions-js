import * as fs from 'fs';
import { Arcade, JoyPos } from './day13';
import { getInput } from './utils/getInput';

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode) process.stdin.setRawMode(true);

(async () => {
  const input = await getInput('day13.txt', ',', Number);
  const arcade = new Arcade(input, 2, true);

  arcade.run();

  process.stdin.on('keypress', (_, key) => {
    if ((key.ctrl && key.name === 'c') || arcade.program.exited) {
      process.exit();
    } else {
      switch (key.name) {
        case 'left':
          arcade.takeInput(JoyPos.left);
          break;
        case 'right':
          arcade.takeInput(JoyPos.right);
          break;
        case 'space':
        case 'up':
        case 'down':
          arcade.takeInput(JoyPos.neutral);
          break;
        case 's':
          fs.writeFileSync(__dirname + '/.saveState', arcade.program.memory);
          break;
        default:
      }
    }
  });
})();
