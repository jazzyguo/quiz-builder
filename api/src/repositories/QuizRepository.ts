import { Transaction } from 'sequelize';
import { Question, Quiz } from '../models';
import { QuestionDTO, QuizDTO } from '../controllers/QuizController';
import { QuestionRepository } from './QuestionRepository';
import { QuestionService } from '../services/QuestionService';

export class QuizRepository {
    public static async create(
        quizData: QuizDTO | Partial<Quiz>,
        transaction?: Transaction
    ): Promise<Quiz> {
        return await Quiz.create(quizData, { transaction });
    }

    public static async update(
        id: string,
        data: QuizDTO | Partial<Quiz>,
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

    // filter with isPublished and sort by updatedAt DESC
    public static async findAllByUserId(
        userId: string,
        where: Partial<Quiz>
    ): Promise<Quiz[]> {
        return await Quiz.findAll({
            where: {
                ...where,
                userId,
            },
            order: [['updatedAt', 'DESC']]
        });
    }

    public static async findByIdWithAnswerIsCorrect(
        id: string
    ): Promise<Quiz | null> {
        return await Quiz.scope('withAnswerIsCorrect').findOne({
            where: { id },
        });
    }

    public static async findByPermalinkWithoutAnswerIsCorrect(
        permalinkId: string
    ): Promise<Quiz | null> {
        return await Quiz.scope('withoutAnswerIsCorrect').findOne({
            where: { permalinkId },
        });
    }

    public static async findByPermalinkWithAnswerIsCorrect(
        permalinkId: string
    ): Promise<Quiz | null> {
        return await Quiz.scope('withAnswerIsCorrect').findOne({
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

    public static async addQuestionsWithAnswers(
        quizId: string,
        questions: QuestionDTO[],
        transaction?: Transaction
    ): Promise<void> {
        for (const questionDto of questions) {
            const question: Question = await QuestionRepository.create(
                {
                    text: questionDto.text,
                    type: QuestionService.getQuestionType(questionDto),
                    quizId: quizId,
                },
                transaction
            );

            await QuestionRepository.addAnswers(
                question.id,
                questionDto.answers,
                transaction
            );
        }
    }
}
