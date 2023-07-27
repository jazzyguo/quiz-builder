import { Transaction } from 'sequelize';
import { AnswerDTO, QuestionDTO } from '../controllers/QuizController';
import { QuestionType } from '../models';
import { AnswerRepository } from '../repositories';

export class QuestionService {
    public static getQuestionType(question: QuestionDTO): QuestionType {
        const { answers } = question;

        const answerCount = answers.filter((answer) => answer.isCorrect).length;

        if (answerCount < 1) {
            throw new Error('Question must have at least one answer');
        }

        const isSingleAnswer = answerCount === 1;

        return isSingleAnswer
            ? QuestionType.SingleAnswer
            : QuestionType.MultipleAnswers;
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
