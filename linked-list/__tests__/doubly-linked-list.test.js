const { DoublyLinkedList } = require('../doubly-linked-list')

describe('Doubly linked list', () => {
  let doublyLinkedList
  beforeEach(() => {
    doublyLinkedList = new DoublyLinkedList()
  })
  
  it('should return is size', () => {
    expect(doublyLinkedList.size()).toBe(0)
    doublyLinkedList.pushFront(100)
    expect(doublyLinkedList.size()).toBe(1)
  })
  
  it('should return true when it is empty', () => {
    expect(doublyLinkedList.isEmpty()).toBeTruthy()
  })
  
  it('should return false when it is not empty', () => {
    doublyLinkedList.pushFront(100)
    expect(doublyLinkedList.isEmpty()).toBeFalsy()
  })
  
  it('should return value at 0 index is 100', () => {
    expect(doublyLinkedList.valueAt(0)).toBe(null)
    doublyLinkedList.pushFront(100)
    expect(doublyLinkedList.valueAt(0)).toBe(100)
  })
  
  it('should pop front a node which value is 100', () => {
    expect(doublyLinkedList.valueAt(0)).toBeFalsy()
    doublyLinkedList.pushFront(100)
    expect(doublyLinkedList.popFront()).toBe(100)
    expect(doublyLinkedList.valueAt(0)).toBeFalsy()
  })
  
  it('should push back a node which value is 101', () => {
    doublyLinkedList.pushFront(100)
    doublyLinkedList.pushBack(101)
    expect(doublyLinkedList.valueAt(1)).toBe(101)
    expect(doublyLinkedList.length).toBe(2)
  })

  it('should pop back a node which value is 101', () => {
    doublyLinkedList.pushFront(100)
    doublyLinkedList.pushBack(101)
    expect(doublyLinkedList.popBack()).toBe(101)
    expect(doublyLinkedList.length).toBe(1)
  })

  it('should pop back a node which value is 101', () => {
    doublyLinkedList.pushFront(100)
    doublyLinkedList.pushBack(101)
    expect(doublyLinkedList.popBack()).toBe(101)
    expect(doublyLinkedList.length).toBe(1)
  })

  it('should return value of front node', () => {
    expect(doublyLinkedList.length).toBe(0)
    doublyLinkedList.pushFront(100)
    doublyLinkedList.pushBack(101)
    expect(doublyLinkedList.front()).toBe(100)
  })

  it('should return value of back node', () => {
    expect(doublyLinkedList.length).toBe(0)
    doublyLinkedList.pushFront(100)
    doublyLinkedList.pushBack(101)
    expect(doublyLinkedList.back()).toBe(101)
  })

  it('should insert a node with value is 102 at index 1', () => {
    expect(doublyLinkedList.length).toBe(0)
    doublyLinkedList.insert(100, 0)
    expect(doublyLinkedList.valueAt(0)).toBe(100)
    doublyLinkedList.pushBack(101)
    doublyLinkedList.pushBack(103)
    doublyLinkedList.insert(102, 1)
    expect(doublyLinkedList.valueAt(1)).toBe(102)
  })

  it('should remove a node with value is 102 at index 1', () => {
    expect(doublyLinkedList.length).toBe(0)
    doublyLinkedList.insert(100, 0)
    doublyLinkedList.pushBack(101)
    doublyLinkedList.pushBack(102)
    expect(doublyLinkedList.removeAt(2)).toBe(102)
    expect(doublyLinkedList.length).toBe(2)
  })
});