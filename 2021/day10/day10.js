// generated by prepare script

const groupTypes = {
  parens: { close: ")", open: "(", errorValue: 3, completeValue: 1 },
  squares: { close: "]", open: "[", errorValue: 57, completeValue: 2 },
  braces: { close: "}", open: "{", errorValue: 1197, completeValue: 3 },
  angles: { close: ">", open: "<", errorValue: 25137, completeValue: 4 },
};

const openTypeMap = {
  "{": groupTypes.braces,
  "[": groupTypes.squares,
  "(": groupTypes.parens,
  "<": groupTypes.angles,
};

const closeTypeMap = {
  "}": groupTypes.braces,
  "]": groupTypes.squares,
  ")": groupTypes.parens,
  ">": groupTypes.angles,
};

export const part1 = (arr) => {
  let t = 0;

  for (const line of arr) {
    let states = [];

    for (const c of line) {
      const opensGroup = openTypeMap[c];
      if (opensGroup) {
        states.push(opensGroup);
      } else {
        const lastState = states.pop();
        const closeGroup = closeTypeMap[c];
        if (closeGroup !== lastState) {
          t += closeGroup.errorValue;
          break;
        }
      }
    }
  }
  return t;
};

export const part2 = (input) => {
  const scores = [];

  outerLoop: for (const line of input) {
    let groupTypes = [];

    for (const c of line) {
      const openingGroupType = openTypeMap[c];
      if (openingGroupType) {
        groupTypes.push(openingGroupType);
      } else {
        const closingGroupType = closeTypeMap[c];
        const lastGroupType = groupTypes.pop();
        if (closingGroupType !== lastGroupType) {
          continue outerLoop;
        }
      }
    }

    let score = 0;

    for (let i = groupTypes.length - 1; i >= 0; i -= 1) {
      score = score * 5 + groupTypes[i].completeValue;
    }

    scores.push(score);
  }

  return scores.sort((a, b) => b - a)[Math.ceil(scores.length / 2) - 1];
};