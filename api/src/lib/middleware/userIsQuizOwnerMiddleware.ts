import { Request, Response, NextFunction } from 'express';
import { QuizRepository } from '../../repositories';

/**
 * Only quiz owners can delete or update their own quiz
 * Also only owners can access the isCorrect answer scope
 */
export const userIsQuizOwnerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req;
    const { quizId } = req.params;

    const isUserAuthorized = QuizRepository.isUserOwner(userId, quizId);

    if (!isUserAuthorized) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    next();
};
