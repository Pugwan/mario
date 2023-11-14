const { expect } = require('chai');
const kaboom = require('kaboom');

const fs = require('fs');
const path = require('path');
const gameCode = fs.readFileSync(path.resolve(__dirname, '../main.js'), 'utf8');

describe('Game Tests', function () {
  let context;

  beforeEach(function () {
    context = kaboom({
      global: true,
      fullscreen: false,
      scale: 1,
      debug: false,
      clearColor: [0, 0, 0, 1],
    });
    eval(gameCode); // โหลดโค้ดของเกม
  });

  afterEach(function () {
    context.destroy();
  });

  it('TC1: Should display no score when player has no previous score', function () {
    const scoreLabel = context.world.get('scoreLabel')[0];

    expect(scoreLabel.text).to.equal('0');
  });

  it('TC2: Should display the highest score achieved by the player', function () {
    // Simulate a previous high score
    const highScore = 100;
    // Set the high score
    // Example: context.localStorage.set('highScore', highScore);

    // Retrieve and check the displayed score
    const scoreLabel = context.world.get('scoreLabel')[0];
    expect(scoreLabel.text).to.equal(String(highScore));
  });

  it('TC3: Should update the high score when the current score surpasses the previous high score', function () {
    const highScore = 100;
    // Set the high score
    // Example: context.localStorage.set('highScore', highScore);

    // Simulate a new score that surpasses the previous high score
    const newScore = 120;
    // Simulate updating the score in the game

    const updatedHighScore = context.localStorage.get('highScore');
    expect(updatedHighScore).to.equal(newScore);
  });

  it('TC4: Should not update the high score when the current score equals the previous high score', function () {
    const highScore = 100;
    // Set the high score
    // Example: context.localStorage.set('highScore', highScore);

    // Simulate a new score equal to the previous high score
    const newScore = 100;
    // Simulate updating the score in the game

    const updatedHighScore = context.localStorage.get('highScore');
    expect(updatedHighScore).to.equal(highScore);
  });

  it('TC5: Should not update the high score when the current score is lower than the previous high score', function () {
    const highScore = 100;
    // Set the high score
    // Example: context.localStorage.set('highScore', highScore);

    // Simulate a new score lower than the previous high score
    const newScore = 80;
    // Simulate updating the score in the game

    const updatedHighScore = context.localStorage.get('highScore');
    expect(updatedHighScore).to.equal(highScore);
  });

  // Add more test cases for edge cases or additional scenarios

});
