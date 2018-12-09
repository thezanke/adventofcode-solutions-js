const { playGame } = require('./lib/day9');
const result = playGame({ playerCount: 3, max: 1000000 });
console.log(result);