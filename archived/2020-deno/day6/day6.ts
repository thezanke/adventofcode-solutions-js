import { intersection } from '../common/arrays.ts';

export const countUniqueAnswers = (groups: string[][]) => {
  return groups.reduce((total, groupForms) => {
    const set = new Set([...groupForms.join('')]);
    return total + set.size;
  }, 0);
};

interface AnswerMap {
  [key: string]: number
}

/* my original naive solution */
export const countGroupedAnswers = (groups: string[][]) => {
  let total = 0;
  groups.forEach((groupForms) => {
    const answerMap: AnswerMap = {};
    const totalForms = groupForms.length;
    [...groupForms.join('')].forEach((l) => {
      answerMap[l] = answerMap[l] ? answerMap[l] + 1 : 1;
    });
    Object.values(answerMap).forEach((c) => {
      if (c === totalForms) total += 1;
    });
  });
  return total;
};

/* better solution based on discussion with others after the fact */
export const countGroupedAnswersWIntersection = (groups: string[][]) => {
  return groups.reduce((total, groupForms) => {
    const allAnswered = groupForms
      .map((form) => form.split(''))
      .reduce((acc, form) => intersection(acc, form))
      .length;

    return total + allAnswered;
  }, 0);
};
