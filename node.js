class node {
  value;
  left;
  right;
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  display() {
    console.log(this.value);
  }
}
module.exports.node = node;
