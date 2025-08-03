document.addEventListener('DOMContentLoaded', () => {
    const quizIntro = document.getElementById('quiz-intro');
    const quizArea = document.getElementById('quiz-area');
    const resultsArea = document.getElementById('results');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const nextButton = document.getElementById('next-btn');
    const questionCounter = document.getElementById('question-counter');
    const progressBar = document.getElementById('progress');
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');
    const restartButton = document.getElementById('restart-btn');
    
    let currentQuiz = null;
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    
    const quizzes = {
        math: [
            {
                question: "What is the value of π (pi) to two decimal places?",
                options: ["3.14", "3.16", "3.12", "3.18"],
                answer: 0
            },
            {
                question: "What is the square root of 64?",
                options: ["6", "7", "8", "9"],
                answer: 2
            }
        ],
        science: [
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                answer: 2
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                answer: 1
            }
        ],
        general: [
            {
                question: "Which country is home to the kangaroo?",
                options: ["New Zealand", "South Africa", "Australia", "Argentina"],
                answer: 2
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                answer: 3
            }
        ]
    };
    
    // Start quiz when category is selected
    document.querySelectorAll('.quiz-categories button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            currentQuiz = quizzes[category];
            startQuiz();
        });
    });
    
    function startQuiz() {
        quizIntro.style.display = 'none';
        quizArea.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        showQuestion();
    }
    
    function showQuestion() {
        const question = currentQuiz[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionsContainer.innerHTML = '';
        
        questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${currentQuiz.length}`;
        progressBar.style.width = `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%`;
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(button);
        });
    }
    
    function selectAnswer(index) {
        const question = currentQuiz[currentQuestionIndex];
        userAnswers.push({
            question: question.question,
            userAnswer: question.options[index],
            correctAnswer: question.options[question.answer],
            isCorrect: index === question.answer
        });
        
        if (index === question.answer) {
            score++;
        }
        
        // Disable all options after selection
        const options = optionsContainer.querySelectorAll('button');
        options.forEach(option => {
            option.disabled = true;
            if (option.textContent === question.options[question.answer]) {
                option.style.backgroundColor = 'var(--secondary-color)';
                option.style.color = 'white';
            }
        });
        
        nextButton.style.display = 'block';
    }
    
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.length) {
            showQuestion();
            nextButton.style.display = 'none';
        } else {
            showResults();
        }
    });
    
    function showResults() {
        quizArea.style.display = 'none';
        resultsArea.style.display = 'block';
        
        scoreElement.textContent = `You scored ${score} out of ${currentQuiz.length}`;
        
        feedbackElement.innerHTML = '<h3>Question Review:</h3>';
        userAnswers.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'feedback-item';
            div.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> ${item.question}</p>
                <p>Your answer: ${item.userAnswer} ${item.isCorrect ? '✅' : '❌'}</p>
                ${!item.isCorrect ? `<p>Correct answer: ${item.correctAnswer}</p>` : ''}
                <hr>
            `;
            feedbackElement.appendChild(div);
        });
    }
    
    restartButton.addEventListener('click', () => {
        resultsArea.style.display = 'none';
        quizIntro.style.display = 'block';
    });
});