import { Request, Response } from 'express';
import { QuizService } from '../services/QuizService';
import { Quiz, Question, Answer } from '../models';

export interface CreateQuizDTO {
    title: string;
    isPublished: boolean;
    questions: CreateQuestionDTO[];
}

export interface CreateQuestionDTO {
    text: string;
    answers: CreateAnswerDTO[];
}

export interface CreateAnswerDTO {
    text: string;
    isCorrect: boolean;
}

export interface UpdateQuizDTO extends Partial<Quiz> {}

export interface UpdateQuestionDTO extends Partial<Question> {}

export interface UpdateAnswerDTO extends Partial<Answer> {}

export class QuizController {
    public static async createQuiz(req: Request, res: Response) {
        const { userId } = req;
        const createQuizDTO: CreateQuizDTO = req.body;
        try {
            const quiz = await QuizService.createQuiz(userId, createQuizDTO);
            return res.status(201).json(quiz);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error creating quiz.' });
        }
    }

    public static async updateQuiz(req: Request, res: Response) {
        const updateQuizDTO: UpdateQuizDTO = req.body;
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
}
