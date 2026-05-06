export const createMonogram = (name: string, maxLength = 2): string => {
  if (!name) return '';

  const cleaned = name.trim().replace(/\s+/g, ' ').normalize('NFKD');

  const parts = cleaned
    .split(' ')
    .filter(Boolean)
    .filter((part) => !/^(mr|mrs|ms|dr|jr|sr)$/i.test(part));

  if (parts.length === 0) return '';

  if (parts.length === 1) {
    return parts[0].slice(0, maxLength).toUpperCase();
  }

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];

  return (first + last).toUpperCase();
};
