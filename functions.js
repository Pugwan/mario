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

function checkCoin(score){
    const coin = document.getElementById('coin').textContent
    const maxCoins = 9999;
    if(coin >= maxCoins){
      return coin;
    }    
    const sumcoin = Number(score) + Number(coin) ;   
      return sumcoin;  
    }


    

    // function showhighScore() {
    //   list().then(response => {
    //     const highscoreElement = document.getElementById('highscore');
    //     highscoreElement.textContent = response.documents[0].highscore;
    //     console.log(response.documents[0].highscore);
    //   });
    // }
    
    // function showCoin(){
    //   list().then(response => {
    //     const coinElement = document.getElementById('coin');
    //     coinElement.textContent = response.documents[0].coin;
    //     console.log(response.coin);
    //   });       
    // }
    function showCoin() {
      return getUserId().then(userId => {
        return listUserDocuments(userId).then(response => {
          const coinElement = document.getElementById('coin');
          if (response.documents && response.documents.length > 0) {
            coinElement.textContent = response.documents[0].coin;
            return response.documents[0].coin;
          } else {
            coinElement.textContent = '0'; // Set text content to '0' if no documents exist
            return 0;
          }
        });
      });
    }

    function showhighScore() {
      return getUserId().then(userId => {
        return listUserDocuments(userId).then(response => {
          const highscoreElement = document.getElementById('highscore');
          if (response.documents && response.documents.length > 0) {
            highscoreElement.textContent = response.documents[0].highscore;
            return response.documents[0].highscore;
          } else {
            highscoreElement.textContent = '0'; // Set text content to '0' if no documents exist
            return 0;
          }
        });
      });
    }



if (typeof global !== 'undefined') {
  global.checkScore = checkScore;
  global.checkCoin = checkCoin;
  global.showhighScore = showhighScore;
  global.showCoin = showCoin;
}

// แนบ checkScore กับ window object สำหรับบราวเซอร์
if (typeof window !== 'undefined') {
  window.checkScore = checkScore;
  window.checkCoin = checkCoin;
  window.showhighScore = showhighScore;
  window.showCoin = showCoin;
}