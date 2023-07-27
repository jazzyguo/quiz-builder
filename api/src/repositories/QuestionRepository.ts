import { Transaction } from 'sequelize';
import { Question } from '../models';
import { AnswerRepository } from '../repositories';
import { AnswerDTO } from '../controllers/QuizController';

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

    public static async addAnswers(
        questionId: string,
        answers: AnswerDTO[],
        transaction?: Transaction
    ): Promise<void> {
        for (const answerDTO of answers) {
            await AnswerRepository.create(
                {
                    text: answerDTO.text,
                    isCorrect: answerDTO.isCorrect,
                    questionId: questionId,
                },
                transaction
            );
        }
    }
}
