export function getMaxChartValue(items = []) {
  return Math.max(...items.map((item) => Number(item?.value ?? 0)), 1);
}

export function getTotalChartValue(items = []) {
  return items.reduce((sum, item) => sum + Number(item?.value ?? 0), 0);
}
