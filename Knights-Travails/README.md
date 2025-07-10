Knights-Travails
Board-first search

Thought: need to traverse the board, set the distance to the start point, and each node's predecessor.

First initialise every board nodes with distance and predecessor set to null.

The start point has the distance 0, predecessor as null.

Use queue to guarantee visit the next batch of available nodes(neighbour nodes) first and set their distance as the previous node + 1, then set previous node as their predecessor.

Then get the board array like:
[0, 0] → distance: 0, predecessor: [null]
[0, 1] → distance: 3, predecessor: [1,3]
[0, 2] → distance: 2, predecessor: [2,1]
[0, 3] → distance: 3, predecessor: [2,4]
[0, 4] → distance: 2, predecessor: [1,2]
[0, 5] → distance: 3, predecessor: [1,3]
[0, 6] → distance: 4, predecessor: [1,4]
[0, 7] → distance: 5, predecessor: [1,5]
[1, 0] → distance: 3, predecessor: [0,2]
[1, 1] → distance: 4, predecessor: [2,3]
[1, 2] → distance: 1, predecessor: [0,0]
[1, 3] → distance: 2, predecessor: [2,1]
[1, 4] → distance: 3, predecessor: [0,2]
...

Finally get the end point and reverse traverse based on the predecessor to the start point.

Print the result like:
from [2,3] to [4,7] needs 2 steps:
=> [2,3] → [3,5] → [4,7]
from [0,0] to [7,7] needs 6 steps:
=> [0,0] → [2,1] → [4,2] → [6,3] → [4,4] → [6,5] → [7,7]