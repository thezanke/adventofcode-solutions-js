const createMarbleCircle = (startCircle = [0]) => {
  const circle = [...startCircle];

  const indexOf = marble => circle.indexOf(marble);
  const at = i => circle[i];
  const remove = marble => circle.splice(circle.indexOf(marble), 1);
  const add = (start, marble) => circle.splice(circle.indexOf(start) + 1, 0, marble);

  const findForward = (start, n) => {
    let position = circle.indexOf(start);
    if (circle.length < 2 || n === circle.length) return circle[position];
    let i = position + n;
    if (i >= circle.length) i = i % circle.length;
    return circle[i];
  }

  const findReverse = (start, n) => {
    let position = circle.indexOf(start);
    if (circle.length < 2 || n === circle.length) return circle[position];
    let i = position - (n % circle.length);
    if (i < 0) i = i + circle.length;
    return circle[i];
  };

  return { findForward, findReverse, indexOf, at, add, remove, log: () => console.log({circle}) };
}

const playGame = ({ playerCount, max }) => {
  const marbleCircle = createMarbleCircle();

  const players = Array.from({ length: playerCount }).map((_, i) => ({ id: i + 1, points: 0 }));

  let currentPlayer = 0;
  let currentMarble = 0;

  for (let nextMarble = 1; nextMarble <= max; nextMarble += 1) {
    if (nextMarble % 23 === 0) {
      let dropMarble = marbleCircle.findReverse(currentMarble, 7);
      players[currentPlayer].points += nextMarble + dropMarble;
      currentMarble = marbleCircle.findReverse(currentMarble, 6)
      marbleCircle.remove(dropMarble);
    } else {
      let insertAfter = marbleCircle.findForward(currentMarble, 1);
      marbleCircle.add(insertAfter, nextMarble);
      currentMarble = nextMarble;
    }
    currentPlayer = (currentPlayer + 1) % playerCount;
  }

  return players.sort((a,b) => b.points - a.points)[0].points;
};

const part2 = a => a;

module.exports = { createMarbleCircle, playGame, part2 };