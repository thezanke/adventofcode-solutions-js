const getGameData = (input) => {
  let [nums, ...boards] = input.split(/(\r?\n){2}/);

  nums = nums.split(",");
  boards = boards.map((board) =>
    board.split(/\r?\n/).map((row) => row.trim().split(/\s+/))
  );

  return [nums, boards];
};

const checkForBingo = (rows) => {
  const combinations = [...rows];

  for (let i = 0; i < rows.length; i += 1) {
    combinations.push(rows.map((row) => row[i]));
  }

  return combinations.some((combo) => !combo.filter((n) => n !== "X").length);
};

const getScore = (mult, board) => {
  let sum = 0;

  board.forEach((row) => {
    row
      .filter((s) => s !== "X")
      .forEach((num) => {
        sum += parseInt(num, 10);
      });
  });

  return sum * mult;
};

export const part1 = (input) => {
  const [nums, boards] = getGameData(input);

  let bingo;

  nums.some((num) =>
    boards.some((board) =>
      board.some((row) =>
        row.some((val, pos) => {
          if (val !== num) return false;

          row[pos] = "X";

          if (checkForBingo(board)) {
            bingo = [num, board];
            return true;
          }

          return false;
        })
      )
    )
  );

  return getScore(...bingo);
};

export const part2 = (input) => {
  const [nums, boards] = getGameData(input);

  let lastBingo;

  nums.forEach((num) => {
    boards.forEach((board) => {
      if (board.hasBingo) return;

      const foundBingo = board.some((row) =>
        row.some((val, pos) => {
          if (val !== num) return false;
          row[pos] = "X";
          return checkForBingo(board);
        })
      );

      if (foundBingo) {
        board.hasBingo = true;
        lastBingo = [num, board];
      }
    });
  });

  return getScore(...lastBingo);
};
