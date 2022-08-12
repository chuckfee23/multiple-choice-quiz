// VARIABLE DECLARATIONS
// What variables am I going to need?

var timerElement = document.querySelector("#timer-count");
var startButton = document.querySelector(".start-button");
var resultsScreen = document.getElementById("results-screen");
var highScores = document.getElementById("leaderboard");
// var incorrectChoice = document.querySelectorAll(".incorrect");
// var correctChoice = document.querySelectorAll(".correct");
// var answerChoice = document.querySelectorAll(".answerChoice");
// var questions = document.querySelectorAll(".question");
var currentIndex = 0;
var currentScore;
var timerCount;
var timer;
var finalScore = document.querySelector("#final-score");
var quizComplete = false;
var questionElement = document.getElementById("questions");
var choiceElement = document.getElementById("choices");
var submitButton = document.getElementById("submit");
var initialsElement = document.getElementById("initials");

var questions = [
  {
    title:
      "What is the only US state whose eastern and western borders are created entirely by rivers?",
    correctAnswer: "Iowa",
    choices: ["Iowa", "Nebraska", "Tennessee", "Louisiana"],
  },
  {
    title: "Which of the following animals was Walt Disney afraid of?",
    correctAnswer: "Mice",
    choices: ["Ducks", "Mice", "Dogs", "Elephants"],
  },
  {
    title: "Where were fortune cookies invented?",
    correctAnswer: "San Francisco",
    choices: ["Shanghai", "San Francisco", "Beijing", "New York"],
  },
  {
    title:
      "On average, healthy Americans do which the following activity 22 times a day?",
    correctAnswer: "Open the refrigerator",
    choices: ["Yawn", "Crack their Knuckles", "Open the refrigerator", "Cough"],
  },
  {
    title: "What was the first fruit that was eaten on the moon?",
    correctAnswer: "Peach",
    choices: ["Banana", "Pear", "Apple", "Peach"],
  },
];

// set the quiz timer to 60 seconds, and set the user's current score to 0
// call startTimer function, hide the quiz preview page, and enter the quiz
function startQuiz() {
  var startScreenElement = document.getElementById("start-screen");
  startScreenElement.setAttribute("style", "display: none");

  timerCount = 60;
  currentScore = 0;
  startTimer();
  // //   hidePreview();
  quiz();
}

function quiz() {
  // get current question object from array
  var currentQuestion = questions[currentIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choiceElement.innerHTML = "";

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceButton = document.createElement("button");
    // choiceButton.setAttribute("class", "choices");
    choiceButton.setAttribute("value", choice);

    choiceButton.textContent = choice;
    // console.log(currentScore);

    // display on the page
    choiceElement.appendChild(choiceButton);

    choiceButton.addEventListener("click", function () {
      if (
        this.value == currentQuestion.correctAnswer &&
        currentIndex != questions.length - 1
      ) {
        currentScore += 20;
        // console.log(currentScore);
        currentIndex++;
        quiz();
      } else if (
        this.value != currentQuestion.correctAnswer &&
        currentIndex != questions.length - 1
      ) {
        timerCount -= 10;
        currentScore -= 5;
        currentIndex++;
        quiz();
      } else {
        displayScore(currentScore);
      }
    });
  }
}

// function checkAnswer() {
//   if (this.value == questions[currentIndex].correctAnswer) {
//     currentScore += 20;
//     console.log(currentScore);
//     currentIndex++;
//   } else {
//     timerCount - 10;
//   }
// }

// ensures only the quiz preview is presented to the user
function init() {
  //   hideQuestions();
  highScores.setAttribute("style", "display: none");
  resultsScreen.setAttribute("style", "display: none");
  //   hideLeaderBoard();
}
init();
function hideQuestions() {
  questionElement.setAttribute("style", "display: none");
  //   document.getElementById("question1").style.display = "none";
  //   document.getElementById("question2").style.display = "none";
  //   document.getElementById("question3").style.display = "none";
  //   document.getElementById("question4").style.display = "none";
  //   document.getElementById("question5").style.display = "none";
}

// function hideResults() {
//   document.getElementById("results").style.display = "none";
// }

// function hideLeaderBoard() {
//   document.getElementById("leaderboard").style.display = "none";
// }

// function hidePreview() {
//   document.getElementById("quiz-preview").style.display = "none";
// }

function displayScore() {
  hideQuestions();
  clearInterval(timer);
  resultsScreen.setAttribute("style", "display: unset");
  console.log(currentScore);

  finalScore.innerHTML = currentScore.toString();

  submitButton.addEventListener("click", function () {
    var scoreboardEntry = {
      initials: initialsElement.value,
      score: currentScore,
    };

    localStorage.setItem("scoreboardEntry", JSON.stringify(scoreboardEntry));
    renderHighScores(scoreboardEntry);
  });

  //   document.getElementById("results").style.display = "unset";
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    // console.log(timerCount);
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // test if user completed quiz
      if (quizComplete && timerCount > 0) {
        clearInterval(timer);
        // TODO: finish displayScore function
        displayScore();
      }
    }
    // test if the timer ran out
    if (timerCount === 0) {
      clearInterval(timer);
      displayScore();
    }
  }, 1000);
}

// TODO: GET HELP ON QUIZ LOGIC

// loads the page allowing user to begin taking the quiz upon clicking

// when the user clicks the start button, execute the start quiz funtion
startButton.addEventListener("click", startQuiz);

// TODO: try creating another list button called "next question" that populateds after the user has clicked an answer
// if correct, change selected button background to green, add points to user's score, then when next is clicked, clear current question and go to the next question
// if incorrect, change button to red, detract score, detract time, then when next is clicked, clear current question and display next question

// TODO: create an object for every question
function renderHighScores() {
  resultsScreen.setAttribute("style", "display: none");
  highScores.setAttribute("style", "display: unset");

  var scoreboardSubmission = JSON.parse(
    localStorage.getItem("scoreboardEntry")
  );
  console.log(scoreboardSubmission);
  // Check if data is returned, if not exit out of the function
  if (scoreboardSubmission !== null) {
    document.getElementById("score-rank").innerHTML =
      scoreboardSubmission.initials + " " + scoreboardSubmission.score;
  } else {
    return;
  }
}
