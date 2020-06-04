const DEFAULT_CAPACITY = 8
const UPPER_LOAD_FACTOR = 0.7
const LOWER_LOAD_FACTOR = 0.25
const GROW_SHRINK_FACTOR = 2

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.deleted = false
  }
}

class OpenAddressingHT {
  constructor() {
    this.arr = new Array(DEFAULT_CAPACITY)
    this.capacity = DEFAULT_CAPACITY
    this.size = 0
  }

  insert(key, value) {
    const { curNode, index } = this.__search(key)

    if (!curNode || curNode.deleted) {
      const node = new Node(key, value)
      this.arr[index] = node
      this.size++
      if (this.__getGrowShrinkFactor() >= UPPER_LOAD_FACTOR) {
        this.__grow()
      }
      return
    } 

    if (curNode.key === key) {
      this.arr[index].value = value
      return
    }
  }

  search(key) {
    const { curNode } = this.__search(key)
    return curNode ? curNode.value : curNode
  }

  delete(key) {
    const { curNode, index } = this.__search(key)
    if (!curNode) return 
  
    this.arr[index].deleted = true
    this.size--
    if (this.__getGrowShrinkFactor() <= LOWER_LOAD_FACTOR && this.capacity > DEFAULT_CAPACITY) {
      this.__shrink()
    }
  }

  __search(key) {
    let trial = 1

    while (trial <= this.capacity) {
      const index = this.__doubleHash(key, trial)
      const curNode = this.arr[index]

      if (!curNode) return { curNode: null, index }

      if (curNode.key === key && !curNode.deleted) {
        return { curNode, index }
      }
      trial++
    }
  }

  __grow() {
    const newCapacity = this.capacity * GROW_SHRINK_FACTOR
    this.__rehash(newCapacity)
  }

  __shrink() {
    const newCapacity = this.capacity / GROW_SHRINK_FACTOR
    this.__rehash(newCapacity)
  }

  __rehash(newCapacity) {
    const oldCapacity = this.capacity
    const oldArr = this.arr
    
    this.capacity = newCapacity
    this.arr = new Array(this.capacity)
    this.size = 0

    for (let i = 0; i < oldCapacity; i++) {
      if (oldArr[i] && oldArr[i].deleted === false) {
        this.insert(oldArr[i].key, oldArr[i].value)
      }
    }
  }

  __getGrowShrinkFactor() {
    return this.size / this.capacity
  }
  
  __doubleHash(k, trial) {
    return (this.__hash1(k) + trial * this.__hash2(k)) % this.capacity
  }

  __hash1(key) {
    return key % this.capacity
  }

  __hash2(key) {
    return this.__nearestPrime(this.capacity) - (key % this.__nearestPrime(this.capacity))
  }

  __nearestPrime(k) {
    return k - 1
  }
}

module.exports = { OpenAddressingHT }
