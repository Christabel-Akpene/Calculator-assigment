let mainQuestion = document.getElementById("mainQuestion");
let choice_a = document.querySelector(".choice-a");
let choice_b = document.querySelector(".choice-b");
let choice_c = document.querySelector(".choice-c");
let choice_d = document.querySelector(".choice-d");
let choices = document.querySelectorAll(".choices");
let choices_wrapper = document.querySelectorAll(".choices-wrapper");
let nextButton = document.querySelector("#next");
let endQuiz = document.querySelector(".endquiz");
let playerScore = document.querySelector(".playerscore");
let scoreMessage = document.querySelector(".score_message");
let questionCount = document.querySelector(".questioncount");
let quizWrapper = document.querySelector(".quiz-wrapper");
let restartQuiz = document.querySelector(".restartquiz");
let viewScores = document.querySelector(".viewscores");
let closeIcon = document.querySelector(".close");
let loader = document.querySelector(".loader");
let closeLoader = document.querySelector(".closeLoader");
let closeContainer = document.querySelector(".close-container")

// Quiz data
let questionNumber = 0;
let questionCounter = 1;
let score = 0;
let questionData;
let correct_answer; 
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const url =
  "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple";


closeIcon.onclick = function(){
  window.location.replace("mainPage.html");
}
function check_answer(e) {
  for (let choice of choices_wrapper) {
    choice.classList.add("disabled-pointer");
  }

  let selected = e.target;
  let selected_answer = selected.textContent;

  if (selected_answer === correct_answer) {
    selected.parentElement.classList.add("correct-answer");
    score += 1
  } else {
    selected.parentElement.classList.add("wrong-answer");

    let arrayChoices = [...choices];
    const find_correct_answer = arrayChoices.find(
      (element) => element.textContent === correct_answer
    );
    find_correct_answer.parentElement.classList.add("correct-answer");
  }

  nextButton.style.display = "block";
}


function getNextQuestion(data) {
  questionNumber += 1;
  questionCount.textContent = `${questionNumber + 1}  / 10 `


  if (questionNumber < 10) {
    getQuestion(data);
  } else {
    endQuiz.style.display = "block";
    quizWrapper.style.display = "none";
    playerScore.textContent = `${score} / 10`;
    let totalScores = {
      name: `Score 1`,
      newScore: score
    }
    highScores.push(totalScores);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    
    if (score <= 2) {
      scoreMessage.textContent = "Well, that was an attempt. Let's not call it a success."
    } else if (score > 2 && score <= 4) {
      scoreMessage.textContent = "Just under halfway there. Maybe next time, try reading the questions?"
    } else if (score > 4 && score <= 7) {
      scoreMessage.textContent = "More than half right, but I'm sure some guesses worked in your favor."
    } else {
      scoreMessage.textContent = "Wow, a genius. Did you cheat or are you really that good?"
    }

    restartQuiz.onclick = function(){
      window.location.replace("mainPage.html");
    }
    viewScores.onclick = function(){
      window.location.replace("scores.html");
    }
  }

  for (let choice of choices) {
    choice.parentElement.classList.remove("correct-answer", "wrong-answer");
    choice.parentElement.classList.remove("disabled-pointer");
  }
}

function setupEventListeners(data) {

  for (let choice of choices) {
    choice.addEventListener("click", check_answer);
  }
  
  nextButton.addEventListener("click", function() {
    getNextQuestion(data);
  });
}


const getQuestion = (data) => {
  nextButton.style.display = "none";
  let result = data.results[questionNumber];

  if (questionNumber < 10) {
    mainQuestion.textContent = result.question;
  }

  console.log(result);

  correct_answer = result.correct_answer;
  answers = [...result.incorrect_answers, correct_answer];

  choice_a.textContent = `${answers[0]}`;
  choice_b.textContent = `${answers[1]}`;
  choice_c.textContent = `${answers[2]}`;
  choice_d.textContent = `${answers[3]}`;
  

};

let quizQuestions = async () => {

  closeLoader.onclick = function(){
    window.location.replace("mainPage.html");

  }
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data){
      loader.style.display = "block";

    }

      quizWrapper.style.display = "block";
      loader.style.display = "none";
      closeContainer.style.display = "none";
      setupEventListeners(data); 
      getQuestion(data);
    
    
  } catch (error) {
    console.log(error);
  }
};


quizQuestions();