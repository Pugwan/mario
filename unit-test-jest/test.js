const { JSDOM } = require('jsdom');
require('../functions');

beforeEach(() => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  global.document = dom.window.document;
});

describe('checkScore function', () => {
  test('TC1: Should display the highest score if the player has existing score data', () => {
    document.body.innerHTML = '<div id="highscore">50</div>';

    const result = global.checkScore(70);
    expect(result).toBe(70);
  });

  test('TC2: Should update the highest score if the player achieves a new high score', () => {
    document.body.innerHTML = '<div id="highscore">80</div>';

    const result = global.checkScore(85);
    expect(parseInt(result)).toBe(85);
  });

  test('TC3: Should not change the highest score if the player achieves a score equal to the existing high score', () => {
    document.body.innerHTML = '<div id="highscore">90</div>';

    const result = global.checkScore(90);
    expect(parseInt(result)).toBe(90);
  });

  test('TC4: Should not change the highest score if the player achieves a score lower than the existing high score', () => {
    document.body.innerHTML = '<div id="highscore">95</div>';

    const result = global.checkScore(85);
    expect(parseInt(result)).toBe(95);
  });
});
