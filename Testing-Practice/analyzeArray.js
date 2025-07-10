function analyzeArray(arr) {
  if (!isValid(arr)) {
    return null;
  }

  return {
    average: arr.reduce((pre, cur) => pre + cur, 0) / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
}

function isValid(arr) {
  if (!Array.isArray(arr)) {
    return false;
  }

  if (arr.length === 0 || arr.filter((x) => typeof x !== "number").length > 0) {
    return false;
  }

  return true;
}

export { analyzeArray };
