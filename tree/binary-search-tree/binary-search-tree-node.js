const { BinaryTreeNode } = require('../binary-tree-node')

class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value) {
    super(value)
  }

  insert(value) {
    // tree is empty
    if (this.value === null) {
      this.value = value
      return this
    }

    if (value < this.value) {
      if (this.left) {
        return this.left.insert(value)
      }

      const newNode = new BinarySearchTreeNode(value)
      this.setLeft(newNode)

      return newNode
    }

    if (value > this.value) {
      if (this.right) {
        return this.right.insert(value)
      }

      const newNode = new BinarySearchTreeNode(value)
      this.setRight(newNode)

      return newNode
    }

  }

  delete(value) {
    const nodeToRemove = this.find(value)
    if (!nodeToRemove) return false
    let { parent } = nodeToRemove
    
    // nodeToRemove has no children
    if (nodeToRemove.left === null && nodeToRemove.right === null) {
      if (parent === null) {
        this.setValue(undefined)
        return 
      }
      parent.removeChild(nodeToRemove)
    }

    // nodeToRemove has only one child
    if (nodeToRemove.left === null || nodeToRemove.right === null) {
      const childNode = nodeToRemove.left || nodeToRemove.right

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode)
      } else {
        // nodeToRemove is the root node
        BinaryTreeNode.copyNode(childNode, nodeToRemove)
      }
    }

    // nodeToRemove have 2 children
    if (nodeToRemove.left && nodeToRemove.right) {
      // find smallest value of right sub tree of nodeToRemove
      const minRightNode = nodeToRemove.right.findMin()
      
      // when nodeToRemove have left subtree
      if (!(nodeToRemove.right.value === minRightNode.value)) {
        this.delete(minRightNode.value)
        nodeToRemove.setValue(minRightNode.value)
      } else {
        // when nodeToRemove doesn't have left subtree
        nodeToRemove.setValue(nodeToRemove.right.value)
        nodeToRemove.setRight(nodeToRemove.right.right)
      } 
    }

    // clear the parent of removed node
    parent = null
    return true

  }

  find(value) {
    if (value === this.value) {
      return this
    }

    if (value < this.value) {
      return this.left ? this.left.find(value) : null
    }

    if (value > this.value) {
      return this.right ? this.right.find(value) : null
    }

    return null
  }

  findMin() {
    if (!this.left) {
      return this
    }
    return this.left.findMin()
  }
}

module.exports = { BinarySearchTreeNode }