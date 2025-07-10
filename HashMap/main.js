import HashMap from "./hashMap.js";

const test = new HashMap(0.75, 16);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.has("banana"));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
console.log(test.capacity);
test.set("lion111", "golden111");
console.log(test.capacity);
test.set("banana", "fish");
console.log(test.entries());
console.log(test.length());
console.log(test.remove("haha"));
console.log(test.remove("frog"));
console.log(test.entries());
console.log(test.length());
