const { Client, Account, Databases, ID , Query } = Appwrite;

const projectId = '6554d9052e900c1eabaa';
const databaseId = '6555bf6a5887f8344b6c'; // คุณอาจต้องการกรอก ID ฐานข้อมูลจริงที่นี่
const collectionId = '6555bf92364ff69f80d2'; // คุณอาจต้องการกรอก ID คอลเล็กชันจริงที่นี่

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6555b8014bc7bec43c4a');

const account = new Account(client);
const database = new Databases(client);

async function isLoggedIn() {
    return account.get().then(response => {
        if (response) {
            return true
        }
        return false
    }).catch(error => console.error(error))
}

async function getUserId(){
    return account.get().then(response => {
      return response.$id
    }).catch(error => console.error(error))
}

function displayUserName(){
    account.get().then(response => {      
      const usernameElement = document.getElementById('username')
      usernameElement.textContent = response.name
    }).catch(error => console.error(error))
}

// function updateScore(score){
//   const currentHighScore = document.getElementById('highscore').textContent
//   if (Number(score) > Number(currentHighScore)) {
//     getUserId().then(userId => {
//       database.updateDocument(
//         databaseId,
//         collectionId,
//         userId,
//         {
//           "userId": userId,
//           "highscore": score
//         }
//       ).then(() => {
//         showScore()
//       }).then(error => console.error(error))
//     })
//   }
// }

// function checkScore(score){
//   const currentHighScore = document.getElementById('highscore').textContent
//   if (Number(score) > Number(currentHighScore)) {    
//     return score;
//   }
//   if (Number(score) === Number(currentHighScore)) {    
//     return currentHighScore;
//   }
//   if (Number(score) < Number(currentHighScore)) {    
//     return currentHighScore;
//   }
// }

function updatescoredb(score,coin) {
  const scorecurrent = score;
  const coincurrent = coin;    
  getUserId().then(userId => {
    database.updateDocument(
      databaseId,
      collectionId,
      userId,
      {
        "userId": userId,
        "highscore": scorecurrent,        
        "coin": coincurrent
      }
      
    ).then(() => {
      showhighScore()      
      showCoin()
    }).then(error => console.error(error))
  })
}


// function list() {
//   return getUserId().then(userId => {
//     return database.listDocuments(
//       databaseId,
//       collectionId,
//       [Query.equal("userId", userId)]
//     );
//   });
// }
function listUserDocuments(userId) {
  return database.listDocuments(
    databaseId,
    collectionId,
    [
      Query.equal("userId", userId)
    ]
  );
}

// function showScore() {
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

function register(event) {    
    account.create(
        ID.unique(),
        event.target.elements['register-email'].value,
        event.target.elements['register-password'].value,
        event.target.elements['register-username'].value
        
    ).then(response => {
        console.log(response);
        database.createDocument(
            databaseId,
            collectionId,
            response.$id,
            {
                "userId": response.$id,
                "highscore": 0,
                "coin": 0
            }         
            
        ),
        database.createDocument(
          databaseId,
          '6562165e1490741e8632',
          ID.unique(),
          {
            "userId": response.$id,              
            "skins": "mario"
          }     
          
      ),
        account.createEmailSession(
          event.target.elements['register-email'].value,
          event.target.elements['register-password'].value,
          event.target.elements['register-username'].value
        ).then(() => {
            alert('Session created successfully!')            
        })
    }).catch(error => {
      alert('Failed to create session')
      console.error(error)
    })
    event.preventDefault()
}

function login(event){
    account.createEmailSession(
      event.target.elements['login-email'].value,
      event.target.elements['login-password'].value
    ).then(() => {
        alert('Session created successfully!')              
        showdisplay()
        displayUserName()
        showhighScore()
        showCoin()
        
        client.subscribe("account", (response) => {
            console.log(response)
        })
        
    }).catch(error => {
        alert('Failed to create session')
        console.error(error)
    })
    event.preventDefault()
}

function logout() {
    account.deleteSessions().then(() => {
        alert('Logged out')
        console.log('Current session deleted')
        showdisplay()
        const highscoreElement = document.getElementById('highscore')
        highscoreElement.textContent = ""
    }).catch(error => console.error(error))
}

function toggleModal(event){
    const registerForm = document.getElementById('register-form')
    const loginForm = document.getElementById('login-form')
    const registerButton = document.getElementById('register-button')
    const loginButton = document.getElementById('login-button')

    if (event.srcElement.id === 'register-button') {
        registerForm.classList.remove('hidden')
        loginForm.classList.add('hidden')
        registerButton.classList.remove('not-active')
        loginButton.classList.add('not-active')
    }
    if (event.srcElement.id === 'login-button') {
        registerForm.classList.add('hidden')
        loginForm.classList.remove('hidden')
        registerButton.classList.add('not-active')
        loginButton.classList.remove('not-active')
    }
}

function showdisplay() {
    const modalElement = document.getElementById('modal')
    modalElement.classList.add('hidden')
    isLoggedIn().then(islogin => {
        if (islogin){
            const modalElement = document.getElementById('modal')
            modalElement.classList.add('hidden')
            const logoutButton = document.getElementById('logout-button')
            logoutButton.classList.remove('hidden')
            const highscoreTag = document.getElementById('highscore-tag')
            highscoreTag.classList.remove('hidden')
            const coinTag = document.getElementById('coin-tag')
            coinTag.classList.remove('hidden')
            startgame();
        } else {
            const modalElement = document.getElementById('modal')
            modalElement.classList.remove('hidden')
            const logoutButton = document.getElementById('logout-button')
            logoutButton.classList.add('hidden')
            const highscoreTag = document.getElementById('highscore-tag')
            highscoreTag.classList.add('hidden')
            const coinTag = document.getElementById('coin-tag')
            coinTag.classList.add('hidden')
            const usernameElement = document.getElementById('username')
            usernameElement.textContent = ""
            const canvas = document.querySelector('canvas')
            if (canvas) canvas.remove()
        }
    }).catch(error => console.error(error))
}

if (typeof global !== 'undefined') {
  global.getUserId = getUserId;
}
