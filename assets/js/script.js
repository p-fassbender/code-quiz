var timeRemaining = 75;
var questionIndex = 0;
var scoresObjArr = [];
var timer;

var question1 = {
    question: "Commonly used data types DO NOT include:",
    A: "strings",
    B: "booleans",
    C: "alerts",
    D: "numbers",
    correct: "c"
};
var question2 = {
    question: "The condition in an if/else statement is enclosed with _____.",
    A: "quotes",
    B: "curly brackets",
    C: "parenthesis",
    D: "square brackets",
    correct: "c"
};
var question3 = {
    question: "Arrays in JavaScript can be used to store _____.",
    A: "numbers and strings",
    B: "other arrays",
    C: "booleans",
    D: "all of the above",
    correct: "d"
};
var question4 = {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    A: "commas",
    B: "curly brackets",
    C: "quotes",
    D: "parenthesis",
    correct: "c"
};
var question5 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    A: "JavaScript",
    B: "terminal/bash",
    C: "for loops",
    D: "console.log",
    correct: "d"
};
var quiz = [question1, question2, question3, question4, question5];

// dynamically creates all html elements
var body = document.body;

var headerEl = document.createElement("header");
var highScoresEl = document.createElement("h2");
var timeEl = document.createElement("h2");

var quizContainer = document.createElement("main");

var titleEl = document.createElement("div");
titleEl.id = "titleEl"
var titleTextEl = document.createElement("h1");

var infoEl = document.createElement("div");
infoEl.id = "infoEl";
var infoTextEl = document.createElement("p");

// start quiz button
var startQuizBtn = document.createElement("button");
startQuizBtn.textContent = "Start Quiz";
startQuizBtn.id = "start-button";

// restart quiz button
var restartBtn = document.createElement("button");
restartBtn.textContent = "Return to Quiz";
restartBtn.id = "restart-button";

//multiple choice options
var choicesListEl = document.createElement("ul");
choicesListEl.id = "choicesListEl";
var choiceLi1 = document.createElement("li");
var choiceBtn1 = document.createElement("button");
choiceBtn1.textContent = "Option 1";
choiceBtn1.className = "choice";
choiceBtn1.id = "a";
var choiceLi2 = document.createElement("li");
var choiceBtn2 = document.createElement("button");
choiceBtn2.textContent = "Option 2";
choiceBtn2.className = "choice";
choiceBtn2.id = "b";
var choiceLi3 = document.createElement("li");
var choiceBtn3 = document.createElement("button");
choiceBtn3.textContent = "Option 3";
choiceBtn3.className = "choice";
choiceBtn3.id = "c";
var choiceLi4 = document.createElement("li");
var choiceBtn4 = document.createElement("button");
choiceBtn4.textContent = "Option 4";
choiceBtn4.className = "choice";
choiceBtn4.id = "d";

// right or wrong display
var correctOrWrongEl = document.createElement("div");
correctOrWrongEl.id = "correctOrWrongDiv";
var correctOrWrongTextEl = document.createElement("p");

// score submission form
var formEl = document.createElement("form");
formEl.setAttribute("style", "display: flex;");
var formInputDivEl = document.createElement("div");
formInputDivEl.className = "form-group";
var formInputEl = document.createElement("input");
formInputEl.type = "text";
formInputEl.name = "player-initials";
formInputEl.placeholder = "Enter Your Initials"
formEl.appendChild(formInputDivEl);
formInputDivEl.appendChild(formInputEl);
var formSubmitDivEl = document.createElement("div");
formSubmitDivEl.className = "form-group";
var formSubmit = document.createElement("button");
formSubmit.id = "save-score";
formSubmit.type = "submit";
formSubmit.textContent = "Submit"
formEl.appendChild(formSubmitDivEl)
formSubmitDivEl.appendChild(formSubmit);

// dynamically adds header to the body
body.appendChild(headerEl);
headerEl.appendChild(highScoresEl);
highScoresEl.textContent = "View High Scores";
headerEl.appendChild(timeEl);


// dynamically builds the quiz skeleton
body.appendChild(quizContainer)
quizContainer.appendChild(titleEl);
titleEl.appendChild(titleTextEl);
quizContainer.appendChild(infoEl);



// triggers when a multiple choice answer button is clicked
function choiceButtonHandler(event) {
    event.preventDefault();
    let targetEl = event.target;
    if (targetEl.matches(".choice")) {
        let btnId = event.target.getAttribute("id");
        if (btnId == quiz[questionIndex].correct) {
            correctOrWrongTextEl.textContent = "Correct!";
        }
        else {
            correctOrWrongTextEl.textContent = "Wrong!";
            timeRemaining -= 10;
        }

        if (questionIndex < quiz.length - 1) {
            questionIndex++;
            questionPage();
        }
        else {
            endPage();
        }
    }
}

// the first page of the quiz
function openingPage() {

    restartBtn.remove();
    timeRemaining = 75;
    timeEl.textContent = "Time: " + timeRemaining;
    infoEl.innerHTML = "";
    infoEl.appendChild(infoTextEl);
    quizContainer.appendChild(choicesListEl);
    quizContainer.appendChild(startQuizBtn);
    titleTextEl.textContent = "Coding Quiz Challenge"
    infoTextEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!"
    correctOrWrongTextEl.textContent = "";
    choicesListEl.innerHTML = "";
};

// populates the page with multiple choice question and answers
function questionPage() {
    startQuizBtn.remove();
    infoTextEl.textContent = "";
    titleTextEl.textContent = quiz[questionIndex].question;

    choiceBtn1.textContent = quiz[questionIndex].A;
    choicesListEl.appendChild(choiceLi1);
    choiceLi1.appendChild(choiceBtn1);

    choiceBtn2.textContent = quiz[questionIndex].B;
    choicesListEl.appendChild(choiceLi2);
    choiceLi2.appendChild(choiceBtn2);

    choiceBtn3.textContent = quiz[questionIndex].C;
    choicesListEl.appendChild(choiceLi3);
    choiceLi3.appendChild(choiceBtn3);

    choiceBtn4.textContent = quiz[questionIndex].D;
    choicesListEl.appendChild(choiceLi4);
    choiceLi4.appendChild(choiceBtn4);
}

// creates a page for submitting scores
function endPage() {
    clearInterval(timer);
    titleTextEl.textContent = "All Done!";
    choicesListEl.innerHTML = "";
    timeEl.textContent = "Time: " + timeRemaining;
    infoTextEl.textContent = "Your Final Score: " + timeRemaining;
    infoEl.appendChild(formEl);

}

// saves high scores from local storage into an array
function loadScores() {
    var savedScores = JSON.parse(localStorage.getItem("highscores")) || [];
    if (!savedScores) {
        return false;
    }
    for (let i = 0; i < savedScores.length; i++) {
        scoresObjArr.push(savedScores[i]);
    };
}

// displays a list of high scores that were stored locally
function displayScores() {
    console.log("view scores clicked");
    titleTextEl.textContent = "High Scores"
    infoTextEl.textContent = "";
    choicesListEl.innerHTML = "";
    correctOrWrongTextEl.textContent = "";
    formEl.innerHTML = "";
    clearInterval(timer);
    startQuizBtn.remove();
    quizContainer.appendChild(restartBtn);

    for (let i = 0; i < scoresObjArr.length; i++) {
        var listScore = document.createElement("li");
        listScore.textContent = scoresObjArr[i].name + " - " + scoresObjArr[i].score + " points";
        choicesListEl.appendChild(listScore);
    }
}

// listens for when the "return to quiz" button is click on the high scores page
restartBtn.addEventListener("click", function () {
    openingPage();
});

// listens for when the start quiz button is clicked
startQuizBtn.addEventListener("click", function () {
    questionIndex = 0;
    timer = setInterval(function () {
        timeRemaining--;
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            endPage();
        }
        timeEl.textContent = "Time: " + timeRemaining;
    }, 1000);

    quizContainer.appendChild(correctOrWrongEl);
    correctOrWrongEl.appendChild(correctOrWrongTextEl);

    questionPage();
});

// high score quiz end submit form button handler
formSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = formInputEl.value.toUpperCase();
    if (!initials) {
        alert("Please enter your initials");
        return false;
    }
    var scoresObj = {
        name: initials,
        score: timeRemaining,
    }
    scoresObjArr.push(scoresObj);
    localStorage.setItem("highscores", JSON.stringify(scoresObjArr));
    formEl.reset();
    openingPage();
});

// listens for when a choice button is clicked
quizContainer.addEventListener("click", choiceButtonHandler);

// listens for when "view high scores" is click in the header
highScoresEl.addEventListener("click", displayScores);

loadScores();
openingPage();