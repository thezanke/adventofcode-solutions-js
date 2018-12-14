const path = require('path');

const { readFile } = require('./lib/utils');
const { part1, part2 } = require('./lib/day13');

const inputDir = path.join(__dirname, 'input', 'day13');

readFile(path.join(inputDir, 'challenge.txt')).then(input => console.log(part2(input)));