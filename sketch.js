const { JsonDB, Config } = require('node-json-db');

// Initialize JsonDB
const db = new JsonDB(new Config("scoresDatabase", true, false, '/'));

// Function to add or update a score
function addOrUpdateScore(player, score) {
  try {
    let scores = db.getData("/scores");
    const playerIndex = scores.findIndex(s => s.name === player);
    if (playerIndex !== -1) {
      scores[playerIndex].score += score;
    } else {
      scores.push({ name: player, score: score });
    }
    db.push("/scores", scores);
  } catch (error) {
    if (error.name === "DataError") {
      db.push("/scores", [{ name: player, score: score }]);
    } else {
      console.error(error);
    }
  }
}

// Function to fetch scores
function fetchScores() {
  try {
    return db.getData("/scores");
  } catch (error) {
    if (error.name === "DataError") {
      return [];
    } else {
      console.error(error);
    }
  }
}

function updateLeaderboard() {
  const scores = fetchScores();
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
    addOrUpdateScore(player, score);
    updateLeaderboard();
  }
});

document.getElementById('refresh-button').addEventListener('click', updateLeaderboard);

updateLeaderboard();
