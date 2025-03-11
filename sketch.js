let scores = [
  { name: 'Finlay', score: 0 },
  { name: 'Avery', score: 0 },
  { name: 'Ocean', score: 0 },
  { name: 'Ella', score: 0 },
  { name: 'Iyiola', score: 0 },
  { name: 'Tom', score: 0 },
  { name: 'Oliver', score: 0 },
  { name: 'Daniel', score: 0 },
  { name: 'Archie', score: 0 },
  { name: 'Gabriel', score: 0 },
  { name: 'Casey', score: 0 },
  { name: 'Owen', score: 0 },
  { name: 'Michell', score: 0 },
  { name: 'Morgan', score: 0 },
  { name: 'Jack', score: 0 }
];

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
    }
  }
});

document.getElementById('refresh-button').addEventListener('click', updateLeaderboard);

updateLeaderboard();