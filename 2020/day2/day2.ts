const PASSWORD_MATCHER = /(\d+)-(\d+) (.+): (.+)/;

interface ParsedPassword {
  min: number;
  max: number;
  char: string;
  password: string;
}

const parsePassword = (rawPasswordData: string): ParsedPassword | null => {
  const match = rawPasswordData.match(PASSWORD_MATCHER);
  if (!match) return null;

  const [, min, max, char, password] = match;
  if (!(min && max && char && password)) return null;

  return { min: Number(min), max: Number(max), char, password };
};

export const policy1 = ({ min, max, char, password }: ParsedPassword) => {
  const pwChars = [...password];
  const charCount = pwChars.filter((c) => char === c).length;
  if (charCount < min) return false;
  if (charCount > max) return false;
  return true;
};

export const policy2 = ({ min, max, char, password }: ParsedPassword) => {
  const pos1 = min - 1;
  const pos2 = max - 1;
  const positions = [password[pos1], password[pos2]];
  return positions.filter((c) => c === char).length === 1;
};

export const isValidPassword = (rawPasswordData: string, policy = policy1) => {
  const passwordData = parsePassword(rawPasswordData);
  if (!passwordData) return false;
  return policy(passwordData);
};
