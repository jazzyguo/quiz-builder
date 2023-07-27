import { Transaction } from 'sequelize';
import { Question } from '../models';

export class QuestionRepository {
    public static async create(
        questionData: Partial<Question>,
        transaction?: Transaction
    ): Promise<Question> {
        return await Question.create(questionData, { transaction });
    }

    // removes all questions and answers associated to the quizId
    public static async deleteByQuizId(
        quizId: string,
        transaction?: Transaction
    ): Promise<void> {
        await Question.destroy({ where: { quizId }, transaction });
    }

    public static async findByQuizId(quizId): Promise<Question[]> {
        return await Question.findAll({ where: { quizId } });
    }
}
