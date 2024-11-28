import { birdsData } from "../../assets/db/data.js";
import { AudioPlayer } from "./AudioPlayer.js";
import { UIUpdater } from "./UIUpdater.js";

export class QuizManager {
    constructor() {
        this.audioPlayer = new AudioPlayer();
        this.uiUpdater = new UIUpdater();
        this.currentCategory = 0;
        this.currentBird = null;
        this.isAnswered = false;
        this.score = 0; 
    }

    startQuiz() {
        this.initQuestion();
        this.uiUpdater.startQuizUi();
        this.isAnswered = false;
    }

    initQuestion() {
        const categoryBird = birdsData[this.currentCategory];
        const randomNumber = Math.floor(Math.random() * categoryBird.length);
        this.currentBird = categoryBird[randomNumber];

        const playButton = document.querySelector('.play-button');
        playButton.dataset.audio = this.currentBird.audio;

        this.uiUpdater.updateBirdList(categoryBird);

        this.addBirdSelectionEvent(categoryBird);
    }

    addBirdSelectionEvent(categoryBird) {
        const birdOptions = document.querySelectorAll('.bird-option');

        birdOptions.forEach((option) => {
            option.addEventListener('click', (e) => {
                if (this.isAnswered) return;

                const selectedBird = e.target.dataset.bird;

                if (selectedBird === this.currentBird.name) {
                    e.target.classList.add('correct');
                    this.audioPlayer.playFeedbackSound("correct");
                    this.audioPlayer.playSpecificAudio(this.currentBird.audio);
                    this.isAnswered = true;

                    this.updateScore(1); 
                } else {
                    e.target.classList.add('incorrect');
                    this.audioPlayer.playFeedbackSound("incorrect");

                    const incorrectBird = categoryBird.find(
                        (bird) => bird.name === selectedBird
                    );
                    this.audioPlayer.playSpecificAudio(incorrectBird.audio);
                }
            });
        });
    }

    updateScore(points) {
        this.score += points; 
        this.uiUpdater.updateScore(this.score); 
    }
}





