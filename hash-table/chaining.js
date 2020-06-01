const { Node, DoublyLinkedList } = require('../linked-list/doubly-linked-list')

const DEFAULT_CAPACITY = 8
class ChainingHashTable {
  constructor() {
    this.arr = new Array(DEFAULT_CAPACITY)
    this.capacity = DEFAULT_CAPACITY
    this.size = 0
  }

  insert(value, key) {
    const index = this.hash(key)
    if (!this.arr[index]) {
      const linkList = new DoublyLinkedList()
      linkList.pushFront(value, key)
      this.arr[index] = linkList
      this.size++
      if (this.size === this.capacity) {
        this.grow()
      }
      return
    }

    const isExisting = this.search(key)
    if (!isExisting) {
      this.arr[index].pushBack(value, key)
      return
    }
    let cur = this.arr[index].tail
    while (cur) {
      if (cur.key === key) {
        cur.value = value
        break
      }
      cur = cur.prev
    }
  }

  delete(key) {
    const index = this.hash(key)
    
    if (!this.arr[index]) return
    if (this.arr[index].length === 1) {
      this.arr[index] = undefined
      this.size--
      if (this.capacity > DEFAULT_CAPACITY && this.size <= Math.floor(this.capacity / 4)) {
        this.shrink()
      }
      return
    }
    
    let cur = this.arr[index].tail
    let count = 0
    while (cur) {
      if (cur.key === key) {
        let length = this.arr[index].length
        this.arr[index].removeAt(length - count - 1)
        break
      }
      count++
      cur = cur.prev
    } 
  }

  search(key) {
    if (!this.size) return null
    const index = this.hash(key)
    
    if (!this.arr[index]) {
      return null
    }

    let cur = this.arr[index].tail
    while (cur) {
      if (cur.key === key) {
        return cur.value
      }
      cur = cur.prev
    }
  }

  // private methods
  hash(key) {
    return key % this.capacity
  }

  grow() {
    this.capacity *= 2
    let { newArr, length } = this.clone(this.arr, this.size)
    if (length === this.capacity) {
      do {
        this.capacity *= 2
        const res = this.clone(this.arr, this.size)
        length = res.length
        if (length < this.capacity) {
          newArr = res.newArr
        }
      } while (length < this.capacity)
    }
    this.arr = newArr
    this.size = length
  }

  shrink() {
    const oldCapacity = this.capacity
    this.capacity /= 2
    const { newArr, length } = this.clone(this.arr, oldCapacity)
    this.arr = newArr
    this.size = length
  }

  clone(arr, size) {
    let newArr = new Array(this.capacity)
    let length = 0

    for (let i = 0; i < size; i++) {
      if (!arr[i]) continue
      if (arr[i].length === 1) {
        const linkList = new DoublyLinkedList()
        const item = arr[i].head
        const index = this.hash(item.key)
        linkList.pushBack(item.value, item.key)
        newArr[index] = linkList
        length++
      } else {
        let cur = arr[i].head
        while (cur) {
          if (length === this.capacity) return { newArr, length }
          const index = this.hash(cur.key)
          if (newArr[index]) {
            newArr[index].pushBack(cur.value, cur.key)
            continue
          }
          const linkList = new DoublyLinkedList()
          linkList.pushBack(cur.value, cur.key)
          newArr[index] = linkList
          length++
          cur = cur.next
        }
      } 
    }

    return { newArr, length }
  }
}

module.exports = { ChainingHashTable }