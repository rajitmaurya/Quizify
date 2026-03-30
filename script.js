//  Progress elements
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

//  Questions
const questions = [
  {
    question: "What is JavaScript?",
    options: ["Programming Language", "Markup Language", "Database"],
    answer: 0
  },
  {
    question: "Which is used for styling?",
    options: ["HTML", "CSS", "JS"],
    answer: 1
  },
  {
    question: "Which keyword declares a variable?",
    options: ["var", "int", "string"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

//  Elements
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

//  Timer UI
const timerEl = document.createElement("h3");
document.querySelector(".container").prepend(timerEl);

//  Sounds
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

//  Theme toggle
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "Toggle Theme";
document.body.prepend(toggleBtn);

toggleBtn.onclick = () => {
  document.body.classList.toggle("light");
};

//  Start Timer
function startTimer() {
  timeLeft = 10;
  timerEl.innerText = `⏱ Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = ` Time: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

//  Load Question
function loadQuestion() {
  clearInterval(timer);
  startTimer();

  const q = questions[currentQuestion];

  //  Progress update
  const progressPercent = (currentQuestion / questions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  progressText.innerText = `Question ${currentQuestion + 1} / ${questions.length}`;

  questionEl.innerText = q.question;
  answersEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;

    btn.onclick = () => {
      clearInterval(timer);

      // ⚡ Click animation
      btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btn.style.transform = "scale(1)";
      }, 100);

      if (index === q.answer) {
        btn.style.background = "green";
        score++;
        correctSound.play();
      } else {
        btn.style.background = "red";
        wrongSound.play();
      }

      //  Highlight correct answer
      document.querySelectorAll("#answers button")[q.answer].style.background = "green";

      setTimeout(nextQuestion, 1000);
    };

    answersEl.appendChild(btn);
  });
}

// Next Question
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    progressBar.style.width = "100%";
    showResult();
  }
}

// Show Result
function showResult() {
  document.querySelector(".container").innerHTML = `
    <h2> Your Score: ${score}/${questions.length}</h2>
    <input id="username" placeholder="Enter your name"/>
    <button onclick="saveScore()">Save Score</button>
    <button onclick="location.reload()">Restart</button>
  `;
}

//  Save Score
function saveScore() {
  const name = document.getElementById("username").value || "Anonymous";
  const data = JSON.parse(localStorage.getItem("scores")) || [];

  data.push({ name, score });
  localStorage.setItem("scores", JSON.stringify(data));

  showLeaderboard();
}

//  Leaderboard
function showLeaderboard() {
  const data = JSON.parse(localStorage.getItem("scores")) || [];

  data.sort((a, b) => b.score - a.score);

  let html = "<h2> Leaderboard</h2>";

  data.forEach((user, index) => {
    html += `<p>${index + 1}. ${user.name}: ${user.score}</p>`;
  });

  html += `<button onclick="location.reload()">Play Again</button>`;

  document.querySelector(".container").innerHTML = html;
}

//  Start App
loadQuestion();