const { BinarySearchTree } = require('../binary-search-tree/binary-search-tree')
const { BinarySearchTreeNode } = require('../binary-search-tree/binary-search-tree-node')

class AVLTree extends BinarySearchTree {
  // Insert the given data into tree
  insert(value) {
    super.insert(value)
    let curNode = this.root.find(value)

    while (curNode) {
      this.balance(curNode)
      curNode = curNode.parent
    }
  }

  // Delete the given data into tree
  delete(value) {
    super.delete(value)
    this.balance(this.root)
  }

  // Use to re-balance tree after inserting or deleting a node
  balance(node) { 
    if (node.balanceFactor < -1) {
      if (node.right.right === null) {
        this.rotateRight(node.right)
      }
      this.rotateLeft(node)
    } else if (node.balanceFactor > 1) {
      if (node.left.left === null) {
        this.rotateLeft(node.left)
      }
      this.rotateRight(node)
    }
  }

  // Left rotate at given node
  rotateLeft(rootNode) {
    const rightNode = rootNode.right
    const rightNodeLeftChild = rightNode.left
    const rightNodeRightChild = rightNode.right
    const newNode = new BinarySearchTreeNode(rootNode.value)

    newNode.setRight(rightNodeLeftChild)
    newNode.setLeft(rootNode.left)
    rootNode.setValue(rightNode.value)
    rootNode.setLeft(newNode)
    rootNode.setRight(rightNodeRightChild)
  }

  // Right rotate at given node
  rotateRight(rootNode) {
    const leftNode = rootNode.left
    const leftNodeLeftChild = leftNode.left
    const leftNodeRightChild = leftNode.right
    const newNode = new BinarySearchTreeNode(rootNode.value)

    newNode.setLeft(leftNodeRightChild)
    newNode.setRight(rootNode.right)
    rootNode.setValue(leftNode.value)
    rootNode.setLeft(leftNodeLeftChild)
    rootNode.setRight(newNode )
  }
}

module.exports = { AVLTree }
