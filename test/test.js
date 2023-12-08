// Mock the global functions and databaseId
getUserId = jest.fn().mockResolvedValue('mockUserId');
ID = { unique: jest.fn() };
database = {
  listDocuments: jest.fn().mockResolvedValue({
    documents: [{ coin: 100 }] // Mocking a user with 100 coins
  }),
  createDocument: jest.fn().mockResolvedValue(),
  updateDocument: jest.fn().mockResolvedValue()
};
alert = jest.fn();
go = jest.fn();
showCoin = jest.fn();
Query = {
  equal: jest.fn((field, value) => ({ field, value }))
  // Add other methods used by Query in your function, and mock their behavior
};
console.error = jest.fn(); // Mocking console.error

// Mock the databaseId
const databaseId = '6555bf6a5887f8344b6f';

// Import the functions to test
require('../game');

describe('checkcointobuy function', () => {
  test('should return "Not enough coin" if total coin is less than skin price', async () => {
    const item = 150 // Assuming the item costs 150 coins
    const result = await checkcointobuy(item);
    expect(result).toBe('Not enough coin');
  });

  test('Return the remaining coins after subtracting the item price', async () => {
    const item = 50  // Assuming the item costs 50 coins
    const result = await checkcointobuy(item);
    expect(result).toBe(50); // 100 (initial coins) - 50 (item price) = 50
  });  
});

describe('changeskin function', () => {
  it('should set the costume skin', () => {
    const skin = 'new_skin';
    changeskin(skin);
    expect(global.costume).toBe(skin);
  });

  it('should not modify the costume variable if no skin name is provided.', () => {
    changeskin(); // calling changeskin without passing a skin
    expect(global.costume).toBeUndefined();
  });
});

