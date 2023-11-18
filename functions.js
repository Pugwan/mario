function checkScore(score){
    const currentHighScore = document.getElementById('highscore').textContent
    if (Number(score) > Number(currentHighScore)) {    
      return score;
    }
    if (Number(score) === Number(currentHighScore)) {    
      return currentHighScore;
    }
    if (Number(score) < Number(currentHighScore)) {    
      return currentHighScore;
    }
  }



if (typeof global !== 'undefined') {
  global.checkScore = checkScore;
}

// แนบ checkScore กับ window object สำหรับบราวเซอร์
if (typeof window !== 'undefined') {
  window.checkScore = checkScore;
}