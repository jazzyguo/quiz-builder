import { Transaction } from 'sequelize';
import {
    CreateAnswerDTO,
    CreateQuestionDTO,
    UpdateAnswerDTO,
    UpdateQuestionDTO,
} from '../controllers/QuizController';
import { QuestionType } from '../models';
import { AnswerRepository } from '../repositories';

export class QuestionService {
    public static getQuestionType(
        question: CreateQuestionDTO | UpdateQuestionDTO
    ): QuestionType {
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
        answers: CreateAnswerDTO[] | UpdateAnswerDTO[],
        transaction?: Transaction
    ): Promise<void> {
        for (const answerDTO of answers) {
            await AnswerRepository.create(
                {
                    text: answerDTO.text,
                    isCorrect: answerDTO.isCorrect,
                    questionId: questionId,
                },
                transaction,
            );
        }
    }
}
