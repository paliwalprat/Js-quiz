// Quiz Questions Data
const questions = [
    {
        text: "Which language is primarily used for web app development?",
        options: ["C#", "Python", "JavaScript", "Swift"],
        correct: 2
    },
    {
        text: "Which of the following is a relational database management system?",
        options: ["Oracle", "Scala", "Perl", "Java"],
        correct: 0
    },
    {
        text: "What does HTML stand for?",
        options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 2
    },
    {
        text: "What does CSS stand for?",
        options: ["Cascading Stylesheets", "Cascading Styling Styles", "Cascading Sheets for Stylings", "Cascaded Stylesheets"],
        correct: 0
    },
    {
        text: "Which of the following is not an object-oriented programming language?",
        options: ["Java", "C#", "Scala", "C"],
        correct: 3
    },
    {
        text: "Which tool is used to ensure code quality in JavaScript?",
        options: ["JSLint", "TypeScript", "Babel", "Webpack"],
        correct: 0
    },
    {
        text: "What is the primary use of the Git command 'clone'?",
        options: ["To stage changes", "To copy a repository", "To switch to a different branch", "To list all the files in a repository"],
        correct: 1
    },
    {
        text: "What does API stand for in the context of programming?",
        options: ["Apple Pie Interface", "Application Programming Interface", "Advanced Peripheral Integration", "Application Process Integration"],
        correct: 1
    },
    {
        text: "Javascript is a single-threaded programming language",
        options: ["True", "False"],
        correct: 0
    },
    {
        text: "API calls in Javascript can be done using the following method",
        options: ["setTimeout()", "setInterval()", "fetch()", "get()"],
        correct: 2
    },
];

// DOM Elements
const questionElement = document.getElementById('question');
const answerListElement = document.getElementById('answer-list');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Load the current question and options
const loadQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.text;

    answerListElement.innerHTML = currentQuestion.options
        .map((option, index) => `
            <li>
                <label>
                    <input type="radio" name="answer" value="${index}">
                    ${option}
                </label>
            </li>
        `).join('');

    submitButton.disabled = false;
    nextButton.disabled = true;
    answered = false;
};

// Handle answer submission
submitButton.addEventListener("click", () => {
    if (answered) return;

    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please select an answer before submitting.");
        return;
    }

    const selectedAnswerIndex = parseInt(selectedOption.value);
    const currentQuestion = questions[currentQuestionIndex];

    const selectedLi = selectedOption.closest('li');
    if (selectedAnswerIndex === currentQuestion.correct) {
        score++;
        selectedLi.style.backgroundColor = 'green'; // Correct answer
    } else {
        selectedLi.style.backgroundColor = 'red'; // Wrong answer
        // Highlight the correct answer
        const correctOption = answerListElement.children[currentQuestion.correct];
        correctOption.style.backgroundColor = 'green';
    }

    submitButton.disabled = true;
    nextButton.disabled = false;
    answered = true;
});

// Handle next question
nextButton.addEventListener("click", () => {
    if (!answered) return;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
});

// Display final score
const showFinalScore = () => {
    questionElement.textContent = `Quiz complete! You scored ${score} out of ${questions.length}.`;
    answerListElement.innerHTML = "";
    submitButton.style.display = 'none';
    nextButton.style.display = 'none';
};

// Initialize the quiz
document.addEventListener('DOMContentLoaded', loadQuestion);
