export function formatNumber(value: number): string {
  if (value < 1000) {
    return value.toString();
  }

  const thousands = value / 1000;

  // Show one decimal only when needed (e.g., 2.4k, not 35.0k)
  const formatted =
    thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1);

  return `${formatted}k`;
}
