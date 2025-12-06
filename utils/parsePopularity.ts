const parsePopularity = (val: string): number => {
  if (!val) return 0;

  const lower = val.toLowerCase();
  if (lower.endsWith("k")) {
    return parseFloat(lower.replace("k", "")) * 1000;
  }

  if (lower.endsWith("m")) {
    return parseFloat(lower.replace("m", "")) * 1_000_000;
  }

  return Number(lower) || 0;
};

export default parsePopularity;
