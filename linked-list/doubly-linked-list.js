/*
<===============Implement Doubly Linked List===============>
*/

class Node {
  constructor(value, key) {
    this.value = value
    this.key = key ? key : null
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  // size(): Return number of nodes are currently stored in list.
  size() {
    return this.length
  }

  // isEmpty(): Determine list is empty or not.
  isEmpty() {
    return !this.length
  }

  // valueAt(index): Return value of node at given index.
  valueAt(index) {
    if (!isValid(this.length, index)) {
      return -1
    }

    let curr = this.head
    let count = 0
    while(curr) {
      if (count === index) return curr.value
      count++
      curr = curr.next
    }
    return -1
  }

  // pushFront(item): Add a node with value to the front of list.
  pushFront(value, key) {
    const newNode = new Node(value, key)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.head.prev = newNode
      newNode.next = this.head
      this.head = newNode
    }
    this.length += 1
  }

  // popFront(): Remove front node and return its value.
  popFront() {
    if (this.isEmpty()) return false
    let headNode = this.head
    let nextHeadNode = this.head.next

    this.head.next = null
    nextHeadNode.prev = null
    this.head = nextHeadNode
    return headNode.value
  }

  // pushBack(value): Add a node with value to the end of list.
  pushBack(value, key) {
    const newNode = new Node(value, key)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    this.length += 1
  }

  // popBack(): Remove last node and return its value.
  popBack() {
    if (this.isEmpty()) return false
    let nodeTail = this.tail
    let prevTail = this.tail.prev

    this.tail.prev = null
    prevTail.next = null
    this.tail = prevTail
    return nodeTail.value
  }

  // front(): Return value of front node.
  front() {
    if (this.isEmpty()) return null
    if (this.length === 1) return this.head.value
    return this.head.value
  }

  // back(): Return value of last node.
  back() {
    if (this.isEmpty()) return null
    if (this.length === 1) return this.head.value
    return this.head.value
  }

  // insert(value, index): Insert a node with value at given index.
  insert(value, index) {
    if (index < 0 || index > this.length) return null
    else if (index === 0) {
      return this.pushFront(value)
    } else if (index === this.length) {
      return this.pushBack(value)
    } else {
      let newNode = new Node(value)
      let temp = this.head
      let prevNode, currNode
      let count = 0
  
      while(temp) {
        if (count === index) {
          currNode = temp
          prevNode = temp.prev
          break
        }
        count++
        temp = temp.next
      }
      prevNode.next = newNode
      newNode.prev = prevNode
      newNode.next = currNode
      currNode.prev = newNode
      this.length++
    }
    
  }

  // removeAt(index): Remove node at given index.
  removeAt(index) {
    if (!this.length || index < 0 || index >= this.length) return null
    else if (index === 0) {
      return this.popFront()
    } else if (index === this.length - 1) {
      return this.popBack()
    } else {
      let temp = this.head
      let prevNode, currNode, nextNode
      let count = 0
  
      while(temp) {
        if (count === index) {
          prevNode = temp.prev
          currNode = temp
          nextNode = temp.next
          break
        }
        count++
        temp = temp.next
      }
      prevNode.next = nextNode
      nextNode.prev = prevNode
      currNode.next = null
      currNode.prev = null
      this.length--
    }
  }

  // print list
  printList() {
    let temp = this.head
    let list = ''

    while(temp) {
      if (temp.value !== undefined) {
        list += temp.value + ', '
      }
      temp = temp.next
    }
    console.log(list)
  }
}

/*
const doublyLinkedList = new DoublyLinkedList()
doublyLinkedList.pushFront(100)
doublyLinkedList.pushFront(12)
doublyLinkedList.pushFront(2)
doublyLinkedList.pushBack(200)
doublyLinkedList.popBack()
doublyLinkedList.removeAt(0)
doublyLinkedList.popFront()
doublyLinkedList.printList()
*/

module.exports ={ Node, DoublyLinkedList }