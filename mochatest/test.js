const { expect } = require('chai');
const { collectCoin, jumpAndCollectCoin, decreaseCoinAfterTime, isMaxCoinsReached } = require('./your-game-functions'); // แทนที่ด้วยชื่อฟังก์ชันจริง

describe('Game Coin Handling', () => {
  let playerCoins = 0;

  beforeEach(() => {
    // กำหนดค่าเริ่มต้นของเหรียญที่ผู้เล่นมี
    playerCoins = 0;
  });

  it('TC1: Should show no coins when player has no coins', () => {
    const result = yourGameFunctionToShowNoCoins(); // แทนที่ด้วยฟังก์ชันที่แสดงว่ายังไม่มีเหรียญ

    expect(result).to.equal('No coins available');
  });

  it('TC2: Should display the total number of coins when player has coins', () => {
    playerCoins = 100; // แทนที่ด้วยจำนวนเหรียญที่ต้องการทดสอบ
    const result = yourGameFunctionToDisplayTotalCoins(); // แทนที่ด้วยฟังก์ชันที่แสดงจำนวนเหรียญทั้งหมด

    expect(result).to.equal(`Total coins: ${playerCoins}`);
  });

  it('TC3: Should add collected coin when player jumps and collects coin', () => {
    jumpAndCollectCoin(); // แทนที่ด้วยฟังก์ชันที่จะทำการกระโดดชนกล่องและเก็บเหรียญ

    expect(playerCoins).to.be.above(0); // ตรวจสอบว่าจำนวนเหรียญมีการเพิ่มขึ้นหลังจากกระโดดชน
  });

  it('TC4: Should not change total coins when player jumps and does not collect coin', () => {
    const initialCoins = playerCoins;
    jumpAndDoNotCollectCoin(); // แทนที่ด้วยฟังก์ชันที่จะทำการกระโดดชนกล่องและไม่เก็บเหรียญ

    expect(playerCoins).to.equal(initialCoins); // ตรวจสอบว่าจำนวนเหรียญไม่เปลี่ยนแปลง
  });

  it('TC5: Should decrease total coins after 1 minute', () => {
    const initialCoins = playerCoins;
    decreaseCoinAfterTime(1); // แทนที่ด้วยฟังก์ชันที่จะทำการลดจำนวนเหรียญหลังจากผ่านไป 1 นาที

    expect(playerCoins).to.be.below(initialCoins); // ตรวจสอบว่าจำนวนเหรียญมีการลดลง
  });

  it('TC6: Should not allow player to collect more than 1000 coins', () => {
    playerCoins = 1000; // แทนที่ด้วยจำนวนเหรียญที่มีอยู่แล้ว
    collectCoin(); // แทนที่ด้วยฟังก์ชันที่จะทำการเก็บเหรียญ

    expect(isMaxCoinsReached()).to.be.true; // ตรวจสอบว่าไม่สามารถเก็บเหรียญได้อีก
  });
});
