import { Request, Response } from 'express';
import { QuizRepository } from '../repositories';
import { QuizService } from '../services/QuizService';

type SelectedAnswerIds = string[];

export interface GetQuizResultsDTO {
    [questionId: string]: SelectedAnswerIds;
}

export interface QuizResults {
    totalCorrect: number;
    questions: {
        id: string;
        correctAnswerIds: string[];
        selectedAnswerIds: string[];
    }[];
}

export class PermalinkController {
    public static async getQuiz(req: Request, res: Response) {
        try {
            const { permalinkId } = req.params;

            const quiz =
                await QuizRepository.findByPermalinkWithoutAnswerIsCorrect(
                    permalinkId
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

    public static async getQuizResults(req: Request, res: Response) {
        const { permalinkId } = req.params;
        const getQuizResultsDto: GetQuizResultsDTO = req.body;

        try {
            const quizResults = await QuizService.getQuizResults(
                permalinkId,
                getQuizResultsDto
            );

            return res.status(200).json(quizResults);
        } catch (error) {
            console.error(error);
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            } else {
                return res
                    .status(500)
                    .json({ error: 'Error getting quiz results.' });
            }
        }
    }
}
