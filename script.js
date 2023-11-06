var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var timer;
var timerCount;
var isWin = false;
// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// The startGame function is called when the start button is clicked
function startGame() {
    timerCount = 120;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    startTimer()
    displayQuestion()
}


// The setTimer function starts and stops the timer 
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        if (isWin && timerCount > 0) {
          clearInterval(timer);
        } 
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
      clearInterval(timer)
      record()
      }
    }, 1000);
  }
var currentQuestionIndex = 0;
function displayQuestion() {
  var question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;
  document.getElementById("answer-choices").textContent = "";
  for (var i = 0; i < question.answerChoices.length; i++) {
    var answerChoice = document.createElement("li")
    answerChoice.textContent = question.answerChoices[i];
    answerChoice.addEventListener("click", function() {
      checkAnswer(i);
    });
    document.getElementById("answer-choices").appendChild(answerChoice);
  }
}


var questions = [
 {
    question: "Which of the following is a JavaScript data type?",
    answerChoices: ["String", "Number", "Object", "All of the above"],
    correctAnswerIndex: 4
 },
 {
  question: "Which of the following is not a JavaScript data type?",
  answerChoices: ["String", "Number", "Object", "None of the above"],
  correctAnswerIndex: 4
 },
 {
  question: "Which of the following is a programming language?",
  answerChoices: ["Javascript", "python", "Java", "All of the above"],
  correctAnswerIndex: 4
 },
];
var wins = 0;
var losses = 0;
function checkAnswer(answerIndex) {
  var correctAnswerIndex = questions[currentQuestionIndex].correctAnswerIndex;
  if (answerIndex === correctAnswerIndex) {
    alert("Correct!");
    wins++;
  } else {
    alert("Incorrect. The correct answer is " + questions[currentQuestionIndex].answerChoices[correctAnswerIndex]);
  timerCount -= 10;
  losses++;
  }

  // Go to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    // End the quiz
    alert("You have completed the quiz!");
    record()
    isWin = true;
  }
}

function record() {
  window.alert("Stats:\nCorrect: " + wins + "\nIncorrect: " + losses
  );
  var username = window.prompt("Save initials");
  localStorage.setItem('stats', username);
  document.getElementById('stats').textContent = "Initials:" + username + "\nCorrect: " + wins + "\nIncorrect: " + losses;
}

  