const { JSDOM } = require('jsdom');
require('../functions');

beforeEach(() => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  global.document = dom.window.document;
});

describe('checkScore function', () => {
  test('should return the higher score if the provided score is greater than the current high score', () => {
    document.body.innerHTML = '<div id="highscore">50</div>';

    const result = global.checkScore(70);
    expect(result).toBe(70);
  });

  test('should return the current high score if the provided score is equal to the current high score', () => {
    document.body.innerHTML = '<div id="highscore">80</div>';

    const result = global.checkScore(80);
    expect(parseInt(result)).toBe(80); // แก้ไขการเปรียบเทียบด้วยการแปลงค่าเป็น number ก่อนเปรียบเทียบ
  });

  test('should return the current high score if the provided score is less than the current high score', () => {
    document.body.innerHTML = '<div id="highscore">90</div>';

    const result = global.checkScore(85);
    expect(parseInt(result)).toBe(90); // แก้ไขการเปรียบเทียบด้วยการแปลงค่าเป็น number ก่อนเปรียบเทียบ
  });
});


