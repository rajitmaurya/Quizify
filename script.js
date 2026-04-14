// Progress elements
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// Questions from API
let questions = [];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let skipsLeft = 2;

// Elements
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

// Timer UI
const timerEl = document.createElement("h3");
document.querySelector(".container").prepend(timerEl);

// Theme toggle
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "Toggle Theme";
document.body.prepend(toggleBtn);

toggleBtn.onclick = () => {
  document.body.classList.toggle("light");
};

// Skip button
const skipBtn = document.createElement("button");
skipBtn.innerText = "Skip (2)";
document.querySelector(".container").appendChild(skipBtn);

skipBtn.onclick = () => {
  if (skipsLeft > 0) {
    skipsLeft--;
    skipBtn.innerText = `Skip (${skipsLeft})`;
    nextQuestion();
  } else {
    skipBtn.disabled = true;
  }
};

// Sounds
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

// Fetch questions from API (Tech category)
async function fetchQuestions() {
  showLoading();

  try {
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple");
    const data = await res.json();

    questions = data.results.map(q => {
      const options = [...q.incorrect_answers];

      const randomIndex = Math.floor(Math.random() * (options.length + 1));
      options.splice(randomIndex, 0, q.correct_answer);

      return {
        question: decodeHTML(q.question),
        options: options.map(opt => decodeHTML(opt)),
        answer: randomIndex
      };
    });

    currentQuestion = 0;
    score = 0;

    skipsLeft = 2;
    skipBtn.innerText = "Skip (2)";
    skipBtn.disabled = false;

    loadQuestion();
  } catch (error) {
    // Fallback questions
    questions = [
      {
        question: "What is JavaScript?",
        options: ["Programming Language", "Markup Language", "Database"],
        answer: 0
      },
      {
        question: "Which company developed JavaScript?",
        options: ["Google", "Netscape", "Microsoft"],
        answer: 1
      }
    ];

    currentQuestion = 0;
    score = 0;
    loadQuestion();
  }
}

// Decode HTML
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Loading
function showLoading() {
  questionEl.innerText = "Loading questions...";
  answersEl.innerHTML = "";
}

// Timer
function startTimer() {
  timeLeft = 10;
  timerEl.innerText = `Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `Time: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// Load question
function loadQuestion() {
  clearInterval(timer);
  startTimer();

  const q = questions[currentQuestion];

  // Progress
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

      // Animation
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

      // Highlight correct
      document.querySelectorAll("#answers button")[q.answer].style.background = "green";

      setTimeout(nextQuestion, 1000);
    };

    answersEl.appendChild(btn);
  });
}

// Next question
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    progressBar.style.width = "100%";
    showResult();
  }
}

// Result
function showResult() {
  document.querySelector(".container").innerHTML = `
    <h2>Your Score: ${score}/${questions.length}</h2>
    <button onclick="location.reload()">Play Again</button>
  `;
}

// Start app
fetchQuestions();