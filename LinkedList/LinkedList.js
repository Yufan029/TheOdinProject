import Node from "./node.js";

export default class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(value) {
    let newNode = new Node(value, null);

    if (this.head == null) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.nextNode != null) {
      current = current.nextNode;
    }

    current.nextNode = newNode;
  }

  prepend(value) {
    let newNode = new Node(value, this.head);
    this.head = newNode;
  }

  size() {
    let count = 0;
    let data = this.head;
    while (data != null) {
      data = data.nextNode;
      count++;
    }

    return count;
  }

  head() {
    return this.head;
  }

  tail() {
    if (this.head == null) {
      return this.head;
    }

    let last = this.head;
    while (last.nextNode != null) {
      last = last.nextNode;
    }

    return last;
  }

  at(index) {
    if (this.head == null) {
      return null;
    }

    if (this.size() < index - 1) {
      return null;
    }

    let i = 0;
    let result = this.head;
    while (i < index) {
      result = result.nextNode;
      i++;
    }

    return result;
  }

  pop() {
    if (this.head == null) {
      return null;
    }

    let size = this.size();
    let secondLast = this.head;
    for (let i = 0; i < size - 2; i++) {
      secondLast = secondLast.nextNode;
    }

    let last = secondLast.nextNode;
    secondLast.nextNode = null;
    return last;
  }

  contain(value) {
    let current = this.head;
    while (current != null) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }

    return false;
  }

  find(value) {
    let current = this.head;
    let i = 0;
    while (current != null) {
      if (current.value === value) {
        return i;
      }

      i++;
      current = current.nextNode;
    }

    return null;
  }

  insertAt(value, index) {
    if (index < 0) {
      console.log(`Wrong index:(${index})`);
    }

    let current = this.head;
    let newNode = new Node(value);

    if (index > this.size()) {
      console.log(
        `index:(${index}) larger than the size of the list:(${this.size()}), add to the end of the list.`
      );

      while (current.nextNode != null) {
        current = current.nextNode;
      }

      current.nextNode = newNode;
      return;
    }

    let prev = current;
    while (--index >= 0) {
      prev = current;
      current = current.nextNode;
    }

    if (prev === current) {
      newNode.nextNode = current;
      this.head = newNode;
    } else {
      newNode.nextNode = current;
      prev.nextNode = newNode;
    }
  }

  removeAt(index) {
    if (index > this.size() || index < 0) {
      console.log(`Wrong index:(${index})`);
      return;
    }

    let current = this.head;
    let prev = current;
    while (--index >= 0) {
      prev = current;
      current = current.nextNode;
    }

    if (prev === current) {
      this.head = current.next;
    } else {
      prev.nextNode = current.nextNode;
    }
  }

  toString() {
    let str = "";
    let current = this.head;
    while (current != null) {
      str += `(${current.value}) -> `;
      current = current.nextNode;
    }

    str += "null";
    console.log(str);
  }
}
