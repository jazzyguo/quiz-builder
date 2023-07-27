import express from 'express';
import { QuizController } from '../controllers/QuizController';
import { authMiddleware } from '../lib/authMiddleware';

export const quizRouter = express.Router();

quizRouter.use(authMiddleware);

quizRouter.post('/quiz', QuizController.createQuiz);
quizRouter.patch('/quiz/:quizId', QuizController.updateQuiz);
quizRouter.delete('/quiz/:quizId', QuizController.deleteQuiz);
