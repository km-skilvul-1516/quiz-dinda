

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const questionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator")
const homeBox = document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBoX = document.querySelector(".result-box")

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push the question into availableQuestion Array
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

//set question number and question and options
function getNewQuestion() {
    //set question number 
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    //set question text 
    //set random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //get the position of "wuestionIndex" from availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the  "questionIndex" from the availableQuestion Array, so that the question dos not repeat
    availableQuestions.splice(index1, 1)

    //set options
    //get the length of options
    const optionLen = currentQuestion.options.length
    //push option into availableOption Array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    //create option in HTML
    for (let i = 0; i < optionLen; i++) {
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get the posisition of optionIndex from the availableOption array 
        const index2 = availableOptions.indexOf(optionIndex);
        //remove the 'optionIndex' from the availableOption, so that option does not repeat
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)")
    }

    questionCounter++
}

//get the result of current attempt question
function getResult(element) {
    const id = parseInt(element.id);
    //get the answer by ccomparing the id of clicked option 
    if (id === currentQuestion.answer) {
        //set the green color to the correct option
        element.classList.add("correct");
        //add the indicator to corect mark
        updateAnswerIndicator("correct");
        correctAnswer++;
    }
    else {
        //set the red color to the incorrect option
        element.classList.add("wrong");
        //add the indicator to wrong mark
        updateAnswerIndicator("wrong");

        //if the answer is incorrect the show the correct option by adding color the correct option
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++)
            if (parseInt(optionContainer.children[i], id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
    }
    attempt++;
    unclickableOption();
}



//make all the option unclickeable once the user select an option (Restrict the user to change the answer)
function unclickableOption() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answerIndicator() {
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answerIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}
function next() {
    if (questionCounter === quiz.length) {
        //set the green color to the correct option
        quizOver();
    }
    else {
        getNewQuestion();
    }
}

function quizOver() {
    //hide quiz box
    quizBox.classList.add("hide");
    //show result box
    resultBoX.classList.remove("hide");
    quizResult();
}

//get the quiz Result
function quizResult() {
    resultBoX.querySelector(".total-question").innerHTML = quiz.length;
    resultBoX.querySelector(". total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBoX.querySelector(".total-wrong").innerHTML = attempt - correctAnswer;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBoX.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBoX.querySelector(".total-score").innerHTML = correctAnswers + " / " + QUIZ.length;
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainqUIZ() {
    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuIZ();
}

function goToHome() {
    //hide result box
    resultBoX.classList.add("hide");
    //show home box 
    homeBox.classList.remove("hide");
    resetQuiz();
}

// ### STARTING POINT ####
function startQuiz() {
    //hide home box
    homeBox.classList.add("hide");
    ///show quiz box
    quizBox.classList.remove("hide");
    //first we will set all question in avalaibleQuestions Array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();
    //to create indicator of answer
    answerIndicator();
}


// window.onload = function () {
//     setAvailableQuestions();
//     getNewQuestion();
// }