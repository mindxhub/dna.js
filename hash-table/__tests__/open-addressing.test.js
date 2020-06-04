const { OpenAddressingHT } = require('../open-addressing')

let openAddressingHT

const insertMultipleItems = (items) => {
  items.forEach(({ key, value }) => {
    openAddressingHT.insert(key, value)
  })
}

const deleteMultipleItems = (items) => {
  items.forEach(({ key }) => {
    openAddressingHT.delete(key)
  })
}

describe('OpenAddressingHT', () => {
  beforeEach(() => {
    openAddressingHT = new OpenAddressingHT()
  })
  describe('insert', () => {
    it('should insert a item correctly', () => {
      expect(openAddressingHT.size).toBe(0)
      openAddressingHT.insert(1, 1002)
      expect(openAddressingHT.size).toBe(1)
      expect(openAddressingHT.search(1)).toBe(1002)
    })

    it('should extend HT capacity when it reaches UPPER_LOAD_FACTOR', () => {
      const items = [
        { key: 1, value: 101 },
        { key: 2, value: 102 },
        { key: 3, value: 103 },
        { key: 4, value: 104 },
        { key: 5, value: 105 },
        { key: 6, value: 106 },
        { key: 7, value: 107 },
      ]
      insertMultipleItems(items)
      expect(openAddressingHT.size).toBe(7)
      expect(openAddressingHT.capacity).toBe(16)
    })
  })

  describe('delete', () => {
    beforeEach(() => {
      const items = [
        { key: 1, value: 101 },
        { key: 2, value: 102 },
        { key: 3, value: 103 },
        { key: 4, value: 104 },
        { key: 5, value: 105 },
        { key: 6, value: 106 },
        { key: 7, value: 107 },
      ]
      insertMultipleItems(items)
    })
    it('should delete a item correctly', () => {
      expect(openAddressingHT.search(1)).toBe(101)
      openAddressingHT.delete(1)
      expect(openAddressingHT.search(1)).toBeFalsy()
      expect(openAddressingHT.size).toBe(6)
    })

    it('should shrink HT capacity when it reaches LOWER_LOAD_FACTOR', () => {
      const items = [
        { key: 1, value: 101 },
        { key: 2, value: 102 },
        { key: 3, value: 103 },
        { key: 4, value: 104 },
        { key: 5, value: 105 },
      ]
      deleteMultipleItems(items)
      
      expect(openAddressingHT.size).toBe(2)
      expect(openAddressingHT.capacity).toBe(8)
    })
  })

  describe('search', () => {
    it('should return value with valid key correctly', () => {
      const item = { key: 1, value: 101}
      openAddressingHT.insert(item.key, item.value)
      expect(openAddressingHT.search(item.key)).toBe(item.value)
    })

    it('should not return value invalid correctly', () => {
      const invalidKey = 2
      
      expect(openAddressingHT.search(invalidKey)).toBeFalsy()
    })
  })
})