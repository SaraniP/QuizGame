const questions = [
    {
        question: "Which keyword is used to define a function in Python?",
        options: ["func", "def", "define", "void"],
        answer: "def"
    },
    {
        question: "Which language is mainly used to style a webpage?",
        options: ["HTML", "CSS", "Python", "SQL"],
        answer: "CSS"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which symbol is used for comments in Python?",
        options: ["//", "#", "/*", "<!--"],
        answer: "#"
    },
    {
        question: "Which method is used to print something in JavaScript?",
        options: [
            "console.log()",
            "print()",
            "echo()",
            "display()"
        ],
        answer: "console.log()"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);

    const container = document.querySelector(".quiz-container");
    const question = questions[currentQuestion];

    const progressPercent =
        ((currentQuestion + 1) / questions.length) * 100;

    container.innerHTML = `
        <p class="progress">
            Question ${currentQuestion + 1} of ${questions.length}
        </p>

        <p id="timer">⏱️ Time Left: 15s</p>

        <div class="progress-bar">
            <div class="progress-fill"
                 style="width: ${progressPercent}%">
            </div>
        </div>

        <h2>${question.question}</h2>

        <div class="options">
            ${question.options.map(option => `
                <button class="option-btn" onclick="checkAnswer('${option}')">
                    ${option}
                </button>
            `).join("")}
        </div>
    `;

    startTimer();
}

function startTimer() {
    timeLeft = 15;

    const timerElement = document.getElementById("timer");

    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;

        timerElement.textContent =
            `⏱️ Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);

            currentQuestion++;

            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

function checkAnswer(selectedAnswer) {
    clearInterval(timer);

    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.innerText === question.answer) {
            button.classList.add("correct");
        }

        if (
            button.innerText === selectedAnswer &&
            selectedAnswer !== question.answer
        ) {
            button.classList.add("wrong");
        }
    });

    if (selectedAnswer === question.answer) {
        score++;
    }

    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    clearInterval(timer);

    const container = document.querySelector(".quiz-container");

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    let message;

    if (percentage >= 80) {
        message = "🏆 Excellent!";
    } else if (percentage >= 50) {
        message = "👍 Good Job!";
    } else {
        message = "📚 Keep Practicing!";
    }

    container.innerHTML = `
        <div class="result">
            <h1>🎉 Quiz Completed!</h1>

            <p class="result-message">${message}</p>

            <div class="score-circle">
                ${percentage}%
            </div>

            <p>You scored</p>

            <h2>${score} / ${questions.length}</h2>

            <button onclick="location.reload()">
                🔄 Play Again
            </button>
        </div>
    `;
}