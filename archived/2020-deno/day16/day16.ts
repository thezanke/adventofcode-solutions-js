interface Rule {
  name: string;
  ranges: Array<[number, number]>;
}

interface InputObject {
  rules: Rule[];
  myTicket: number[];
  nearbyTickets: number[][];
}

const RULE_MATCHER = /(\d+)-(\d+) or (\d+)-(\d+)/;

const parseRulesStrArr = (rulesStrArr: string[]) => {
  const rules: Rule[] = [];
  rulesStrArr.forEach((ruleStr) => {
    const [name, ruleInfo] = ruleStr.split(": ");
    const match = ruleInfo.match(RULE_MATCHER);
    if (!match) return;
    const [, min1, max1, min2, max2] = match;
    rules.push(
      {
        name,
        ranges: [
          [Number(min1), Number(max1)],
          [Number(min2), Number(max2)],
        ],
      },
    );
  });
  return rules;
};

const parseTicketStrArr = (ticketStrArr: string[]) => {
  return ticketStrArr.slice(1).map((str) => str.split(",").map(Number));
};

export const parseInput = (input: string): InputObject => {
  const [rulesStr, myTicketStr, nearbyTicketsStr] = input.split("\n\n");
  const rules = parseRulesStrArr(rulesStr.split("\n"));
  const [myTicket] = parseTicketStrArr(myTicketStr.split("\n"));
  const nearbyTickets = parseTicketStrArr(nearbyTicketsStr.split("\n"));
  return { rules, myTicket, nearbyTickets };
};

export const findNearbyErrorRate = (input: InputObject) => {
  const { rules, nearbyTickets } = input;
};
