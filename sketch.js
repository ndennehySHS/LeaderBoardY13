const scoresUrl = 'https://raw.githubusercontent.com/ndennehySHS/LeaderBoardY13/main/scores.json';

let scores = [];

function fetchScores() {
  fetch(scoresUrl)
    .then(response => response.json())
    .then(data => {
      scores = data;
      updateLeaderboard();
    })
    .catch(error => console.error('Error fetching scores:', error));
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
      updateLeaderboard();
      saveScores();
    }
  }
});

document.getElementById('refresh-button').addEventListener('click', fetchScores);

function saveScores() {
  fetch(scoresUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(scores)
  })
  .then(response => response.json())
  .then(data => console.log('Scores saved:', data))
  .catch(error => console.error('Error saving scores:', error));
}

fetchScores();
