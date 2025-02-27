// DOM Elements
let mainQuestion = document.getElementById("mainQuestion");
let choice_a = document.querySelector(".choice-a");
let choice_b = document.querySelector(".choice-b");
let choice_c = document.querySelector(".choice-c");
let choice_d = document.querySelector(".choice-d");
let choices = document.querySelectorAll(".choices");
let choices_wrapper = document.querySelectorAll(".choices-wrapper");
let nextButton = document.querySelector("#next");


// Quiz data
let questionNumber = 0;
let questionCounter = 1;
let score = 0;
let questionData;

const url =
  "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple";

let quizQuestions = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    getQuestion(data);
  } catch (error) {
    console.log(error);
  }
};

const getQuestion = async (data) => {


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

  for (let choice of choices) {
    choice.addEventListener("click", (e) => check_answer(e));
  }

  function check_answer(e) {
    for (let choice of choices_wrapper) {
      // choice.addEventListener("click", check_answer);
      choice.classList.add("disabled-pointer");
    }

    let selected = e.target;
    let selected_answer = selected.textContent;

    if (selected_answer === correct_answer) {
      selected.parentElement.classList.add("correct-answer");

    }
     else {
      selected.parentElement.classList.add("wrong-answer");

      let arrayChoices = [...choices]

      const find_correct_answer = arrayChoices.find(
        (element) => element.textContent === correct_answer
      );

      find_correct_answer.parentElement.classList.add("correct-answer");


      // correct_answer.classList.add("wrong-answer")
    }

    nextButton.style.display = "block";

    nextButton.removeEventListener("click", handleNext);
    nextButton.addEventListener("click", handleNext);

  }

  

};

function handleNext(){
  getNextQuestion(data)
}


function  getNextQuestion(data) {
  questionNumber += 1;

  if (questionNumber < 10){
    getQuestion(data)
  }
  else{
    console.log("quiz finished")
  }

  for (let choice of choices){
    choice.parentElement.classList.remove("correct-answer", "wrong-answer");
    choice.parentElement.classList.remove("disabled-pointer");
  }

 
  
}


quizQuestions();




// alternative 
