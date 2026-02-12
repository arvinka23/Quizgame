// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What color do you get if you mix red and yellow?",
    answers: ["Orange", "Green", "Purple", "Blue"],
    correct: 0,
  },
  {
    question: "Which animal can sleep standing up?",
    answers: ["Dog", "Cow", "Elephant", "Horse"],
    correct: 3,
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "What fruit do raisins come from?",
    answers: ["Plum", "Grape", "Date", "Fig"],
    correct: 1,
  },
  {
    question: "Which is the fastest land animal?",
    answers: ["Lion", "Leopard", "Cheetah", "Tiger"],
    correct: 2,
  },
];

// Quiz State Vars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  console.log("quiz started");
  // Reset state
  currentQuestionIndex = 0;
  score = 0;
  answerDisabled = false;

  // Update UI
  scoreSpan.textContent = score;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  progressBar.style.width = "0%";

  // Hide start screen, show quiz screen
  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  // Show first question
  showQuestion();
}
function showQuestion() {
  //reset state
  answerDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercentage =
    (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);

    //datasets
    button.dataset.index =
      index === currentQuestion.correct ? "correct" : "incorrect";
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.index === "correct";

  // Mark all buttons as disabled and show correct/incorrect
  Array.from(answersContainer.children).forEach((button, idx) => {
    button.disabled = true; // actually disables the button
    if (button.dataset.index === "correct") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  // Update score if answer is correct
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Short pause to show feedback, then go to next question or show results
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;

  const resultPercentage = (score / quizQuestions.length) * 100;

  if (resultPercentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (resultPercentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (resultPercentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (resultPercentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
