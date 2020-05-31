const { Node, DoublyLinkedList } = require('../linked-list/doubly-linked-list')

class ChainingHashTable {
  constructor(capacity = 8) {
    this.arr = new Array(capacity)
    this.capacity = capacity
    this.size = 0
  }

  hash(key) {
    return key % this.capacity
  }

  insert(value, key) {
    const index = this.hash(key)
    if (!this.arr[index]) {
      const linkList = new DoublyLinkedList()
      linkList.pushFront(value, key)
      this.arr[index] = linkList
      this.size++
    } else {
      const isExisting = this.search(key)
      if (isExisting) {
        let cur = this.arr[index].tail
        while (cur) {
          if (cur.key === key) {
            cur.value = value
            break
          }
          cur = cur.prev
        }
      } else {
        this.arr[index].pushBack(value, key)
      }
    }

    if (this.size === this.capacity) {
      this.extendCapacity()
    }
  }

  delete(key) {
    const index = this.hash(key)
    if (this.arr[index] && this.arr[index].length > 1) {
      let cur = this.arr[index].tail
      let count = 0
      
      while (cur) {
        if (cur.value.value === key) {
          let len = this.arr[index].length
          this.arr[index].removeAt(len - count - 1)
          break
        }
        count++
        cur = cur.prev
      }
    } else {
      this.arr[index] = undefined
      this.size--
    }
    if (this.capacity > 8 && this.size <= Math.floor(this.capacity / 4)) {
      this.shrinkCapacity()
    }
  }

  search(key) {
    if (!this.size) return null
    const index = this.hash(key)
    
    if (!this.arr[index]) {
      return null
    } else {
      let cur = this.arr[index].tail
      while (cur) {
        if (cur.key === key) {
          return cur.value
        }
        cur = cur.prev
      }
    }
    return null
  }

  extendCapacity() {
    this.capacity *= 2
    this.arr = this.clone(this.arr, this.size)
  }

  shrinkCapacity() {
    const oldCapacity = this.capacity
    this.capacity /= 2
    this.arr = this.clone(this.arr, oldCapacity)
  }

  clone(arr, size) {
    let newArr = new Array(this.capacity)

    for (let i = 0; i < size; i++) {
      if (arr[i]) {
        const linkList = new DoublyLinkedList()
        let cur = arr[i].head
        const index = this.hash(arr[i].head.key)
        
        while (cur) {
          linkList.pushBack(cur.value, cur.key)
          cur = cur.next
        }
        newArr[index] = linkList
      }
    }
    return newArr
  }
}

/**
const HT = new ChainingHashTable()
HT.insert(10, 3)
HT.insert(10, 11)
HT.insert(12, 11)
HT.insert(11, 10)
HT.insert(11, 10)
HT.insert(12, 11)
HT.insert(12, 13)
HT.insert(12, 14)
HT.insert(12, 15)
HT.insert(12, 16)
HT.insert(12, 17)
HT.insert(12, 12)

HT.delete(3)
HT.delete(11)
HT.delete(10)
HT.delete(13)
HT.delete(14)
HT.delete(15)
*/


module.exports = { ChainingHashTable }