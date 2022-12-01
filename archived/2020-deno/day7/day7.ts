import { intersection } from '../common/arrays.ts';

const RULE_ROW_PARSER = /(\w+ \w+) bags contain (\d+ .+)./;
const RULE_VALUE_PARSER = /(\d+) (\w+ \w+) bags?/;

interface RuleDetails {
  [type: string]: {
    [type: string]: number
  }
}

export const buildRuleDetails = (ruleStrings: string[]) => {
  const details: RuleDetails = {};
  ruleStrings.forEach((ruleRow) => {
    const match = ruleRow.match(RULE_ROW_PARSER);
    if (match == null) return;
    const [, type, suffix] = match;
    suffix.split(', ').forEach((ruleValueStr) => {
      const match = ruleValueStr.match(RULE_VALUE_PARSER);
      if (match == null) return;
      const [, num, subType] = match;
      if (!details[type]) details[type] = {};
      details[type][subType] = Number(num);
    });
  });
  return details;
};

export const countContainers = (ruleDetails: RuleDetails, needle: string) => {
  const findContainers = (type: string): string[] => {
    const containers = Object.keys(ruleDetails)
      .filter((key) => {
        const children = ruleDetails[key];
        return children && Object.keys(children).includes(type);
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

export const countInnerBags = (ruleDetails: RuleDetails, needle: string) => {
  const countChildren = (type: string) => {
    const children = ruleDetails[type];
    if (!children) return 0;
    let count = Object.values(children).reduce((a, b) => a + b);
    Object.entries(children).forEach(([childType, childCount]) => {
      count += childCount * countChildren(childType);
    });
    return count;
  };

  return countChildren(needle);
};
