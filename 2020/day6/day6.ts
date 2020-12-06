import { intersection } from "../common/arrays.ts";

export const countUniqueAnswers = (groupAnswers: string[][]) => {
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

/* my original naive solution */
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

/* better solution based on discussion with others after the fact */
export const countGroupedAnswersWIntersection = (groups: string[][]) => {
  return groups.reduce((total, groupForms) => {
    const allAnswered = groupForms
      .map((form) => form.split(""))
      .reduce((acc, form) => intersection(acc, form))
      .length;

    return total + allAnswered;
  }, 0);
};
