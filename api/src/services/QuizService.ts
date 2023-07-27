import { Transaction } from 'sequelize';
import {
    CreateQuizDTO,
    UpdateQuizDTO,
    CreateQuestionDTO,
    UpdateQuestionDTO,
} from '../controllers/QuizController';
import { Question, Quiz } from '../models';
import { QuizRepository, QuestionRepository } from '../repositories';
import { QuestionService } from './QuestionService';
import { sequelize } from '../sequelize';

/**
 * Transaction rollbacks on internal errors + when question is created without at least one correct answer
 */
export class QuizService {
    public static async createQuiz(
        userId: string,
        createQuizDTO: CreateQuizDTO
    ): Promise<Quiz> {
        const { title, isPublished, questions } = createQuizDTO;

        const transaction = await sequelize.transaction();

        try {
            const quiz: Quiz = await QuizRepository.create(
                {
                    title,
                    isPublished,
                    permalinkId: isPublished
                        ? this.generatePermalinkId()
                        : null,
                    userId,
                },
                transaction
            );

            await this.addQuestions(quiz.id, questions, transaction);

            await transaction.commit();
            
            const quizWithAssociations =
                await QuizRepository.findByIdWithAnswersIsCorrect(quiz.id);

            return quizWithAssociations;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Will update top level fields for Quiz, and recreate questions/answers
     */
    public static async updateQuiz(
        quizId: string,
        updateQuizDTO: UpdateQuizDTO
    ): Promise<Quiz> {
        const { questions } = updateQuizDTO;

        const quizToUpdate: Quiz | null = await QuizRepository.findById(quizId);

        if (!quizToUpdate) {
            throw new Error(`Quiz ${quizId} not found.`);
        }

        const transaction = await sequelize.transaction();

        try {
            await QuizRepository.update(quizId, updateQuizDTO, transaction);

            // remove all associated questions/answers
            await QuestionRepository.deleteByQuizId(quizId, transaction);

            // readd questions/answers
            await this.addQuestions(quizId, questions, transaction);

            await transaction.commit();

            const quizWithAssociations =
                await QuizRepository.findByIdWithAnswersIsCorrect(quizId);

            return quizWithAssociations;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    public static async addQuestions(
        quizId: string,
        questions: CreateQuestionDTO[] | UpdateQuestionDTO[],
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

            await QuestionService.addAnswers(
                question.id,
                questionDto.answers,
                transaction
            );
        }
    }

    public static async deleteQuiz(quizId: string): Promise<void> {
        const quizToDelete: Quiz | null = await QuizRepository.findById(quizId);

        if (!quizToDelete) {
            throw new Error(`Quiz ${quizId} not found.`);
        }

        const transaction = await sequelize.transaction();

        try {
            await QuizRepository.delete(quizId, transaction);
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    // isPublished field becomes true and permalinkId gets generated for the quiz
    public static async publishDraftQuiz(quizId: string): Promise<Quiz> {}

    // random digit alphanumeric string
    public static generatePermalinkId(): string {
        const length = 6;
        const chars =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }

        return result;
    }
}
