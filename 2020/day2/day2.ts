const PASSWORD_MATCHER = /(\d+)-(\d+) (.+): (.+)/;

const parsePassword = (
  rawPasswordData: string,
): { min: number; max: number; char: string; password: string } | null => {
  const match = rawPasswordData.match(PASSWORD_MATCHER);

  if (!match) return null;

  const [, min, max, char, password] = match;

  if (!(min && max && char && password)) return null;
  return { min: Number(min), max: Number(max), char, password };
};

export const isValidPassword1 = (rawPasswordData: string) => {
  const passwordData = parsePassword(rawPasswordData);

  if (!passwordData) return false;

  const { min, max, char, password } = passwordData;
  const pwChars = [...password];
  const charCount = pwChars.filter((c) => char === c).length;

  if (charCount < min) return false;
  if (charCount > max) return false;
  return true;
};

export const isValidPassword2 = (rawPasswordData: string) => {
  const passwordData = parsePassword(rawPasswordData);

  if (!passwordData) return false;

  const { min, max, char, password } = passwordData;
  const pos1 = min - 1;
  const pos2 = max - 1;
  const positions = [password[pos1], password[pos2]];

  return positions.filter((c) => c === char).length === 1;
};
