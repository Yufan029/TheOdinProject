import Node from "./Node.js";

export default class Tree {
  constructor(array) {
    const uniqueArray = [...new Set(array)];
    const sortedUniqueArray = uniqueArray.sort((x, y) => x - y);
    this.root = this.#buildTree(
      sortedUniqueArray,
      0,
      sortedUniqueArray.length - 1
    );
  }

  #buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.#buildTree(array, start, mid - 1);
    root.right = this.#buildTree(array, mid + 1, end);

    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    if (this.find(value)) {
      console.log(`Value: ${value} already exist, no need to insert anymore.`);
      return;
    }

    this.#insertTree(this.root, value);
  }

  #insertTree(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (root.value > value) {
      root.left = this.#insertTree(root.left, value);
    } else {
      root.right = this.#insertTree(root.right, value);
    }

    return root;
  }

  insertIteration(value) {
    if (this.root === null) {
      return;
    }

    let cur = this.root;
    let parent = cur;

    while (cur !== null) {
      parent = cur;
      if (value === cur.value) {
        console.log(
          `Value: ${value} already exist, no need to insert anymore.`
        );
        return;
      } else if (value < cur.value) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }

    let node = new Node(value);
    if (value < parent.value) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  }

  find(value) {
    return this.#findValue(this.root, value);
  }

  #findValue(root, value) {
    if (root === null) {
      return null;
    }

    if (root.value === value) {
      return root;
    }

    if (value < root.value) {
      return this.#findValue(root.left, value);
    }

    return this.#findValue(root.right, value);
  }

  findIteration(value) {
    let cur = this.root;

    while (cur != null) {
      if (value == cur.value) {
        return cur;
      } else if (value < cur.value) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }

    return cur;
  }

  inOrder(callback) {
    if (callback === null) {
      throw new Error("Callback function cannot be null.");
    }

    this.#inOrderRec(this.root, callback);
  }

  #inOrderRec(root, callback) {
    if (root === null) {
      return;
    }

    this.#inOrderRec(root.left, callback);
    callback(root);
    this.#inOrderRec(root.right, callback);
  }

  preOrder(callback) {
    if (callback === null) {
      throw new Error("Callback function cannot be null.");
    }

    this.#preOrderRec(this.root, callback);
  }

  #preOrderRec(root, callback) {
    if (root === null) {
      return;
    }

    callback(root);
    this.#preOrderRec(root.left, callback);
    this.#preOrderRec(root.right, callback);
  }

  postOrder(callback) {
    if (callback === null) {
      throw new Error("Callback function cannot be null.");
    }

    this.#postOrderRect(this.root, callback);
  }

  #postOrderRect(root, callback) {
    if (root === null) {
      return;
    }

    this.#postOrderRect(root.left, callback);
    this.#postOrderRect(root.right, callback);
    callback(root);
  }

  getSuccessor(root) {
    if (root === null) {
      console.log("root is null");
      return;
    }

    if (!this.find(root.value)) {
      console.log(`root not exist`);
      return;
    }

    if (root.right !== null) {
      let cur = root.right;
      while (cur.left !== null) {
        cur = cur.left;
      }

      return cur;
    }
  }

  deleteItem(value) {
    if (!this.find(value)) {
      console.log(`Value: ${value} is not exist.`);
      return;
    }

    this.deleteItemRec(this.root, value);
  }

  deleteItemRec(root, value) {
    if (root.value > value) {
      root.left = this.deleteItemRec(root.left, value);
    } else if (root.value < value) {
      root.right = this.deleteItemRec(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      let successor = this.getSuccessor(root);
      root.value = successor.value;
      root.right = this.deleteItemRec(root.right, successor.value);
    }

    return root;
  }

  levelOrder(callback) {
    if (callback === null) {
      throw new Error("no callback function provided.");
    }

    if (this.root === null) {
      throw new Error("no root node");
    }

    let q = [];
    q.push(this.root);

    while (q.length > 0) {
      let cur = q[0];
      callback(cur);

      if (cur.left !== null) {
        q.push(cur.left);
      }

      if (cur.right !== null) {
        q.push(cur.right);
      }

      q.shift();
    }
  }

  levelOrderRec(callback) {
    let q = [this.root];
    this.#levelRec(q, callback);
  }

  #levelRec(q, callback) {
    if (q.length === 0) {
      return;
    }

    if (q[0].left !== null) {
      q.push(q[0].left);
    }

    if (q[0].right !== null) {
      q.push(q[0].right);
    }

    callback(q.shift());
    this.#levelRec(q, callback);
  }

  height(node) {
    if (node === null || !this.has(node.value)) {
      return 0;
    }

    if (node.right === null && node.left === null) {
      return 0;
    }

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node) {
    if (node === null || !this.has(node.value)) {
      console.log("Node cannot be found111.");
      return -1;
    }

    let cur = this.root;
    let i = 0;
    while (cur != null) {
      if (node.value < cur.value) {
        cur = cur.left;
      } else if (node.value > cur.value) {
        cur = cur.right;
      } else {
        return i;
      }

      i++;
    }

    return i;
  }

  has(value) {
    let cur = this.root;
    while (cur !== null) {
      if (value < cur.value) {
        cur = cur.left;
      } else if (value > cur.value) {
        cur = cur.right;
      } else {
        return true;
      }
    }

    return false;
  }

  isBalanced() {
    return this.isBalancedRec(this.root);
  }

  isBalancedRec(root) {
    if (root == null) {
      return true;
    }

    let difference = this.height(root.left) - this.height(root.right);
    if (Math.abs(difference) > 1) {
      return false;
    } else {
      let left = this.isBalancedRec(root.left);
      let right = this.isBalancedRec(root.right);
      return left && right;
    }
  }

  rebalance() {
    let arr = [];
    this.inOrder((node) => arr.push(node.value));
    this.root = this.#buildTree(arr, 0, arr.length - 1);
  }
}
