let scorecontainer = document.querySelector(".scores-container");
let scorewrapper = document.querySelector(".scores-wrapper")
let home = document.querySelector(".home");
let reset = document.querySelector(".reset");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

for (i = 0; i<highScores.length; i++){
    let score_paragraph = document.createElement("p");
    score_paragraph.textContent = `Quiz ${i + 1} : ${highScores[i].newScore}`;
    score_paragraph.classList.add("showScore");
    scorewrapper.appendChild(score_paragraph);
    console.log(score_paragraph);
}

home.onclick = function(){
    window.location.replace("mainPage.html");
}

reset.onclick = function(){
    localStorage.clear();
}