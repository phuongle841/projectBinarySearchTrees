const { node } = require("./node");

class BST {
  root = null;
  array = null;
  constructor(array) {
    array.sort(this.compareNumbers);
    this.array = this.filterDuplicate(array);
    console.log(this.array);
    this.root = this.buildTree(this.array, 0, this.array.length);
    this.prettyPrint(this.root);
  }
  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let newNode = new node(array[mid]);
    newNode.left = this.buildTree(array, start, mid - 1);
    newNode.right = this.buildTree(array, mid + 1, end);
    return newNode;
  }
  inOrderTraversal(localRoot) {
    if (localRoot != null) {
      this.inOrderTraversal(localRoot.left);
      console.log(localRoot.value);
      this.inOrderTraversal(localRoot.right);
    }
  }
  filterDuplicate(a) {
    var seen = {};
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }
  compareNumbers(a, b) {
    return a - b;
  }

  find(value) {
    let current = this.root;
    while (current.value != value) {
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current == null) {
        return null;
      }
    }
    return current;
  }
  insert(value) {
    const newNode = new node(value);
    if (this.root == null) {
      this.root = newNode;
    } else {
      let current = this.root;
      let parent = this.root;
      while (true) {
        parent = current;
        if (value < current.value) {
          current = current.left;
          if (current == null) {
            parent.left = newNode;
            return;
          }
        } else {
          current = current.right;
          if (current == null) {
            parent.right = newNode;
            return;
          }
        }
      }
    }
  }
  deleteItem(value) {
    let current = this.root;
    let parent = this.root;
    let isLeftChild = true;
    while (current.value != value) {
      parent = current;
      if (value < current.value) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }
      if (current == null) {
        return;
      }
    }
    if (current.left == null && current.right == null) {
      if (current == this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
  }
  minimum() {
    let current = this.root;
    let last;
    while (current != null) {
      last = current;
      current = current.left;
    }
    return last;
  }
  maximum() {
    let current = this.root;
    let begin;
    while (current != null) {
      begin = current;
      current = current.right;
    }
    return begin;
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
}

let array = [-10, -3, 0, 5, 9];
const myBST = new BST(array);
console.log(myBST.find(5));
myBST.insert(10);
myBST.prettyPrint();
