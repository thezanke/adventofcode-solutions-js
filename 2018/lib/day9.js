const createMarbleCircle = (startCircle = [0]) => {
  const circle = [...startCircle];

  const indexOf = marble => circle.indexOf(marble);
  const at = i => circle[i];
  const remove = index => circle.splice(index, 1);
  const add = (index, marble) => circle.splice(index, 0, marble);

  const findForward = (start, n) => {
    if (circle.length < 2 || n === circle.length) return start;
    let i = start + n;
    if (i >= circle.length) i = i % circle.length;
    return i;
  }

  const findReverse = (start, n) => {
    if (circle.length < 2 || n === circle.length) return start;
    let i = start - (n % circle.length);
    if (i < 0) i = i + circle.length;
    return i;
  };

  return { findForward, findReverse, indexOf, at, add, remove, circle };
}

const playGame = ({ playerCount, max }) => {
  const marbleCircle = createMarbleCircle();

  const players = Array.from({ length: playerCount }).map((_, i) => ({ id: i + 1, points: 0 }));

  let currentPlayerIndex = 0;
  let currentMarbleIndex = 0;

  for (let nextMarble = 1; nextMarble <= max; nextMarble += 1) {
    if (nextMarble % 23 === 0) {
      let dropMarbleIndex = marbleCircle.findReverse(currentMarbleIndex, 7);
      let points = nextMarble + marbleCircle.at(dropMarbleIndex);

      players[currentPlayerIndex].points += points;
      currentMarbleIndex = marbleCircle.findReverse(currentMarbleIndex, 6) - 1;
      marbleCircle.remove(dropMarbleIndex);
    } else {
      let insertIndex = marbleCircle.findForward(currentMarbleIndex, 1) + 1;
      marbleCircle.add(insertIndex, nextMarble);
      currentMarbleIndex = insertIndex;
    }

    if (!(nextMarble % 10000)) console.log(nextMarble);

    currentPlayerIndex = (currentPlayerIndex + 1) % playerCount;
  }

  return players.sort((a, b) => b.points - a.points)[0].points;
};

const part2 = a => a;

module.exports = { createMarbleCircle, playGame, part2 };