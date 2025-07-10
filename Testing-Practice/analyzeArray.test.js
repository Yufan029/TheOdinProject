import { analyzeArray } from "./analyzeArray.js";

test("analyze array", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});

test("analyze array", () => {
  expect(analyzeArray([1, 8, 3, "a", 2, 6])).toBe(null);
});

test("analyze array", () => {
  expect(analyzeArray([1, undefined, 3, 4, 2, 6])).toBe(null);
});

test("analyze array", () => {
  expect(analyzeArray([18, 23, -4, 233, 6])).toEqual({
    average: 55.2,
    min: -4,
    max: 233,
    length: 5,
  });
});

test("analyze array", () => {
  expect(analyzeArray([])).toBe(null);
});
