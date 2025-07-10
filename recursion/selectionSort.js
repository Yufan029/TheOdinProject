let array = [18, 6, 66, 44, 9, 22, 14];

function swap(array, index, minIndex) {
  let temp = array[index];
  array[index] = array[minIndex];
  array[minIndex] = temp;
}

function getMinIndex(array, startIndex) {
  let minValue = array[startIndex];
  let minIndex = startIndex;

  for (let i = startIndex + 1; i < array.length; i++) {
    if (minValue > array[i]) {
      minValue = array[i];
      minIndex = i;
    }
  }

  return minIndex;
}

function selectionSort(array) {
  let i = 0;
  while (i < array.length - 1) {
    let minIndex = getMinIndex(array, i);
    swap(array, i, minIndex);
    i++;
  }
}

function selectionSortRec(array) {
  if (array.length === 1) {
    return array;
  }

  let i = 1;
  let min = array[0];
  let minIndex = 0;
  while (i < array.length) {
    if (min > array[i]) {
      min = array[i];
      minIndex = i;
    }

    i++;
  }

  let temp = array[0];
  array[0] = array[minIndex];
  array[minIndex] = temp;

  return [array[0], ...selectionSortRec(array.slice(1))];
}

console.log("before sorting...");
console.log(array);

let t1 = performance.now();
console.log("sorting by two loops");
for (let i = 0; i < 100000; i++) {
  selectionSort(array);
}
console.log(array);
let t2 = performance.now();
console.log(t2 - t1);

console.log("sorting recursively");
for (let i = 0; i < 100000; i++) {
  selectionSortRec(array);
}
let t3 = performance.now();
console.log(t3 - t2);
