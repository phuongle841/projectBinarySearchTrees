const { BST } = require("./BST");
function getRandomArray() {
  let result = [];
  for (let i = 0; i < 10; i++) {
    result.push(randomIntFromInterval(0, 100));
  }
  return result;
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function procedure() {
  let array = getRandomArray();
  console.log(array);
  const testBst = new BST(array);
  console.log("Is the tree balanced: " + testBst.isBalanced());
  console.log(testBst.inOrderTraversal());
  console.log(testBst.preOrder());
  console.log(testBst.postOrder());
  testBst.insert(101);
  testBst.insert(102);
  testBst.insert(103);
  testBst.insert(104);
  testBst.insert(105);
  testBst.prettyPrint();
  console.log("Is the tree balanced: " + testBst.isBalanced());
  testBst.reBalance();
  console.log("Is the tree balanced: " + testBst.isBalanced());
  console.log(testBst.inOrderTraversal());
  console.log(testBst.preOrder());
  console.log(testBst.postOrder());
}
module.exports.procedure = procedure;
