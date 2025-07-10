import { sum, capitalism, reverseString, calculator } from "./project.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// test capitalism
test("capitalism - string", () => {
  let str = "abc";
  expect(capitalism(str)).toBe("Abc");
});

test("capitalism - no parameter", () => {
  expect(capitalism()).toBe(null);
});

test("capitalism - number as parameter", () => {
  expect(capitalism(32)).toBe(null);
});

test("capitalism - first charactor is not letter", () => {
  expect(capitalism("**dfs")).toBe("**dfs");
});

// test reverseString
test("reverse string - string", () => {
  expect(reverseString("  abc")).toBe("cba  ");
});

test("reverse string - no parameter", () => {
  expect(reverseString()).toBe(null);
});

test("reverse string - number as parameter", () => {
  expect(capitalism(32)).toBe(null);
});

// test calculator
// add
test("calculator - add - number", () => {
  expect(calculator.add(3, 5)).toBe(8);
});

test("calculator - add - float number", () => {
  expect(calculator.add(3.2, 5.4)).toBeCloseTo(8.6);
});

test("calculator - add - not number", () => {
  expect(calculator.add("3", 5)).toBe(null);
});

test("calculator - add - no parameter", () => {
  expect(calculator.add()).toBe(null);
});

// subtract
test("calculator - subtract - number", () => {
  expect(calculator.subtract(3, 5)).toBe(-2);
});

test("calculator - subtract - float number", () => {
  expect(calculator.subtract(3.2, 5.4)).toBeCloseTo(-2.2);
});

test("calculator - subtract - not number", () => {
  expect(calculator.subtract("3", 5)).toBe(null);
});

test("calculator - subtract - no parameter", () => {
  expect(calculator.subtract()).toBe(null);
});

// multiply
test("calculator - multiply - number", () => {
  expect(calculator.multiply(3, 5)).toBe(15);
});

test("calculator - multiply - float number", () => {
  expect(calculator.multiply(3.2, 5.4)).toBeCloseTo(17.28);
});

test("calculator - multiply - not number", () => {
  expect(calculator.multiply("3", 5)).toBe(null);
});

test("calculator - multiply - no parameter", () => {
  expect(calculator.multiply()).toBe(null);
});

// divide
test("calculator - divide - number", () => {
  expect(calculator.divide(15, 5)).toBe(3);
});

test("calculator - divide - float number", () => {
  expect(calculator.divide(10, 3)).toBeCloseTo(3.333333);
});

test("calculator - divide - float number", () => {
  expect(calculator.divide(10, 0)).toBe(null);
});

test("calculator - divide - not number", () => {
  expect(calculator.divide("3", 5)).toBe(null);
});

test("calculator - divide - no parameter", () => {
  expect(calculator.divide()).toBe(null);
});
