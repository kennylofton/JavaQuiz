const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
    {
        question: 'what is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },

    {
        question: 'The tallest building in the world is located in which city?',
        choice1: 'Dubai',
        choice2: 'NewYork',
        choice3: 'Shanghai',
        choice4: 'None of the above',
        answer: 1,
    },

    {
        question: 'Where does chocolate milk come from?',
        choice1: 'Milk + Chocolate',
        choice2: 'Chocolate cow',
        choice3: 'Flying cows',
        choice4: 'All of the above',
        answer: 2,
    },

    {
        question: 'How many sides in a triangle?',
        choice1: '2',
        choice2: '5',
        choice3: '1',
        choice4: '3',
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = ()=> 
{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () =>
{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS)
    {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'

    const  questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => 
        {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionsIndex, 1)

        acceptingAnswers = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => 
        {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()