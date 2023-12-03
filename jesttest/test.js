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


// Import the function to be tested
require('../game');

describe('buyItem function', () => {
  beforeEach(() => {
    // Clear mock calls and reset mock behaviors before each test
    jest.clearAllMocks();
  });

  it('should buy an item successfully', async () => {
    // Mock the necessary return values for successful item purchase
    const price = 10;
    const userId = 'user123';
    const coincurrent = 20;

    // Mock the behavior of functions used within buyItem
    checkcointobuy= jest.fn().mockResolvedValue(coincurrent); // Updated mock function name
    getUserId.mockResolvedValue(userId);
    ID.unique.mockReturnValue('newDocumentId');

    // Simulate the database operations to be successful
    database.createDocument.mockResolvedValue();
    database.updateDocument.mockResolvedValue();

    // Call buyItem function
    await buyItem('ItemName', price);

    // Check if functions were called with the correct parameters
    expect(checkcointobuy).toHaveBeenCalledWith(price); // Updated mock function name
    expect(getUserId).toHaveBeenCalled();
    expect(ID.unique).toHaveBeenCalled();
    expect(database.createDocument).toHaveBeenCalledWith(
      '6555bf6a5887f8344b6c',
      '6562165e1490741e8632',
      'newDocumentId',
      {
        userId: userId,
        skins: 'ItemName'
      }
    );
    expect(database.updateDocument).toHaveBeenCalledWith(
      '6555bf6a5887f8344b6c',
      '6555bf92364ff69f80d2',
      userId,
      {
        userId: userId,
        coin: coincurrent
      }
    );
    expect(alert).toHaveBeenCalledWith('Buy successfully!');
    expect(go).toHaveBeenCalledWith('shop');
    expect(showCoin).toHaveBeenCalled();
  });

  // Add more test cases for error scenarios, edge cases, etc.
});
