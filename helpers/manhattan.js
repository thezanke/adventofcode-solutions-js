export const manhattan = (p1, p2) => {
  if (!Array.isArray(p1)) {
    p1 = [p1];
    p2 = [p2];
  }

  return p1.reduce((t, d, i) => t + Math.abs(p2[i] - d), 0);
};
