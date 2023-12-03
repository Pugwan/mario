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

describe('checkcointobuy', () => {
  test('should return "Not enough coin" if total coin is less than skin price', async () => {
    const item = 150 // Assuming the item costs 150 coins
    const result = await checkcointobuy(item);
    expect(result).toBe('Not enough coin');
  });

  test('Return the remaining coins after subtracting the item price.', async () => {
    const item = 50  // Assuming the item costs 50 coins
    const result = await checkcointobuy(item);
    expect(result).toBe(50); // 100 (initial coins) - 50 (item price) = 50
  });

  test('should throw and log an error if getUserId fails', async () => {
    getUserId.mockRejectedValue('Error');
    await expect(checkcointobuy(50)).rejects.toEqual('Error');
    expect(console.error).toHaveBeenCalled(); // Ensure error was logged
  });
});


// describe('buyItem', () => {
//   let checkcoin;

//   beforeEach(() => {
//     checkcoin = jest.fn(); // Reset the mock function for each test
//   });

//   test('should handle successful purchase', async () => {
//     const itemname = 'Item2';
//     const itemprice = 50;

//     // Mocking the checkcointobuy function to return enough coins (50)
//     checkcoin.mockResolvedValue(50);

//     // Running the buyItem function with the item object
//     await buyItem(itemname, itemprice);

//     // Asserting the expected function calls and behavior after a successful purchase
//     expect(checkcoin).toHaveBeenCalledWith(itemprice);
//     expect(getUserId).toHaveBeenCalled();
//     expect(ID.unique).toHaveBeenCalled();
//     expect(database.createDocument).toHaveBeenCalled();
//     expect(database.updateDocument).toHaveBeenCalledWith(
//       '6555bf6a5887f8344b6c',
//       '6555bf92364ff69f80d2',
//       'mockUserId',
//       {
//         userId: 'mockUserId',
//         coin: 50,
//       }
//     );
//     expect(alert).toHaveBeenCalledWith('Buy successfully!');
//     expect(go).toHaveBeenCalledWith('shop');
//     expect(showCoin).toHaveBeenCalled();
//   });

//   test('should handle insufficient coins', async () => {
//     // Mock checkcointobuy to return 'Not enough coin'
//     checkcoin.mockResolvedValue('Not enough coin');

//     const itemname = 'Item2';
//     const itemprice = 200;

//     await buyItem(itemname, itemprice);

//     // Assert calls and behavior when coins are insufficient
//     expect(checkcoin).toHaveBeenCalledWith(itemprice);
//     expect(alert).toHaveBeenCalledWith('Not enough coin!');
//     // Add more assertions if needed for this scenario
//   });

//   test('should handle errors', async () => {
//     // Mock checkcointobuy to throw an error
//     checkcointobuy.mockRejectedValue('Some error');

//     const itemname = 'Item2';
//     const itemprice = 500;

//     await buyItem(itemname, itemprice);

//     // Assert calls and behavior when an error occurs
//     expect(checkcointobuy).toHaveBeenCalledWith(itemprice);
//     expect(console.error).toHaveBeenCalled();
//     // Add more assertions if needed for error handling
//   });
// });


