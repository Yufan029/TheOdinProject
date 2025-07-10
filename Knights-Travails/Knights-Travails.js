// let i = 0;
// function hanoi(n, start, end, spare) {
//   if (n === 0) {
//     return;
//   }

//   hanoi(n - 1, start, spare, end);
//   i++;
//   console.log(`${i} - Move ${n} from ${start} → ${end}`);
//   hanoi(n - 1, spare, end, start);
// }

// hanoi(4, "A", "B", "C");

function knightMoves(startPoint, endPoint) {
  if (!validInput(startPoint, endPoint)) {
    console.log("Please input valid value. [0~7]");
    return;
  }

  initial();
  traverseBfs(startPoint);
  printResult(startPoint, endPoint, getRoute(endPoint));
}

function validInput(startPoint, endPoint) {
  if (!Array.isArray(startPoint) || !Array.isArray(endPoint)) {
    return false;
  }

  if (startPoint.length !== 2 || endPoint.length !== 2) {
    return false;
  }

  if (
    startPoint[0] < 0 ||
    startPoint[0] > 7 ||
    startPoint[1] < 0 ||
    startPoint[1] > 7 ||
    endPoint[0] < 0 ||
    endPoint[0] > 7 ||
    endPoint[1] < 0 ||
    endPoint[1] > 7
  ) {
    return false;
  }

  return true;
}

function printResult(startPoint, endPoint, route) {
  console.log(
    `from [${startPoint}] to [${endPoint}] needs ${route.length - 1} steps:`
  );
  process.stdout.write("  => ");

  for (let i = route.length - 1; i >= 0; i--) {
    if (i === 0) {
      console.log(`[${route[i]}]`);
    } else {
      process.stdout.write(`[${route[i]}] → `);
    }
  }
}

function getRoute(endPoint) {
  let i = endPoint[0];
  let j = endPoint[1];

  let route = [endPoint];

  let predecessor = BfsInfo[i][j].predecessor;
  while (predecessor != null) {
    route.push(predecessor);
    let m = predecessor[0];
    let n = predecessor[1];
    predecessor = BfsInfo[m][n].predecessor;
  }

  return route;
}

function traverseBfs(startPoint) {
  let i = startPoint[0];
  let j = startPoint[1];

  // Start point is source, which has the distance as 0, and no predecessor
  BfsInfo[i][j].distance = 0;
  BfsInfo[i][j].predecessor = null;

  // Board-first search, create a queue to queue the neighbour nodes.
  let queue = [];
  queue.push(startPoint);

  while (queue.length > 0) {
    let position = queue.shift();
    let nextPositions = getNextAvailablePositions(position);

    for (let i = 0; i < nextPositions.length; i++) {
      let k = nextPositions[i][0];
      let j = nextPositions[i][1];

      // Access the node only once, if the distance has already been set, no need to set it again.
      if (BfsInfo[k][j].distance === null) {
        let m = position[0];
        let n = position[1];
        BfsInfo[k][j].distance = BfsInfo[m][n].distance + 1;
        BfsInfo[k][j].predecessor = position;

        // Push the next batch of neighbour nodes into the queue
        // in order to make sure first traverse in the next loop
        // and before the next next batch of neighbour nodes.
        queue.push([k, j]);
      }
    }
  }
}

// Create the board based on 8 * 8 board.
// Initialise all the nodes' distance to source and predecessor to null.
function initial() {
  for (let i = 0; i < 8; i++) {
    BfsInfo[i] = [];
    for (let j = 0; j < 8; j++) {
      BfsInfo[i][j] = {
        distance: null,
        predecessor: null,
      };
    }
  }
}

function getNextAvailablePositions(startPoint) {
  let i = startPoint[0];
  let j = startPoint[1];

  // All possible location based on source location [i, j]
  let array = [
    [i + 2, j + 1],
    [i + 2, j - 1],
    [i - 2, j + 1],
    [i - 2, j - 1],
    [i + 1, j + 2],
    [i + 1, j - 2],
    [i - 1, j + 2],
    [i - 1, j - 2],
  ];

  let result = [];

  for (let k = 0; k < array.length; k++) {
    // Out of board positions are not used.
    if (
      array[k][0] < 0 ||
      array[k][0] > 7 ||
      array[k][1] < 0 ||
      array[k][1] > 7
    ) {
      continue;
    }

    result.push(array[k]);
  }

  return result;
}

let BfsInfo = [];
knightMoves(4);
knightMoves([2, 3]);
knightMoves([2, 3], [4, 7]);
knightMoves([0, 0], [7, 7]);
// for (let i = 0; i < BfsInfo.length; i++) {
//   for (let j = 0; j < BfsInfo[i].length; j++) {
//     console.log(
//       `[${i}, ${j}] → distance: ${BfsInfo[i][j].distance}, predecessor: [${BfsInfo[i][j].predecessor}]`
//     );
//   }
// }
