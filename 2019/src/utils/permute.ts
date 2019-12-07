export const permute = (inputArr: any[]): any[] => {
  const local: any[] = [];

  const _permute = (arr: any[], memo: any[] = []): any[] => {
    let current;

    for (var i = 0; i < arr.length; i++) {
      current = arr.splice(i, 1);
      if (arr.length === 0) local.push(memo.concat(current));
      _permute(arr.slice(), memo.concat(current));
      arr.splice(i, 0, current[0]);
    }

    return local;
  };

  return _permute(inputArr);
};
