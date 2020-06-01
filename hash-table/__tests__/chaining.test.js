const { ChainingHashTable } = require('../chaining.js')

let chainingHashTable

const insertMultipleItems = (items) => {
  items.forEach(({ value, key }) => {
    chainingHashTable.insert(value, key)
  })
}

const deleteMultipleItems = (items) => {
  items.forEach(({ key }) => {
    chainingHashTable.delete(key)
  })
}

describe('Doubly linked list', () => {
  beforeEach(() => {
    chainingHashTable = new ChainingHashTable()
  })

  describe('insert', () => {
    it('should insert a item correctly', () => {
      expect(chainingHashTable.size).toBe(0)
      chainingHashTable.insert(100, 1)
      expect(chainingHashTable.size).toBe(1)
      expect(chainingHashTable.arr[1].valueAt(0)).toBe(100)

      // when insert an element (100, 9) is exist in HT at index 9 % 8 = 1 % 8 = 1
      chainingHashTable.insert(101, 9)
      expect(chainingHashTable.arr[1].valueAt(1)).toBe(101)
    })

    it('should extend HT capacity when its size equals to its capacity', () => {
      const items = [
        { key: 0, value: 100 },
        { key: 1, value: 101 },
        { key: 2, value: 102 },
        { key: 3, value: 103 },
        { key: 4, value: 104 },
        { key: 5, value: 105 },
        { key: 6, value: 106 },
        { key: 7, value: 107 },
      ]
      insertMultipleItems(items)
      expect(chainingHashTable.size).toBe(8)
      expect(chainingHashTable.capacity).toBe(16)
    })
  })

  describe('delete', () => {
    it('should delete an item which its length is 1 correctly', () => {
      expect(chainingHashTable.size).toBe(0)
      chainingHashTable.insert(100, 0)
      expect(chainingHashTable.size).toBe(1)
      chainingHashTable.delete(0)
      expect(chainingHashTable.size).toBe(0)
    })

    it('should delete an item which its length is more than 1 correctly', () => {
      expect(chainingHashTable.size).toBe(0)
      chainingHashTable.insert(100, 0)
      chainingHashTable.insert(108, 8)
      expect(chainingHashTable.size).toBe(1)
      chainingHashTable.delete(0)
      expect(chainingHashTable.arr[0].length).toBe(1)
    })

    it('should shrink HT capacity when its size smaller than its capacity / 4', () => {
      const items = [
        { key: 0, value: 100 },
        { key: 1, value: 101 },
        { key: 2, value: 102 },
        { key: 3, value: 103 },
        { key: 4, value: 104 },
        { key: 5, value: 105 },
        { key: 6, value: 106 },
        { key: 7, value: 107 },
        { key: 8, value: 108 },
      ]
      insertMultipleItems(items)
      deleteMultipleItems(items.slice(0, 5))

      expect(chainingHashTable.size).toBe(4)
      expect(chainingHashTable.capacity).toBe(8)
    })
  })

  describe('search', () => {
    it('should return value with valid key correctly', () => {
      const item = { key: 1, value: 100}
      chainingHashTable.insert(item.value, item.key)
      expect(chainingHashTable.search(item.key)).toBe(item.value)
    })
    it('should not return value invalid correctly', () => {
      const item = { key: 1, value: 100}
      const invalidKey = 2
      
      expect(chainingHashTable.search(item.key)).toBeFalsy()
      chainingHashTable.insert(item.value, item.key)
      expect(chainingHashTable.search(invalidKey)).toBeFalsy()
    })
  })

});