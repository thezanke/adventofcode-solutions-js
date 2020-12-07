import { intersection } from "../common/arrays.ts";

const RULE_ROW_PARSER = /(\w+ \w+) bags contain (\d+ .+)./;
const RULE_VALUE_PARSER = /(\d+) (\w+ \w+) bags?/;

interface RuleDetails {
  [type: string]: {
    [type: string]: number;
  };
}

export const buildDetails = (rules: string[]) => {
  const details: RuleDetails = {};
  rules.forEach((ruleRow) => {
    const match = ruleRow.match(RULE_ROW_PARSER);
    if (!match) return;
    const [, type, suffix] = match;
    suffix.split(", ").forEach((ruleValueStr) => {
      const match = ruleValueStr.match(RULE_VALUE_PARSER);
      if (!match) return;
      const [, num, subType] = match;
      if (!details[type]) details[type] = {};
      details[type][subType] = Number(num);
    });
  });
  return details;
};

export const determinePossibleContainers = (
  rules: string[],
  needle: string,
) => {
  const ruleDetails = buildDetails(rules);

  const findContainers = (type: string): string[] => {
    const containers = Object.keys(ruleDetails)
      .filter((key) => {
        const children = ruleDetails[key];
        return Object.keys(children).includes(type);
      });

    containers.forEach((container) => {
      const parents = findContainers(container);
      parents.forEach((p) => {
        if (!containers.includes(p)) containers.push(p);
      });
    });

    return containers;
  };

  return findContainers(needle).length;
};
