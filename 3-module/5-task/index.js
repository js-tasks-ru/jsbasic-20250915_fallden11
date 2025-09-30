function getMinMax(str) {
  const numbers = str
    .split(" ")
    .map(Number)
    .filter((n) => !isNaN(n));

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
