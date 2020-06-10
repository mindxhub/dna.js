const { AVLTree } = require('../avl-tree.js')

let avlTree

describe('AVLTree', () => {
  beforeEach(() => {
    avlTree = new AVLTree()
    insertMultipleNodes()
  })

  it('should insert a node correctly', () => {
    expect(avlTree.root.traverseInOrder().join(', ')).toBe('6, 8, 9, 18, 20, 21, 22, 43, 50, 51, 62, 63')
  })

  it('should delete a node correctly', () => {
    avlTree.delete(51)
    avlTree.delete(43)
    expect(avlTree.root.traverseInOrder().join(', ')).toBe('6, 8, 9, 18, 20, 21, 22, 50, 62, 63')

    avlTree.delete(20)
    avlTree.delete(21)
    expect(avlTree.root.traverseInOrder().join(', ')).toBe('6, 8, 9, 18, 22, 50, 62, 63')

    avlTree.delete(18)
    expect(avlTree.root.traverseInOrder().join(', ')).toBe('6, 8, 9, 22, 50, 62, 63')

    avlTree.delete(6)
    avlTree.delete(9)
    avlTree.delete(8)
    expect(avlTree.root.traverseInOrder().join(', ')).toBe('22, 50, 62, 63')

    avlTree.delete(63)
    expect(avlTree.root.traverseInOrder().join(', ')).toBe('22, 50, 62')

    avlTree.delete(22)
    avlTree.delete(50)
    avlTree.delete(62)
    expect(avlTree.root.traverseInOrder().join(', ')).toBe('')
  })
})

// Insert [43, 18, 22, 9, 21, 6, 8, 20, 63, 50, 62, 51]
const insertMultipleNodes = () => {
  expect(avlTree.root.value).toBeFalsy()
    
  avlTree.insert(43)
  avlTree.insert(18)
  avlTree.insert(22)
  // left-right rotation => [18, 22, 43]
  expect(avlTree.root.traverseInOrder().join(', ')).toBe('18, 22, 43')

  avlTree.insert(9)
  avlTree.insert(21)
  avlTree.insert(6)
  // right rotation => [6, 9, 18, 21, 22, 43]
  expect(avlTree.root.traverseInOrder().join(', ')).toBe('6, 9, 18, 21, 22, 43')

  avlTree.insert(8)
  // left-right rotation => [6, 8, 9, 18, 21, 22, 43]
  expect(avlTree.root.traverseInOrder().join(', ')).toBe('6, 8, 9, 18, 21, 22, 43')

  avlTree.insert(20)
  avlTree.insert(63)
  avlTree.insert(50)
  // right-left rotation => [6, 8, 9, 18, 20, 21, 22, 43, 50, 63]
  expect(avlTree.root.traverseInOrder().join(', ')).toBe('6, 8, 9, 18, 20, 21, 22, 43, 50, 63')

  avlTree.insert(62)
  // left rotation => [6, 8, 9, 18, 20, 21, 22, 43, 50, 62, 63]
  expect(avlTree.root.traverseInOrder().join(', ')).toBe('6, 8, 9, 18, 20, 21, 22, 43, 50, 62, 63')

  avlTree.insert(51)
  // right rotation => [6, 8, 9, 18, 20, 21, 22, 43, 50, 51, 62, 63]
}