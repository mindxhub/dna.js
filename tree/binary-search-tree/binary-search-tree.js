const { BinarySearchTreeNode } = require('./binary-search-tree-node')

class BinarySearchTree {
  constructor() {
    this.root = new BinarySearchTreeNode(null)
  }

  insert(value) {
    return this.root.insert(value)
  }

  delete(value) {
    return this.root.delete(value)
  }

  find(value) {
    return this.root.find(value)
  }
}

module.exports = { BinarySearchTree }