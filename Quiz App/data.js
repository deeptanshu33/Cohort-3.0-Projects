//  use this quizData in your app.
const quizData = [{
    "question": "Which language runs in a web browser?",
    "a": "Java",
    "b": "C",
    "c": "Python",
    "d": "JavaScript",
    "correct": "d",
},
{
    "question": "What does CSS stand for?",
    "a": "Central Style Sheets",
    "b": "Cascading Style Sheets",
    "c": "Cascading Simple Sheets",
    "d": "Cars SUVs Sailboats",
    "correct": "b",
},
{
    "question": "What does HTML stand for?",
    "a": "Hypertext Markup Language",
    "b": "Hypertext Markdown Language",
    "c": "Hyperloop Machine Language",
    "d": "Helicopters Terminals Motorboats Lamborginis",
    "correct": "a",
},
{
    "question": "What year was JavaScript launched?",
    "a": "1996",
    "b": "1995",
    "c": "1994",
    "d": "none of the above",
    "correct": "b",
},
// you can add more quiz here
]

const questionElement = document.getElementById("question");
const options = document.getElementById("options");
const next_btn = document.getElementById("nxt-btn");

let curr_idx = 0;
let score = 0;

function startQuiz(){
    curr_idx = 0;
    score = 0;
    next_btn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currQues = quizData[curr_idx];
    questionElement.innerHTML = currQues.question;

    //creating four option buttons
    const btn_a = document.createElement("button");
    btn_a.innerHTML = currQues.a;
    btn_a.classList.add("btn");
    btn_a.addEventListener("click", selectAnswer);
    options.appendChild(btn_a);

    const btn_b = document.createElement("button");
    btn_b.innerHTML = currQues.b;
    btn_b.classList.add("btn");
    btn_b.addEventListener("click", selectAnswer);
    options.appendChild(btn_b);

    const btn_c = document.createElement("button");
    btn_c.innerHTML = currQues.c;
    btn_c.classList.add("btn");
    btn_c.addEventListener("click", selectAnswer);
    if(currQues[currQues.correct] === currQues.c){

    }
    options.appendChild(btn_c);

    const btn_d = document.createElement("button");
    btn_d.innerHTML = currQues.d;
    btn_d.classList.add("btn");
    btn_d.addEventListener("click", selectAnswer);
    options.appendChild(btn_d);
}

function resetState(){
    next_btn.style.display = "none";
    while(options.firstChild){
        options.removeChild(options.firstChild);
    }
}

let selectedOption = null;

function selectAnswer(e){
    const clickedBtn = e.target;
    if(selectedOption){
        selectedOption.classList.remove("selected");
    }
    clickedBtn.classList.add("selected");
    selectedOption = clickedBtn;

    next_btn.style.display = "block";
}

next_btn.addEventListener("click", ()=>{
    if(!selectedOption) return;

    const currQues = quizData[curr_idx];
    if(selectedOption.innerHTML === currQues[currQues.correct]){
        score++;
    }

    curr_idx++;

    if(curr_idx<quizData.length){
        showQuestion();
    }
    else{
        showResult();
    }
})

function showResult(){
    resetState();
    questionElement.innerHTML = `Quiz Completed! Your score: ${score}/${quizData.length}`;
    next_btn.style.display = "block";
    next_btn.innerHTML = "Play again";
    next_btn.addEventListener("click", restart);
}

function restart(){
    next_btn.removeEventListener("click", restart);
    startQuiz();
}

startQuiz();