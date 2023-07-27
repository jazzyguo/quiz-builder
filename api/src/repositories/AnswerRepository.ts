import { Transaction } from 'sequelize';
import { Answer } from '../models';
import { QuestionRepository } from './QuestionRepository';

export class AnswerRepository {
    public static async create(
        answerData: Partial<Answer>,
        transaction?: Transaction
    ): Promise<Answer> {
        return await Answer.create(answerData, { transaction });
    }

    public static async findByQuizId(quizId): Promise<Answer[]> {
        // find all questions first
        const questions = await QuestionRepository.findByQuizId(quizId);
        const questionIds = questions.map((question) => question.id);
        return await Answer.findAll({ where: { questionId: questionIds } });
    }
}
