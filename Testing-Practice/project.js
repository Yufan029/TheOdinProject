function sum(a, b) {
  return a + b;
}

function capitalism(str) {
  if (typeof str !== "string") {
    return null;
  }

  return str[0].toUpperCase().concat(str.slice(1));
}

function reverseString(str) {
  if (typeof str !== "string") {
    return null;
  }

  return str.split("").reverse().join("");
}

let calculator = {
  add(x, y) {
    if (!this.isValid(x, y)) {
      return null;
    }

    return x + y;
  },

  subtract(x, y) {
    if (!this.isValid(x, y)) {
      return null;
    }

    return x - y;
  },

  divide(x, y) {
    if (!this.isValid(x, y)) {
      return null;
    }

    if (y === 0) {
      return null;
    }

    return x / y;
  },

  multiply(x, y) {
    if (!this.isValid(x, y)) {
      return null;
    }

    return x * y;
  },

  isValid(x, y) {
    if (typeof x !== "number" || typeof y !== "number") {
      return false;
    }

    return true;
  },
};

export { sum, capitalism, reverseString, calculator };
