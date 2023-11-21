const { JSDOM } = require('jsdom');
require('../functions');

// Create a basic DOM environment
const dom = new JSDOM();
global.document = dom.window.document;

describe('checkScore', () => {  
    test('TC1: Should update the highest score if the player achieves a new high score', () => {
    document.body.innerHTML = '<div id="highscore">80</div>';

    const result = global.checkScore(85);
    expect(parseInt(result)).toBe(85);
  });

  test('TC2: Should not change the highest score if the player achieves a score equal to the existing high score', () => {
    document.body.innerHTML = '<div id="highscore">90</div>';

    const result = global.checkScore(90);
    expect(parseInt(result)).toBe(90);
  });

  test('TC3: Should not change the highest score if the player achieves a score lower than the existing high score', () => {
    document.body.innerHTML = '<div id="highscore">95</div>';

    const result = global.checkScore(85);
    expect(parseInt(result)).toBe(95);
  });
});

describe('showhighScore', () => {
  test('TC1: should display 0 when the player has no score in the system', () => {
    getUserId = jest.fn().mockResolvedValue('mockUserId');
    listUserDocuments = jest.fn().mockResolvedValue({ documents: [] });
    document.getElementById = jest.fn().mockReturnValue({
      textContent: '', // Simulating an empty text content
    });

    return showhighScore().then((result) => {
      expect(result).toBe(0);

      // Check if getUserId and listUserDocuments have been called
      expect(getUserId).toHaveBeenCalled();
      expect(listUserDocuments).toHaveBeenCalledWith('mockUserId');
      
      // Check if document.getElementById has been called with the correct ID
      expect(document.getElementById).toHaveBeenCalledWith('highscore');
    });
  });

  test('TC2: should display the highest score when the player has a recorded score', () => {
    const mockUserId = 'mockUserId';
    const mockDocumentsResponse = {
      documents: [
        {
          highscore: 20,
        },
      ],
    };

    getUserId = jest.fn().mockResolvedValue(mockUserId);
    listUserDocuments = jest.fn().mockResolvedValue(mockDocumentsResponse);
    document.getElementById = jest.fn().mockReturnValue({
      textContent: '', // Simulating an empty text content
    });

    return showhighScore().then((result) => {
      expect(result).toBe(20);

      // Check if getUserId and listUserDocuments have been called
      expect(getUserId).toHaveBeenCalled();
      expect(listUserDocuments).toHaveBeenCalledWith(mockUserId);
      
      // Check if document.getElementById has been called with the correct ID
      expect(document.getElementById).toHaveBeenCalledWith('highscore');
    });
  });
});

describe('showCoin', () => {
  test('TC1: should display 0 when the player has no coin in the system', () => {
    getUserId = jest.fn().mockResolvedValue('mockUserId');
    listUserDocuments = jest.fn().mockResolvedValue({ documents: [] });
    document.getElementById = jest.fn().mockReturnValue({
      textContent: '', // Simulating an empty text content
    });

    return showCoin().then((result) => {
      expect(result).toBe(0);

      // Check if getUserId and listUserDocuments have been called
      expect(getUserId).toHaveBeenCalled();
      expect(listUserDocuments).toHaveBeenCalledWith('mockUserId');
      
      // Check if document.getElementById has been called with the correct ID
      expect(document.getElementById).toHaveBeenCalledWith('coin');
    });
  });

  test('TC2: should display the total coin when the player has a recorded coin', () => {
    const mockUserId = 'mockUserId';
    const mockDocumentsResponse = {
      documents: [
        {
          coin: 35,
        },
      ],
    };

    getUserId = jest.fn().mockResolvedValue(mockUserId);
    listUserDocuments = jest.fn().mockResolvedValue(mockDocumentsResponse);
    document.getElementById = jest.fn().mockReturnValue({
      textContent: '', // Simulating an empty text content
    });

    return showCoin().then((result) => {
      expect(result).toBe(35);

      // Check if getUserId and listUserDocuments have been called
      expect(getUserId).toHaveBeenCalled();
      expect(listUserDocuments).toHaveBeenCalledWith(mockUserId);
      
      // Check if document.getElementById has been called with the correct ID
      expect(document.getElementById).toHaveBeenCalledWith('coin');
    });
  });
});

describe('checkCoin', () => {
  test('TC1: should calculate total coins when the player has existing coins in the system', () => {
    document.getElementById = jest.fn().mockReturnValue({
      textContent: '2500',
    });

    const score = 10; // Mock score value
    const result = checkCoin(score);

    expect(result).toBe(2510); // Expected total coins: 2000 (existing coins) + 10 (new score)
    
    // Check if document.getElementById has been called with the correct ID
    expect(document.getElementById).toHaveBeenCalledWith('coin');
  });

  test('TC2: should not accumulate coins when the player already has 9999 coins', () => {
    document.getElementById = jest.fn().mockReturnValue({
      textContent: '9999',
    });

    const score = 20; // Mock score value
    const result = checkCoin(score);

    expect(result).toBe('9999'); // Expected total coins should remain 9999 (maximum limit reached)
    
    // Check if document.getElementById has been called with the correct ID
    expect(document.getElementById).toHaveBeenCalledWith('coin');
  });
});







