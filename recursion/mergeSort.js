// function mergeSort(array, start, end) {
//   if (start < end) {
//     const mid = Math.floor((start + end) / 2);
//     mergeSort(array, start, mid);
//     mergeSort(array, mid + 1, end);
//     merge(array, start, mid, end);
//   }
// }

// function merge(array, start, mid, end) {
//   let temp = Array(end - start + 1);
//   let i = start;
//   let k = 0;
//   let j = mid + 1;

//   while (i <= mid && j <= end) {
//     if (array[i] < array[j]) {
//       temp[k++] = array[i++];
//     } else {
//       temp[k++] = array[j++];
//     }
//   }

//   for (; i <= mid; i++, k++) {
//     temp[k] = array[i];
//   }

//   for (; j <= end; j++, k++) {
//     temp[k] = array[j];
//   }

//   for (i = start; i <= end; i++) {
//     array[i] = temp[i - start];
//   }
// }

// let array = [3, 2, 1, 13, 8];
// mergeSort(array, 0, array.length - 1);
// console.log(array);

function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }

  let mid = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, mid));
  let right = mergeSort(array.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let sortedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      sortedArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      sortedArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return sortedArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

let array1 = [3, 2, 1, 13, 8, 5, 0, 1];
let array2 = [105, 79, 100, 110];
console.log(mergeSort(array2));
