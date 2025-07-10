function caesarCipher(str, shift) {
  if (!isValid(str, shift)) {
    return null;
  }

  let arr = str.split("");
  let result = [];
  let offset = getOffset(shift);

  for (let c of arr) {
    let code = c.codePointAt(0);
    let changed = code + offset;

    if (isLowerCase(code)) {
      result.push(changed > 90 ? changed - 26 : changed);
    } else if (isUpperCase(code)) {
      result.push(changed > 122 ? changed - 26 : changed);
    } else {
      result.push(code);
    }
  }

  return result.map((x) => String.fromCodePoint(x)).join("");
}

function isValid(str, shift) {
  if (typeof str !== "string" || typeof shift !== "number") {
    return false;
  }

  return true;
}

function isLowerCase(letter) {
  return letter >= 65 && letter <= 90;
}

function isUpperCase(letter) {
  return letter >= 97 && letter <= 122;
}

function getOffset(shift) {
  shift %= 26;

  if (shift < 0) {
    shift += 26;
  }

  return shift;
}

export { caesarCipher };
