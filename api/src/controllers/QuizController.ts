import { Request, Response } from 'express';
import { QuizService } from '../services/QuizService';
import { QuizRepository } from '../repositories';

export interface QuizDTO {
    title: string;
    isPublished: boolean;
    questions: QuestionDTO[];
}

export interface QuestionDTO {
    text: string;
    answers: AnswerDTO[];
}

export interface AnswerDTO {
    text: string;
    isCorrect: boolean;
}

export class QuizController {
    public static async createQuiz(req: Request, res: Response) {
        const { userId } = req;
        const createQuizDTO: QuizDTO = req.body;
        try {
            const quiz = await QuizService.createQuiz(userId, createQuizDTO);
            return res.status(201).json(quiz);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error creating quiz.' });
        }
    }

    public static async updateQuiz(req: Request, res: Response) {
        const updateQuizDTO: QuizDTO = req.body;
        const { quizId } = req.params;
        try {
            const quiz = await QuizService.updateQuiz(quizId, updateQuizDTO);
            return res.status(200).json(quiz);
        } catch (error) {
            console.error(error);
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'Error updating quiz.' });
            }
        }
    }

    public static async deleteQuiz(req: Request, res: Response) {
        const { quizId } = req.params;
        try {
            await QuizService.deleteQuiz(quizId);
            return res.send(`Quiz deleted`);
        } catch (error) {
            console.error(error);
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'Error deleting quiz.' });
            }
        }
    }

    public static async getQuiz(req: Request, res: Response) {
        try {
            const { quizId } = req.params;

            const quiz = await QuizRepository.findByIdWithAnswerIsCorrect(
                quizId
            );

            if (!quiz) {
                return res.status(404).json({ error: 'Quiz not found' });
            }

            return res.status(200).json(quiz);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching quiz.' });
        }
    }

    public static async getQuizzes(req: Request, res: Response) {
        try {
            const { userId } = req;
            const { isPublished } = req.query;

            const quizzes = await QuizRepository.findAllByUserId(userId, {
                ...(isPublished ? { isPublished: isPublished === 'true' } : {}),
            });

            return res.status(200).json(quizzes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching quizzes.' });
        }
    }

    public static async publishQuiz(req: Request, res: Response) {
        const { quizId } = req.params;
        try {
            const quiz = await QuizService.publishQuiz(quizId);
            return res.status(200).json(quiz);
        } catch (error) {
            console.error(error);
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'Error updating quiz.' });
            }
        }
    }
}
