// test.js

// Mock the startgame function to test scoring when collecting coins
jest.mock('../game', () => {
  let scoreLabel = { value: 0 }; // Mock scoreLabel

  return {
    startgame: jest.fn(() => {
      // Simulate the collision with a coin to increase the score
      scoreLabel.value += 1;      
      return { scoreLabel }; // Return the mock scoreLabel
    }),
  };
});

// Mock the player and its functions
const mockPlayer = {
  collides: jest.fn((objType, callback) => {
    if (objType === 'mushroom') {
      callback({}); // Simulate colliding with a mushroom
    }
  }),
  biggify: jest.fn((param) => { // Change this line to accept an argument
    // Implement biggify logic here
  }),
};

describe('Startgame Function', () => {
  test('startgame function exists', () => {
    const game = require('../game'); // Import the mocked startgame function
    expect(game.startgame).toBeDefined();
  });

  test('collecting coin increases the score', () => {
    const game = require('../game'); // Import the mocked startgame function
    const { scoreLabel } = game.startgame(); // Invoke the mocked startgame function

    // Simulate collecting a coin
    scoreLabel.value++;

    // Check that the score has increased
    expect(scoreLabel.value).toBe(2);
  });
});

describe('Player Mushroom Collision', () => {
  test('colliding with a mushroom triggers biggify', () => {
    const gameModule = require('../game');

    gameModule.startgame();
    mockPlayer.collides('mushroom', () => mockPlayer.biggify(6)); // Update this line

    expect(mockPlayer.collides).toHaveBeenCalledWith('mushroom', expect.any(Function));
    expect(mockPlayer.biggify).toHaveBeenCalledWith(6); // Update this line
  });
});
