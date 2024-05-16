const questions = [
    {
        question: "What is the smallest header in HTML by default?",
        answers: [
            { text: "h3", correct: false},
            { text: "h6", correct: true},
            { text: "h1", correct: false},
            { text: "h2", correct: false},
        ]
    },
    {
        question: "Which of the following colors contain equal amounts of RBG?",
        answers: [
            { text: "White", correct: false},
            { text: "Gray", correct: false},
            { text: "Black", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "How is black color represented in terms of RGB values?",
        answers: [
            { text: "RGB(0, 0, 0)", correct: true},
            { text: "RGB(100, 100, 100)", correct: false},
            { text: "RGB(100, 100, 0)", correct: false},
            { text: "RGB(100, 0, 0)", correct: false},
        ]
    },
    {
        question: "Which attribute is used to provide a unique name to an HTML element?",
        answers: [
            { text: "id", correct: true},
            { text: "class", correct: false},
            { text: "type", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following things are necessary to create an HTML page?",
        answers: [
            { text: "A text editor", correct: false},
            { text: "Web Browser", correct: false},
            { text: "Both A and B", correct: true},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following is correct about HTML?",
        answers: [
            { text: "HTML uses user Defined Tags", correct: false},
            { text: "HTML uses tags defined within the language", correct: true},
            { text: "Both A and B", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following are examples of block-level elements in HTML?",
        answers: [
            { text: "div", correct: false},
            { text: "p", correct: false},
            { text: "h1", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: " What are the types of lists available in HTML?",
        answers: [
            { text: "Ordered, Unordered Lists", correct: true},
            { text: "Bulleted, Numbered Lists", correct: false},
            { text: "Named, Unnamed Lists", correct: false},
            { text: "None of the above", correct: false},
        ]   
    },
    {
        question: "Which of the following properties is used to change the font of text?",
        answers: [
            { text: "font-family", correct: true},
            { text: "font-size", correct: false},
            { text: "text-align", correct: false},
            { text: "None of the above", correct: false},
        ]   
    },
    {
        question: "Colors are defined in HTML using?",
        answers: [
            { text: "RGB Values", correct: false},
            { text: "HEX Values", correct: false},
            { text: "RGBA Values", correct: false},
            { text: "All of the above", correct: true},
        ]   
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();

