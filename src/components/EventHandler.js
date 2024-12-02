export class EventHandler {
    constructor(quizManager) {
        this.quizManager = quizManager;
    }

    init() {
        const startQuiz = document.querySelector('.start-button');
        const playButton = document.querySelector('.play-button');
        const progressBar = document.querySelector('.progress');
        const timeDisplay = document.querySelector('.time');
        const birdList = document.querySelector('#birdList');
        const nextButton = document.querySelector('.next-button'); // "Next Question" tugmasi

        // Start Quiz bosilganda
        startQuiz.addEventListener('click', () => {
            this.quizManager.startQuiz();
        });

        // Play Button bosilganda
        playButton.addEventListener('click', (e) => {
            this.quizManager.audioPlayer.toggleAudio(
                e.target,
                progressBar,
                timeDisplay
            );
        });

        // Qushlar ro'yxatidan tanlash
        birdList.addEventListener('click', (e) => {
            if (e.target.classList.contains('bird-option')) {
                const selectedBird = e.target.dataset.bird;
                const isCorrect = this.quizManager.checkAnswer(selectedBird);

                // To'g'ri yoki noto'g'ri javob bo'yicha rangni o'zgartirish
                if (isCorrect) {
                    e.target.style.backgroundColor = 'green';
                    this.quizManager.audioPlayer.playFeedbackSound("correct");
                    nextButton.disabled = false; // "Next Question" tugmasi faollashadi
                } else {
                    e.target.style.backgroundColor = 'red';
                    this.quizManager.audioPlayer.playFeedbackSound("incorrect");
                }
            }
        });

        // "Next Question" tugmasi bosilganda
        nextButton.addEventListener('click', () => {
            this.quizManager.nextQuestion(); // Keyingi savolga o'tish
            nextButton.disabled = true; // Tugmani qayta o'chirish
        });
    }
}









