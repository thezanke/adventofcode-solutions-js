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

const calculateRoundScore = (choice: Choice, opponentChoice: Choice) => {
  let score = choice;

  const isWinner = winMap[choice] === opponentChoice;
  const isLoser = winMap[opponentChoice] === choice;

  if (isWinner) {
    score += 6;
  } else if (!isLoser) {
    score += 3;
  }

  return score;
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
  const totalScore = strategyGuide.reduce((s, [opponentChoice, choice]) => {
    return s + calculateRoundScore(choice, opponentChoice);
  }, 0);

  return totalScore;
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

  const ultraTopSecretStrategyGuide = input.split('\n').map(([char, ,outcome]) => {
    return [choiceMap[char as ChoiceChar], outcome] as [Choice, Outcome];
  });

  const totalScore = ultraTopSecretStrategyGuide.reduce((s, [opponentChoice, outcome]) => {
    return s + calculateRoundScore(getOutcomeChoice(opponentChoice, outcome), opponentChoice);
  }, 0);

  return totalScore;
};
