const { Node, DoublyLinkedList } = require('../linked-list/doubly-linked-list')

class ChainingHashTable {
  constructor(capacity = 8) {
    this.arr = new Array(capacity)
    this.capacity = capacity
    this.size = 0
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
    
    if (!this.arr[index]) return
    if (this.arr[index] && this.arr[index].length > 1) {
      let cur = this.arr[index].tail
      let count = 0
      while (cur) {
        if (cur.key === key) {
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

  // private methods
  hash(key) {
    return key % this.capacity
  }

  extendCapacity() {
    this.capacity *= 2
    const { newArr, length } = this.clone(this.arr, this.size)
    this.arr = newArr
    this.size = length
  }

  shrinkCapacity() {
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
      if (arr[i].length > 1) {
        let cur = arr[i].head
        while (cur) {
          const index = this.hash(cur.key)
          if (newArr[index]) {
            newArr[index].pushBack(cur.value, cur.key)
          } else {
            const linkList = new DoublyLinkedList()
            linkList.pushBack(cur.value, cur.key)
            newArr[index] = linkList
            length++
          }
          cur = cur.next
        }
      } else {
        const linkList = new DoublyLinkedList()
        const item = arr[i].head
        const index = this.hash(item.key)
        linkList.pushBack(item.value, item.key)
        newArr[index] = linkList
        length++
      } 
    }
    return { newArr, length }
  }
}

module.exports = { ChainingHashTable }