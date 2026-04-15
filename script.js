// Progress elements
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// Tech Questions
const questions = [
  {
    question: "What is JavaScript?",
    options: ["Programming Language", "Markup Language", "Database"],
    answer: 0
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Netscape", "Microsoft"],
    answer: 1
  },
  {
    question: "Which keyword is used to declare a variable?",
    options: ["var", "int", "string"],
    answer: 0
  },
  {
    question: "Which method converts JSON to object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Elements
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

// Create Next button
const nextBtn = document.createElement("button");
nextBtn.innerText = "Next";
document.querySelector(".container").appendChild(nextBtn);

// Create Submit button
const submitBtn = document.createElement("button");
submitBtn.innerText = "Submit";
submitBtn.style.display = "none";
document.querySelector(".container").appendChild(submitBtn);

// Load Question
function loadQuestion() {
  selectedAnswer = null;

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
      selectedAnswer = index;

      // reset styles
      document.querySelectorAll("#answers button").forEach(b => {
        b.style.background = "";
      });

      btn.style.background = "#007bff";
      btn.style.color = "white";
    };

    answersEl.appendChild(btn);
  });

  // Button visibility
  if (currentQuestion === questions.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  } else {
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }
}

// Next button
nextBtn.onclick = () => {
  if (selectedAnswer === null) return;

  if (selectedAnswer === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  loadQuestion();
};

// Submit button
submitBtn.onclick = () => {
  if (selectedAnswer === null) return;

  if (selectedAnswer === questions[currentQuestion].answer) {
    score++;
  }

  showResult();
};

// Show result
function showResult() {
  document.querySelector(".container").innerHTML = `
    <h2>Your Score: ${score}/${questions.length}</h2>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

// Start
loadQuestion();