export class AudioPlayer {
    constructor() {
        this.audio = null;
        this.updateInterval = null; 
    }

    toggleAudio(button, progressBar, timeDisplay) {
        if (this.audio && !this.audio.paused) {
            this.audio.pause();
            button.textContent = "▶️"; 
            clearInterval(this.updateInterval); 
        } else {
            this.playAudio(button, progressBar, timeDisplay);
        }
    }

    playAudio(button, progressBar, timeDisplay) {
        if (!this.audio) {
            this.audio = new Audio(button.dataset.audio);
            this.audio.addEventListener("loadedmetadata", () => {
                this.updateProgress(progressBar, timeDisplay); 
            });
        }

        this.audio.play();
        button.textContent = "❚❚"; 

        this.updateInterval = setInterval(() => {
            this.updateProgress(progressBar, timeDisplay);
        }, 500); 
    }

    updateProgress(progressBar, timeDisplay) {
        if (this.audio && this.audio.duration) {
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;

            const currentTime = this.formatTime(this.audio.currentTime);
            const duration = this.formatTime(this.audio.duration);
            timeDisplay.textContent = `${currentTime} / ${duration}`;
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${secs}`;
    }

    playSpecificAudio(audioPath) {
        if (this.audio) {
            this.audio.pause();
        }
        this.audio = new Audio(audioPath);
        this.audio.play();
    }

    playFeedbackSound(type) {
        const sounds = {
            correct: "./wrong-47985.mp3",
            incorrect: "./wrong-answer-129254.mp3",
        };

        const audio = new Audio(sounds[type]);
        audio.play();
    }
}









