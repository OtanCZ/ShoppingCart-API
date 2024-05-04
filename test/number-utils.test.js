const isEven = require("../helpers/number-utils");
describe("isEven test", () => {

  test("return true if number is even", () => {
    expect(isEven(2)).toBe(true);
  });

  test("return false if number is odd", () => {
    expect(isEven(3)).toBe(false);
  });

  test("throws an error if number is negative", () => {
    expect(() => isEven(-1)).toThrow();
  });

  test("throws and error if number is not a number", () => {
    expect(() => isEven("1")).toThrow();
  });
});