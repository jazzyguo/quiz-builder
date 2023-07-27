import { Request, Response } from 'express';
import { QuizRepository } from '../repositories';

export class PermalinkController {
    public static async getQuiz(req: Request, res: Response) {
        const { permalinkId } = req.params;

        const quiz = await QuizRepository.findByPermalink(permalinkId);

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        return res.status(200).json(quiz);
    }
}
