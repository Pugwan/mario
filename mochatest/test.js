const { expect } = require('chai');
const kaboom = require('kaboom');
const fs = require('fs');
const path = require('path');

//Read the game code file
const gameCode = fs.readFileSync(path.resolve(__dirname, '../main.js'), 'utf8');

const {
  displayPlayerScore,
  setPlayerScore,
  updateHighScore
} = fs.readFileSync(path.resolve(__dirname, '../main.js'), 'utf8');



// ใช้ฟังก์ชันนี้เพื่อแสดงผลคะแนนของผู้เล่น
describe('Game Tests', function () {
  let context;
  let playerScore = 0;
  let highScore = 0;


  beforeEach(() => {
    // กำหนดค่าเริ่มต้นของคะแนนที่ผู้เล่นมี
    playerScore = 0;
    highScore = 0;
  });


  it('TC1: Should display "No score available" when player has no score information in system', () => {
    const result = displayPlayerScore(); // แทนที่ด้วยฟังก์ชันที่แสดงคะแนนของผู้เล่น
    expect(result).to.equal('No score available');
  });

  it('TC2: Should display the highest score when player has a score', () => {
    highScore = 100; // แทนที่ด้วยคะแนนที่ต้องการทดสอบ
    const result = displayPlayerScore(); // แทนที่ด้วยฟังก์ชันที่แสดงคะแนนของผู้เล่น
    expect(result).to.equal(`${highScore}`);
  });

  it('TC3: Should update the high score when player scores higher than the current high score', () => {
    highScore = 100; // แทนที่ด้วยคะแนนสูงสุดที่มีอยู่แล้ว
    setPlayerScore(150); // แทนที่ด้วยฟังก์ชันที่จะกำหนดคะแนนใหม่
    highScore = updateHighScore(); // แทนที่ด้วยฟังก์ชันที่จะทำการอัปเดตคะแนนสูงสุด
    expect(highScore).to.equal(150);
  });

  it('TC4: Should not update the high score when player scores equal to the current high score', () => {
    highScore = 100; // แทนที่ด้วยคะแนนสูงสุดที่มีอยู่แล้ว
    setPlayerScore(100); // แทนที่ด้วยฟังก์ชันที่จะกำหนดคะแนนใหม่
    highScore = updateHighScore(); // แทนที่ด้วยฟังก์ชันที่จะทำการอัปเดตคะแนนสูงสุด
    expect(highScore).to.equal(100);
  });

  it('TC5: Should not update the high score when player scores lower than the current high score', () => {
    highScore = 100; // แทนที่ด้วยคะแนนสูงสุดที่มีอยู่แล้ว
    setPlayerScore(80); // แทนที่ด้วยฟังก์ชันที่จะกำหนดคะแนนใหม่
    highScore = updateHighScore(); // แทนที่ด้วยฟังก์ชันที่จะทำการอัปเดตคะแนนสูงสุด
    expect(highScore).to.equal(100);
  });
  
  
});
