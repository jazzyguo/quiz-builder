import { Transaction } from 'sequelize';
import { Answer } from '../models';

export class AnswerRepository {
    public static async create(
        answerData: Partial<Answer>,
        transaction?: Transaction
    ): Promise<Answer> {
        return await Answer.create(answerData, { transaction });
    }
}
