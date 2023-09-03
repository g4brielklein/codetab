const calculator = require("../models/calculator");

test("Should sum 2 + 2 an return 4", () => {
  const result = calculator.sum(2, 2);
  expect(result).toBe(4);
});

test("Should sum 7 + 7 an return 14", () => {
  const result = calculator.sum(7, 7);
  expect(result).toBe(14);
});

test("Should do 10/5 and return 2", () => {
  const result = calculator.divide(10, 5);
  expect(result).toBe(2);
});

test("Should return error if try to sum '100' + 100", () => {
  const result = calculator.sum("100", 100);
  expect(result).toBe("Error");
});
