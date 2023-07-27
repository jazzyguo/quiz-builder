import { Transaction } from 'sequelize';
import { Quiz } from '../models';

export class QuizRepository {
    public static async create(
        quizData: Partial<Quiz>,
        transaction?: Transaction
    ): Promise<Quiz> {
        return await Quiz.create(quizData, { transaction });
    }

    public static async update(
        id: string,
        data: Partial<Quiz>,
        transaction?: Transaction
    ): Promise<number> {
        const [affectedCount]: [affectedCount: number] = await Quiz.update(
            data,
            {
                where: { id },
                transaction,
            }
        );

        if (affectedCount === 0) {
            throw new Error(`Quiz ${id} not found.`);
        }

        return affectedCount;
    }

    public static async delete(
        quizId: string,
        transaction?: Transaction
    ): Promise<void> {
        // all questions and answers are deleted with cascade in model
        await Quiz.destroy({ where: { id: quizId }, transaction });
    }

    public static async findById(id: string): Promise<Quiz | null> {
        return await Quiz.findOne({ where: { id } });
    }

    public static async findByIdAsOwner(id: string): Promise<Quiz | null> {
        return await Quiz.scope('owner').findOne({
            where: { id },
        });
    }

    public static async findByPermalink(
        permalinkId: string
    ): Promise<Quiz | null> {
        return await Quiz.scope('guest').findOne({
            where: { permalinkId },
        });
    }

    public static async isUserOwner(userId: string, quizId: string) {
        const quiz = await Quiz.findOne({
            where: {
                id: quizId,
                userId: userId,
            },
        });
        return !!quiz;
    }
}
