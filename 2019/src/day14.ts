interface ChemData {
  yields: number;
  ingredients: string[];
}

interface ChemTable {
  [name: string]: ChemData;
}

const ORE = 'ORE';

const parseChemAmount = (str: string) => {
  const [n, name] = str.split(' ');
  return [Number(n), name] as [number, string];
};

const parseInput = (input: string[]) => {
  return input.reduce<ChemTable>((chemTable, line) => {
    const [inStr, outStr] = line.split(' => ');

    const ingredients = inStr
      .split(', ')
      .reduce<string[]>((ingList, ingStr) => {
        const [amount, name] = parseChemAmount(ingStr);
        ingList.push(...Array.from({ length: amount }, () => name));
        return ingList;
      }, []);

    const [yields, name] = parseChemAmount(outStr);
    chemTable[name] = { yields, ingredients };
    return chemTable;
  }, {});
};

export const solvePart1 = (input: string[]) => {
  const table = parseInput(input);

  let cost = 0;

  const extras: { [name: string]: number } = {};
  const ingredients = [...table.FUEL.ingredients];

  while (ingredients.length) {
    const iName = ingredients.shift();

    if (!iName) break;

    if (iName === ORE) {
      cost += 1;
    } else {
      const chem = table[iName];

    }
  }
};
