enum Choice {
  Rock = 1,
  Paper = 2,
  Scissors = 3
}

enum Outcome {
  Win = 'X',
  Draw = 'Y',
  Lose = 'Z'
}

const winMap = {
  [Choice.Paper]: Choice.Rock,
  [Choice.Rock]: Choice.Scissors,
  [Choice.Scissors]: Choice.Paper
};

const loseMap = {
  [Choice.Rock]: Choice.Paper,
  [Choice.Scissors]: Choice.Rock,
  [Choice.Paper]: Choice.Scissors
};

export const part1 = (input: string) => {
  type ChoiceChar = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';

  const choiceMap: Record<ChoiceChar, Choice> = {
    A: Choice.Rock,
    B: Choice.Paper,
    C: Choice.Scissors,
    X: Choice.Rock,
    Y: Choice.Paper,
    Z: Choice.Scissors
  };

  const strategyGuide = input.split('\n').map(r => r.split(' ').map((c) => choiceMap[c as ChoiceChar]));

  let score = 0;
  for (const round of strategyGuide) {
    const [opponentChoice, choice] = round;
    score += choice;

    const isWinner = winMap[choice] === opponentChoice;
    const isLoser = loseMap[choice] === opponentChoice;

    if (isWinner) {
      score += 6;
    } else if (!isLoser) {
      score += 3;
    }
  }

  return score;
};

const getOutcomeChoice = (opponentChoice: Choice, outcome: Outcome) => {
  switch (outcome) {
    case Outcome.Win: return winMap[opponentChoice];
    case Outcome.Lose: return loseMap[opponentChoice];
    default: return opponentChoice;
  }
};

export const part2 = (input: string) => {
  type ChoiceChar = 'A' | 'B' | 'C';
  const choiceMap: Record<ChoiceChar, Choice> = {
    A: Choice.Rock,
    B: Choice.Paper,
    C: Choice.Scissors
  };

  const ultraTopSecretStrategyGuide = input.split('\n').map(r => {
    return [choiceMap[r[0] as ChoiceChar], r[2]] as [Choice, Outcome];
  });

  let score = 0;
  for (const round of ultraTopSecretStrategyGuide) {
    const [opponentChoice, outcome] = round;

    const choice = getOutcomeChoice(opponentChoice, outcome);
    score += choice;

    const isWinner = winMap[choice] === opponentChoice;
    if (isWinner) {
      score += 6;
    } else {
      const isLoser = winMap[opponentChoice] === choice;
      if (!isLoser) score += 3;
    }
  }

  return score;
};
