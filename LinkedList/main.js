import LinkedList from "./LinkedList.js";

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.prepend("Bird");
list.prepend("Pig");
list.append("Cow");

console.log(`Size is ${list.size()}`);
console.log(`Last node: ${list.tail().toString()}`);
console.log(`List at(2): ${list.at(2).toString()}`);
console.log(list.toString());
console.log(`List find('turtle'): ${list.find("turtle")}`);
console.log(`Pop node: ${list.pop().toString()}`);
console.log(list.toString());
console.log(`List find('turtle'): ${list.find("turtle")}`);
console.log(list.contain("turtle"));
list.insertAt("tt", 3);
console.log(list.toString());
list.removeAt(5);
console.log(list.toString());
