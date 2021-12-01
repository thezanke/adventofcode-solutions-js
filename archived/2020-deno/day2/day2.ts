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

interface PasswordPolicy {
  (parsedPassword: ParsedPassword): boolean;
}

export const policy1: PasswordPolicy = ({ min, max, char, password }) => {
  const charCount = [...password].filter((c) => char === c).length;
  if (charCount < min || charCount > max) return false;
  return true;
};

export const policy2: PasswordPolicy = ({ min, max, char, password }) => {
  const positions = [password[min - 1], password[max - 1]];
  return positions.filter((c) => c === char).length === 1;
};

export const isValidPassword = (rawPasswordData: string, policy = policy1) => {
  const passwordData = parsePassword(rawPasswordData);
  if (!passwordData) return false;
  return policy(passwordData);
};
