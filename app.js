import { EventHandler } from "./src/components/EventHandler.js";
import { QuizManager } from "./src/components/QuizManager.js";

const quizManager = new QuizManager();
const eventHandler = new EventHandler(quizManager);
eventHandler.init();