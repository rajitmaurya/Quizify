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
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Netscape", "Microsoft"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

const quizBox = document.getElementById("quiz");
const resultBox = document.getElementById("result");
const scoreText = document.getElementById("scoreText");

let selectedAnswer = null;

function loadQuestion() {
  selectedAnswer = null;
  nextBtn.disabled = true;

  const q = questions[currentQuestion];
  questionEl.innerText = q.question;
  answersEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;

    btn.onclick = () => {
      selectedAnswer = index;
      nextBtn.disabled = false;

      document.querySelectorAll("#answers button").forEach(b => {
        b.style.background = "#38bdf8";
      });

      btn.style.background = "#22c55e"; // selected green
    };

    answersEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  if (selectedAnswer === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");

  scoreText.innerText = `Your Score: ${score}/${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  quizBox.classList.remove("hide");
  resultBox.classList.add("hide");

  loadQuestion();
}

loadQuestion();