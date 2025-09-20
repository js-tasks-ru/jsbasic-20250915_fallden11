function filterRange(arr, a, b) {
  let [minValue, maxValue] = a <= b ? [a, b] : [b, a];
  return arr.filter((z) => z >= minValue && z <= maxValue);
}
