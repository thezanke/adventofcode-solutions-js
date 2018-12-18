const path = require('path');

const { readFile } = require('../utils');
const battle = require('./battle');

const INPUT_DIR = path.resolve(path.join(__dirname, '..', '..', 'input', 'day15'));

readFile(path.join(INPUT_DIR, 'example1.txt')).then(data => battle(data));
