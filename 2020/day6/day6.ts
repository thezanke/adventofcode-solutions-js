export const getAnswerCounts = (groupAnswers: string[][]) => {
  let total = 0;
  groupAnswers.forEach((ga) => {
    const set = new Set([...ga.join("")]);
    total += set.size;
  });
  return total;
};

interface AnswerMap {
  [key: string]: number;
}

export const countGroupedAnswers = (groupAnswers: string[][]) => {
  let total = 0;
  groupAnswers.forEach((ga) => {
    const answerMap: AnswerMap = {};
    const personCount = ga.length;
    [...ga.join("")].forEach((l) => {
      answerMap[l] = answerMap[l] ? answerMap[l] + 1 : 1;
    });
    Object.values(answerMap).forEach((c) => {
      if (c === personCount) total += 1;
    });
  });
  return total;
};
