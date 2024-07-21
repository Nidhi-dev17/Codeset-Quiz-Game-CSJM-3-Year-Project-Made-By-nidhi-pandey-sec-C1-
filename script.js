const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');




//make an arry of obj that store question 
const quiz = [
    {
        question:"Q. Which of the following is not a CSS box model Property?",
        choices: ["margin","padding","border-radius","border-collapse"],
        answer: "border-collapse"
    },
    {
        question:"Q. Which of the following is not a JavaScript data type?",
        choices: ["string","bollean","object","float"],
        answer: "float"
    },   
    {
        question:"Q. Which of the following CSS style property is used to specify an italic text?",
        choices: ["style","font","font-style","oblique"],
        answer: "font-style"
    },
    {
        question:"Q. Which of the following tag is used for inserting the largest heading in HTML? ",
        choices: ["head","<h1>","<h6>","heading"],
        answer: ") <h1>"
    },
    {
        question:"Q. Which of the following is the correct syntax to link an external style sheet in the HTML file?",
        choices: ["<link rel=”stylesheet” href=”style.css” />","<link rel=”stylesheet” src=”style.css” />","<style rel=”stylesheet” src=”style.css” />","<style rel=”stylesheet” link=”style.css” />"],
        answer: "<link rel=”stylesheet” href=”style.css” />"
    },
    {
        question:"Q. Which of the following is the first CSS specification to become an official W3C Recommendation?",
        choices: [" CSS level 2","(X)HTML CSS"," CSS level 1"," CSS level 2.1"],
        answer: " CSS level 1"
    },
    {
        question:"Q. What is DOM in HTML?",
        choices: [" Language dependent application programming","Hierarchy of objects in ASP.NET","Application programming interface","Convention for representing and interacting with objects in html documents"],
        answer: " Convention for representing and interacting with objects in html documents"
    },
    {
        question:"Q. Which element is used to get highlighted text in HTML5?",
        choices: ["<u>","<mark>","<highlight>","<b>"],
        answer: " <mark>"
    },
    {
        question:"Q. HTML is a subset of ___________?",
        choices: ["SGMT","SGML","SGME","XHTML"],
        answer: "SGML"
    },
    {
        question:"Q. In HTML, which attribute is used to create a link that opens in a new window tab?",
        choices: ["src=”_blank”","alt=”_blank”","target=”_self”"," target=”_blank”"],
        answer: " target=”_blank”"
    },
    {
    question:"Q. Which tag is used to create a dropdown in HTML Form? ",
    choices: ["<input>","<select>","<text>","<textarea>"],
    answer: "<select>"
    },
    {
        question:"Q. Who developed Python Programming Language?",
        choices: ["Wick van Rossum"," Rasmus Lerdorf","Guido van Rossum","Niene Stom"],
        answer: "Guido van Rossum"
    },
    {
        question:"Q. Is Python code compiled or interpreted?",
        choices: ["Python code is both compiled and interpreted","Python code is neither compiled nor interpreted","Python code is only compiled","Python code is only interpreted"],
        answer: "Python code is both compiled and interpreted"
    },
    {
        question:"Q. Which of the following is used to define a block of code in Python language?",
        choices: ["Indentation","Key","Brackets","All of the mentioned"],
        answer: "Indentation"
    },
    {
        question:"Q. Which of the following functions can help us to find the version of python that we are currently working on?",
        choices: ["sys.version(1)"," sys.version(0)","sys.version()"," sys.version"],
        answer: "sys.version"
    },
    {
        question:"Q. Which of the following is the correct syntax of including a user defined header files in C++?",
        choices: ["#include [userdefined]"," #include “userdefined”"," #include <userdefined.h>","#include <userdefined>"],
        answer: "#include “userdefined”"
    },
    {
        question:"Q. Which of the following is a correct identifier in C++?",
        choices: ["VAR_1234"," $var_name","7VARNAME","None of them"],
        answer: "VAR_1234"
    },
    {
        question:"Q. Which of the following is not a type of Constructor in C++?",
        choices: [" Default constructor","Parameterized constructor"," Copy constructor"," Friend constructor"],
        answer: " Friend constructor"
    },
    {
        question:"Q. By default, all the files in C++ are opened in _________ mode.?",
        choices: ["Binary"," VTC","Text","ISCII"],
        answer: "Text"
    },
    {
        question:"Q. Which of the following is used to terminate the function declaration in C++?",
        choices: [";","]",")",":"],
        answer: ";"
    }
];



//making variable
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;


//arro fucntion to show que
const showQuestions = () =>{
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;


    choicesBox.textContent = "";
    for(let i=0; i<questionDetails.choices.length; i++){
      const currentChoice = questionDetails.choices[i];
      const choiceDiv = document.createElement('div');
      choiceDiv.textContent = currentChoice;
      choiceDiv.classList.add('choice');
      choicesBox.appendChild(choiceDiv);

      choiceDiv.addEventListener('click',()=>{
        if(choiceDiv.classList.remove('selected')){
            choiceDiv.classList.remove('selected');
        }
        else{
            choiceDiv.classList.add('selected');
        }
      });
    }
    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// fuction to check answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer) { 
        displayAlert("Correct Answer");
        score++;
    }
    else{
        
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        
        showQuestions();
        }
        else{
            stopTimer();
            showScore();  
        }
}

//function to show score
const showScore = () =>{
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You scored ${score} out of ${quiz.length}!`;
    displayAlert("You Have Completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";

    
}
//function to show alert 
const displayAlert = (msg) =>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
    
}

//start time
const startTimer = () => {
    clearInterval(timerID); //check if anay exixt
    timer.textContent = timeLeft;

    const countDown = ()=> {
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown,1000);
}

//function to stop timer
const stopTimer = () =>{
    clearInterval(timerID);
}



//function to shuffle question 
const shuffleQuestions = ()=>{
   for(let i=quiz.length-1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [quiz[i],quiz[j]] = [quiz[j], quiz[i]];
   }
   currentQuestionIndex = 0;
   showQuestions();
}
   // function to start quiz
   const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();

}
//adding event listner to start button
startBtn.addEventListener('click',()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});





nextBtn.addEventListener('click',()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        
        displayAlert("Select your answer");
        return;
    }
    if(quizOver){
    nextBtn.textContent = "Next";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    quizOver = false;
    score = 0;
    startQuiz();
    }
    else{
    checkAnswer();
    }
});



