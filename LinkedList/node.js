export default class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }

  toString() {
    return `{ value: '${this.value}', nextNode: '${
      this.nextNode === null ? "null" : this.nextNode.value
    }')`;
  }
}
