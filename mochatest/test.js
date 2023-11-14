const { expect } = require('chai');
const kaboom = require('kaboom');
const fs = require('fs');
const path = require('path');
const {
  displayPlayerScore,
  setPlayerScore,
  updateHighScore
} = fs.readFileSync(path.resolve(__dirname, '../main.js'), 'utf8');


describe('Game Tests', function () {
  let context;
  let playerScore = 0;
  let highScore = 0;

  it('TC1: Should display "No score available" when player has no score', () => {
    const result = displayPlayerScore(); // แทนที่ด้วยฟังก์ชันที่แสดงคะแนนของผู้เล่น
    
    expect(result).to.equal('No score available');
  });

  it('TC2: Should display the highest score when player has a score', () => {
    playerScore = 100; // แทนที่ด้วยคะแนนที่ต้องการทดสอบ
    const result = displayPlayerScore(); // แทนที่ด้วยฟังก์ชันที่แสดงคะแนนของผู้เล่น

    expect(result).to.equal(`High Score: ${playerScore}`);
  });

  it('TC3: Should update the high score when player scores higher than the current high score', () => {
    highScore = 100; // แทนที่ด้วยคะแนนสูงสุดที่มีอยู่แล้ว
    setPlayerScore(150); // แทนที่ด้วยฟังก์ชันที่จะกำหนดคะแนนใหม่

    updateHighScore(); // แทนที่ด้วยฟังก์ชันที่จะทำการอัปเดตคะแนนสูงสุด

    expect(highScore).to.equal(150);
  });

  it('TC4: Should not update the high score when player scores equal to the current high score', () => {
    highScore = 100; // แทนที่ด้วยคะแนนสูงสุดที่มีอยู่แล้ว
    setPlayerScore(100); // แทนที่ด้วยฟังก์ชันที่จะกำหนดคะแนนใหม่

    updateHighScore(); // แทนที่ด้วยฟังก์ชันที่จะทำการอัปเดตคะแนนสูงสุด

    expect(highScore).to.equal(100);
  });

  it('TC5: Should not update the high score when player scores lower than the current high score', () => {
    highScore = 100; // แทนที่ด้วยคะแนนสูงสุดที่มีอยู่แล้ว
    setPlayerScore(80); // แทนที่ด้วยฟังก์ชันที่จะกำหนดคะแนนใหม่

    updateHighScore(); // แทนที่ด้วยฟังก์ชันที่จะทำการอัปเดตคะแนนสูงสุด

    expect(highScore).to.equal(100);
  });
  // Add more test cases for edge cases or additional scenarios

});