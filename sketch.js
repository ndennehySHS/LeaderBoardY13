// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDsgKxwXO7KRGOKslKgWGEhh9Tfdg8owm4",
  authDomain: "leaderboardy13.firebaseapp.com",
  databaseURL: "https://leaderboardy13-default-rtdb.firebaseio.com",
  projectId: "leaderboardy13",
  storageBucket: "leaderboardy13.appspot.com",
  messagingSenderId: "292922184528",
  appId: "1:292922184528:web:486c5e1195d61e52d9d255"
};
firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref('scores');

let scores = [];

function fetchScores() {
  dbRef.on('value', (snapshot) => {
    scores = snapshot.val() || [];
    updateLeaderboard();
  });
}

function updateLeaderboard() {
  scores.sort((a, b) => b.score - a.score);
  const scoresList = document.getElementById('scores');
  scoresList.innerHTML = '';
  scores.forEach((student, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${student.name}: ${student.score}`;
    scoresList.appendChild(li);
  });
}

document.getElementById('go-button').addEventListener('click', () => {
  const player = document.getElementById('player-select').value;
  const score = parseInt(document.getElementById('score-input').value);
  if (!isNaN(score)) {
    const playerIndex = scores.findIndex(s => s.name === player);
    if (playerIndex !== -1) {
      scores[playerIndex].score += score;
      dbRef.set(scores);
    }
  }
});

document.getElementById('refresh-button').addEventListener('click', fetchScores);

fetchScores();
