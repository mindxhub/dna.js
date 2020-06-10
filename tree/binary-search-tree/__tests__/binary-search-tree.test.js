/**
 * Test input:
 * A Binary search tree:
 *          50
 *        /    \
 *      30      70
 *     /  \    /  \
 *    20  40  60  80
 *                  \
 *                   90 
 */

const { BinarySearchTree } = require('../binary-search-tree')

 describe('BinarySearchTree', () => {
  let BST

  beforeEach(() => {
    BST = new BinarySearchTree()
  })

  describe('insert', () => {
    it('should insert a node correctly when BST is empty', () => {
      expect(BST.root.value).toBeFalsy()
      BST.insert(50)
      expect(BST.root.value).toBe(50)
      expect(BST.root.parent).toBe(null)
      BST.insert(30)
      expect(BST.root.left.value).toBe(30)
      expect(BST.root.left.parent.value).toBe(50)
      BST.insert(70)
      expect(BST.root.right.value).toBe(70)
      expect(BST.root.right.parent.value).toBe(50)
      BST.insert(80)
      expect(BST.root.right.right.value).toBe(80)
      expect(BST.root.right.right.parent.value).toBe(70)
    })
  })

  describe('delete', () => {
    beforeEach(() => {
      BST.insert(50)
      BST.insert(30)
      BST.insert(20)
      BST.insert(40)
      BST.insert(70)
      BST.insert(80)
      BST.insert(60)
      BST.insert(90)
    })
    it('should delete a left leaf node which its value is 20 correctly', () => {
      expect(BST.root.left.left.value).toBe(20)
      BST.delete(20)
      expect(BST.root.left.left).toBeFalsy()
    })
    
    it('should delete a node which its value is 80 and it has 1 right sub node correctly', () => {
      expect(BST.root.right.right.value).toBe(80)
      expect(BST.root.right.right.right.value).toBe(90)
      BST.delete(80)
      expect(BST.root.right.right.value).toBe(90)
      expect(BST.root.right.right.right).toBeFalsy()
    })

    it('should delete a node correctly which its value is 70 and it have 2 children and nodeToRemove does not have left subtree', () => {
      expect(BST.root.right.value).toBe(70)
      BST.delete(70)
      expect(BST.root.right.value).toBe(80)
    })

    it('should delete a node correctly which its value is 70 and it have 2 children and nodeToRemove have left subtree', () => {
      BST.insert(75)
      expect(BST.root.right.value).toBe(70)
      BST.delete(70)
      expect(BST.root.right.value).toBe(75)
    })
  })

  describe('find', () => {
    it('should return a node which its value is 50', () => {
      expect(BST.root.value).toBeFalsy()
      BST.insert(50)
      expect(BST.find(50).value).toBe(50)
    })
  })
})