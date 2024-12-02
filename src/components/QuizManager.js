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

    checkAnswer(selectedBird) {
        if (selectedBird === this.currentBird.name) {
            this.isAnswered = true;
            this.updateScore(1);
            return true; // To'g'ri javob
        }
        return false; // Noto'g'ri javob
    }
    

    addBirdSelectionEvent(categoryBird) {
        const birdOptions = document.querySelectorAll('.bird-option');
        const birdDetails = document.getElementById('birdDetails');
        const mysteryBirdImage = document.getElementById('mysteryBirdImage');
        const mysteryBirdName = document.getElementById('mysteryBirdName');
        const mysteryAudioButton = document.getElementById('mysteryAudioButton');
        const mysteryProgress = document.getElementById('mysteryProgress');
        const mysteryTime = document.getElementById('mysteryTime');

        
        

        birdOptions.forEach((option) => {
            option.addEventListener('click', (e) => {
                if (this.isAnswered) return;

                const selectedBirdName = e.target.dataset.bird;
                const selectedBird = categoryBird.find((bird) => bird.name === selectedBirdName);

                if (selectedBird) {
                    birdDetails.innerHTML = `
                        <img src="${selectedBird.image}" alt="${selectedBird.name}" />
                        <h2 class="bird-name">${selectedBird.name}</h2>
                        <p class="bird-species">${selectedBird.species}</p>
                        <div class="audio-player">
                            <button class="play-btn" data-audio="${selectedBird.audio}" id="mysteryAudioButton" aria-label="Play">▶️</button>
                            <div class="progress-bar">
                                <div class="progress" id="mysteryProgress"></div>
                            </div>
                            <span class="time" id="mysteryTime">00:00 / 00:00</span>
                        </div>
                        <p class="bird-description">${selectedBird.description}</p>
                    `;

                    mysteryBirdImage.src = selectedBird.image;
                    mysteryBirdName.textContent = this.isAnswered
                        ? selectedBird.name
                        : "******";

                    mysteryAudioButton.dataset.audio = selectedBird.audio;
                    mysteryAudioButton.addEventListener('click', () => {
                        this.audioPlayer.toggleAudio(
                            mysteryAudioButton,
                            mysteryProgress,
                            mysteryTime
                        );
                    });
                }

                

                if (selectedBirdName === this.currentBird.name) {
                    e.target.classList.add('correct');
                    this.audioPlayer.playFeedbackSound("correct");
                    this.audioPlayer.playSpecificAudio(this.currentBird.audio);
                    mysteryBirdName.textContent = this.currentBird.name;
                    this.isAnswered = true;
                    this.updateScore(1);
                } else {
                    e.target.classList.add('incorrect');
                    this.audioPlayer.playFeedbackSound("incorrect");
                    const incorrectBird = categoryBird.find((bird) => bird.name === selectedBirdName);
                    this.audioPlayer.playSpecificAudio(incorrectBird.audio);
                }
            });
        });
    }

    updateScore(points) {
        this.score += points;
        this.uiUpdater.updateScore(this.score);
    }

    nextQuestion() {
        this.currentCategory += 1;

        if (this.currentCategory < birdsData.length) {
            this.startQuiz();
        } else {
            this.showResults();
        }
    }

   
    

    showResults() {
        const resultsPage = document.getElementById('resultsPage');
        const quizPage = document.getElementById('quizPage');
        const finalScore = document.getElementById('finalScore');
        const congratulations = document.getElementById('congratulations');

        quizPage.classList.remove('active');
        resultsPage.classList.add('active');

        finalScore.textContent = this.score;

        if (this.score >= 20) {
            congratulations.textContent = "Excellent job! You're a bird expert! 🐦🎉";
        } else if (this.score >= 10) {
            congratulations.textContent = "Good job! Keep learning about birds! 🐥";
        } else {
            congratulations.textContent = "Better luck next time! Keep practicing. 🌱";
        }
    }
}
















     

