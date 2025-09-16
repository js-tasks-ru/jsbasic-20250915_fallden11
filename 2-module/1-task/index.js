function sumSalary(salaries) {
  let sum = 0;
  for (let item in salaries) {
    if (
      typeof salaries[item] === "number" &&
      !Number.isNaN(salaries[item]) &&
      salaries[item] !== Infinity &&
      salaries[item] !== -Infinity
    ) {
      sum += salaries[item];
    }
  }
  return sum;
}
