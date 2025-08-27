function factorial(n) {
  if (n === 1 || n === 0) {
    return 1;
  }
  let result = n;
  while (n > 1) {
    result = result * (n - 1);
    n--;
  }
  return result;
}
