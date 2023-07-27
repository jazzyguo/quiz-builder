import { QuestionDTO } from '../controllers/QuizController';
import { QuestionType } from '../models';

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
}
