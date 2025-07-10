import { caesarCipher } from "./caesarCipher.js";

test("caesarCipher - elementary", () => {
  expect(caesarCipher("abc", 3)).toBe("def");
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher(2, 3)).toBe(null);
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher("abc")).toBe(null);
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher("abc", 26)).toBe("abc");
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher("XYZ", 3)).toBe("ABC");
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher("abc", -3)).toBe("xyz");
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher("abc", -1)).toBe("zab");
});

test("caesarCipher - elementary", () => {
  expect(caesarCipher("ABC", -26)).toBe("ABC");
});
