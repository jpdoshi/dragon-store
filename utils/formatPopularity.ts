const formatPopularity = (num: number): string => {
  if (num == null || isNaN(num)) return "0";

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "m";
  }

  if (num >= 1_000) {
    return (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + "k";
  }

  return String(num);
};

export default formatPopularity;
