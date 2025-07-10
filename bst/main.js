import Tree from "./Tree.js";

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.prettyPrint();
tree.insert(23);
tree.insert(20);
tree.insertIteration(80);
tree.prettyPrint();
tree.prettyPrint();
console.log(tree.find(67));
console.log(tree.findIteration(65));

console.log("⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩  in order  ⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩");
let inOrderSeq = [];
tree.inOrder((node) => inOrderSeq.push(node.value));
console.log(`[${inOrderSeq.join(", ")}]`);

console.log("\n↓↓↓↓↓↓↓↓↓↓  pre order  ↓↓↓↓↓↓↓↓↓↓");
let preOrderSeq = [];
tree.preOrder((node) => preOrderSeq.push(node.value));
console.log(`[${preOrderSeq.join(", ")}]`);

console.log("\n⇣⇣⇣⇣⇣⇣⇣⇣⇣⇣⇣  post order  ⇣⇣⇣⇣⇣⇣⇣⇣⇣⇣⇣");
let postOrderSeq = [];
tree.postOrder((node) => postOrderSeq.push(node.value));
console.log(`[${postOrderSeq.join(", ")}]`);
console.log(tree.getSuccessor(5));
console.log(tree.getSuccessor(tree.find(22)));

tree.deleteItem(9);
tree.deleteItem(3);
tree.prettyPrint();

let levelOrderSeq = [];
tree.levelOrder((node) => levelOrderSeq.push(node.value));
console.log(`[${levelOrderSeq.join(", ")}]`);

let levelOrderRecSeq = [];
tree.levelOrderRec((node) => levelOrderRecSeq.push(node.value));
console.log(`[${levelOrderRecSeq.join(", ")}]`);
console.log(tree.has(67));
tree.insert(81);
tree.insert(85);
tree.insert(6444);
tree.insert(75);
tree.insert(2);
tree.insert(9);
tree.prettyPrint();
console.log(tree.depth(tree.find(324)));
console.log(tree.height(tree.find(8)));
console.log(`Is balanced: ${tree.isBalanced()}`);
tree.rebalance();
tree.prettyPrint();

function generateArray(count, min, max) {
  let array = [];
  for (let i = 0; i < count; i++) {
    let num = null;

    while ((num = Math.floor(getRandomInRange(min, max)))) {
      if (!array.includes(num)) {
        break;
      }
    }

    array.push(num);
  }

  return array;
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

console.log(generateArray(20, -100, 100));
let newTree = new Tree(generateArray(20, -100, 100));
newTree.prettyPrint();
console.log(`Tree is balanced: ${newTree.isBalanced()}`);

let levelSeq = [];
newTree.levelOrder((node) => levelSeq.push(node.value));
console.log(`Level Order → ${levelSeq}`);

let preSeq = [];
newTree.preOrder((node) => preSeq.push(node.value));
console.log(`Pre Order → ${preSeq}`);

let postSeq = [];
newTree.postOrder((node) => postSeq.push(node.value));
console.log(`Post Order → ${postSeq}`);

let inSeq = [];
newTree.inOrder((node) => inSeq.push(node.value));
console.log(`In Order → ${inSeq}`);
console.log(`Is balanced: ${newTree.isBalanced()}`);
newTree.insert(200);
newTree.insert(232);
newTree.insert(254);
newTree.insert(245);
newTree.insert(204);
newTree.prettyPrint();
console.log(`Is balanced: ${newTree.isBalanced()}`);
newTree.rebalance();
newTree.prettyPrint();
console.log(`Is balanced: ${newTree.isBalanced()}`);

levelSeq = [];
newTree.levelOrder((node) => levelSeq.push(node.value));
console.log(`Level Order → ${levelSeq}`);

preSeq = [];
newTree.preOrder((node) => preSeq.push(node.value));
console.log(`Pre Order → ${preSeq}`);

postSeq = [];
newTree.postOrder((node) => postSeq.push(node.value));
console.log(`Post Order → ${postSeq}`);
