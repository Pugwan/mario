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
