function fibs(n) {
  let result = [];

  for (let i = 0; i < n; i++) {
    if (i === 0 || i === 1) {
      result.push(i);
      continue;
    }

    result.push(result[i - 1] + result[i - 2]);
  }

  return result;
}

function fibsRec(n, arr) {
  console.log("This was printed recursively");
  if (n <= 0) {
    return "Wrong input.";
  }

  if (arr[n - 1]) {
    return arr[n - 1];
  }

  if (n === 1) {
    arr[0] = 0;
    return 0;
  }

  if (n === 2) {
    arr[1] = 1;
    return 1;
  }

  arr[n - 1] = fibsRec(n - 1, arr) + fibsRec(n - 2, arr);

  return arr[n - 1];
}

// let arr = [];
// console.log(fibsRec(8, arr));
// console.log(arr);

function fibsTailRec(n, value = 1, prev = 0, array = []) {
  console.log("This was printed recursively");

  if (n === 1) {
    array.push(prev);
    return prev;
  }

  array.push(prev);
  return fibsTailRec(n - 1, value + prev, value, array);
}

let array = [];
console.log(fibsTailRec(8));

fibsTailRec(12, 1, 0, array);
console.log(array);
