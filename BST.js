const { node } = require("./node");

class BST {
  root = null;
  array = null;
  constructor(array) {
    array.sort(this.compareNumbers);
    this.array = this.filterDuplicate(array);
    this.root = this.buildTree(this.array, 0, this.array.length);
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

  inOrderTraversal() {
    let result = [];
    this.#inOrderHelper(this.root, result);
    return result;
  }
  #inOrderHelper(root, result) {
    if (root !== null) {
      this.#inOrderHelper(root.left, result);
      result.push(root.value);
      this.#inOrderHelper(root.right, result);
    }
  }

  preOrder() {
    let result = [];
    this.#preOrderHelper(this.root, result);
    return result;
  }
  #preOrderHelper(root, result) {
    if (root !== null) {
      result.push(root.value);
      this.#preOrderHelper(root.left, result);
      this.#preOrderHelper(root.right, result);
    }
  }

  postOrder(localRoot = this.root) {
    let result = [];
    this.#postOrderHelper(this.root, result);
    return result;
  }
  #postOrderHelper(root, result) {
    if (root !== null) {
      this.#postOrderHelper(root.left, result);
      this.#postOrderHelper(root.right, result);
      result.push(root.value);
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
    } else if (current.right == null) {
      if (current == this.root) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.right;
      }
    } else if (current.left == null) {
      if (current == this.root) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.left;
      }
    } else {
      let successor = this.#getSuccessor(current);
      if (current == this.root) {
        this.root = successor;
      } else if (isLeftChild) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
      successor.left = current.left;
    }
    return true;
  }
  #getSuccessor(deleteNode) {
    let successorParent = this.root;
    let successor = deleteNode;
    let current = deleteNode.right;
    while (current != null) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }
    if (successor != deleteNode.right) {
      successorParent.left = successor.right;
      successor.right = deleteNode.right;
    }
    return successor;
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
  levelOrderTraversal() {
    if (this.root == null) {
      return;
    }
    let q = [];
    q.push(this.root);
    let ans = [];
    while (q.length != 0) {
      let qLength = q.length;
      let row = [];
      for (let i = 0; i < qLength; i++) {
        let current = q.shift();
        row.push(current.value);
        if (current.left != null) {
          q.push(current.left);
        }
        if (current.right != null) {
          q.push(current.right);
        }
      }
      ans.push(row);
    }
    return ans;
  }
  height(root) {
    if (root === undefined || root === null) {
      return 0;
    }
    return Math.max(height(root.left), height(root.right)) + 1;
  }
  depth(value, node = this.root, depth = 0) {
    if (node == null) {
      return;
    }
    if (node.value == value) {
      return depth;
    }
    if (node.value < value) {
      return this.depth(value, node.right, depth + 1);
    } else {
      return this.depth(value, node.left, depth + 1);
    }
  }
  isBalanced() {
    if (this.root == null) {
      true;
    }
    if (this.height(this.root) == -1) {
      return false;
    }
  }
  isBalanced = function (root = this.root) {
    // If the tree is empty, we can say it’s balanced...
    if (root == null) return true;
    // Height Function will return -1, when it’s an unbalanced tree...
    if (this.Height(root) == -1) return false;
    return true;
  };
  Height(root) {
    if (root == null) {
      return 0;
    }
    let leftHeight = this.Height(root.left);
    let rightHeight = this.Height(root.right);
    if (leftHeight == -1 || rightHeight == -1) {
      return -1;
    }
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }
    return Math.max(leftHeight, rightHeight) + 1;
  }
  reBalance() {
    this.array = this.inOrderTraversal().filter((value) => value != undefined);
    this.root = this.buildTree(this.array, 0, this.array.length);
  }
}
module.exports.BST = BST;
