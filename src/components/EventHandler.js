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
        const nextButton = document.querySelector('.next-button'); 

        
        startQuiz.addEventListener('click', () => {
            this.quizManager.startQuiz();
        });

        
        playButton.addEventListener('click', (e) => {
            this.quizManager.audioPlayer.toggleAudio(
                e.target,
                progressBar,
                timeDisplay
            );
        });

    
        birdList.addEventListener('click', (e) => {
            if (e.target.classList.contains('bird-option')) {
                const selectedBird = e.target.dataset.bird;
                const isCorrect = this.quizManager.checkAnswer(selectedBird);

                
                if (isCorrect) {
                    e.target.style.backgroundColor = 'green';
                    this.quizManager.audioPlayer.playFeedbackSound("correct");
                    nextButton.disabled = false; 
                } else {
                    e.target.style.backgroundColor = 'red';
                    this.quizManager.audioPlayer.playFeedbackSound("incorrect");
                }
            }
        });

        
        nextButton.addEventListener('click', () => {
            this.quizManager.nextQuestion(); 
            nextButton.disabled = true; 
        });
    }
}









