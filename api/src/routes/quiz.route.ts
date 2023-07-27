import express from 'express';
import { QuizController } from '../controllers/QuizController';
import { authMiddleware, userIsQuizOwnerMiddleware } from '../lib/middleware';

export const quizRouter = express.Router();

// only accessible by authed owners
quizRouter.use(authMiddleware);
quizRouter.use(userIsQuizOwnerMiddleware);

quizRouter.get('/:quizId', QuizController.getQuiz);
quizRouter.post('/', QuizController.createQuiz);
quizRouter.patch('/:quizId', QuizController.updateQuiz);
quizRouter.delete('/:quizId', QuizController.deleteQuiz);
