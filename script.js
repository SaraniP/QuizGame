const questions = [
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
        question: "Which keyword is used to define a function in Python?",
        options: ["func", "def", "define", "function"],
        answer: "def"
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
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        question: "Which CSS property is used to change text color?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "define", "variable", "int"],
        answer: "var"
    },
    {
        question: "Which HTML tag is used to display an image?",
        options: ["<image>", "<img>", "<picture>", "<src>"],
        answer: "<img>"
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: ["bgcolor", "background", "background-color", "color"],
        answer: "background-color"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        answer: "Netscape"
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        answer: "<h1>"
    },
    {
        question: "Which CSS property is used to make text bold?",
        options: ["font-weight", "text-bold", "font-style", "bold"],
        answer: "font-weight"
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        question: "Which HTML tag is used to create a paragraph?",
        options: ["<text>", "<paragraph>", "<p>", "<para>"],
        answer: "<p>"
    },
    {
        question: "Which language is used to add interactivity to webpages?",
        options: ["CSS", "HTML", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "Which CSS property is used to add space inside an element?",
        options: ["margin", "padding", "spacing", "border"],
        answer: "padding"
    },
    {
        question: "Which JavaScript method adds an item to the end of an array?",
        options: ["push()", "add()", "append()", "insert()"],
        answer: "push()"
    },
    {
        question: "Which HTML element is used to create an unordered list?",
        options: ["<ol>", "<list>", "<ul>", "<li>"],
        answer: "<ul>"
    },
    {
        question: "Which CSS property is used to make a rounded corner?",
        options: ["corner-radius", "border-radius", "round-border", "radius"],
        answer: "border-radius"
    }
];

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    quizQuestions = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    showQuestion();
}

function showQuestion() {
    clearInterval(timer);

    const container = document.querySelector(".quiz-container");
    const question = quizQuestions[currentQuestion];

    const progressPercent =
        ((currentQuestion + 1) / quizQuestions.length) * 100;

    container.innerHTML = `
        <p class="progress">
            Question ${currentQuestion + 1} of ${quizQuestions.length}
        </p>

        <p id="timer">⏱️ Time Left: 15s</p>

        <div class="progress-bar">
            <div class="progress-fill"
                 style="width: ${progressPercent}%">
            </div>
        </div>

        <h2>${question.question}</h2>

        <div class="options"></div>
    `;

    const optionsContainer = container.querySelector(".options");

    question.options.forEach(option => {
        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(option);
        });

        optionsContainer.appendChild(button);
    });

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

            if (currentQuestion < quizQuestions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

function checkAnswer(selectedAnswer) {
    clearInterval(timer);

    const question = quizQuestions[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === question.answer) {
            button.classList.add("correct");
        }

        if (
            button.textContent === selectedAnswer &&
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

        if (currentQuestion < quizQuestions.length) {
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
        (score / quizQuestions.length) * 100
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

            <h2>${score} / ${quizQuestions.length}</h2>

            <button onclick="location.reload()">
                🔄 Play Again
            </button>
        </div>
    `;
}