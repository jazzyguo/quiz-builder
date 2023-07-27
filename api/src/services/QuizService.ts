import { QuizDTO } from '../controllers/QuizController';
import {
    GetQuizResultsDTO,
    QuizResults,
} from '../controllers/PermaLinkController';
import { Quiz } from '../models';
import { QuizRepository, QuestionRepository } from '../repositories';
import { sequelize } from '../sequelize';

/**
 * Transaction rollbacks on internal errors + when question is created without at least one correct answer
 */
export class QuizService {
    public static async createQuiz(
        userId: string,
        createQuizDTO: QuizDTO
    ): Promise<Quiz> {
        const { title, isPublished, questions } = createQuizDTO;

        const transaction = await sequelize.transaction();

        try {
            const permalinkId = isPublished ? this.generatePermalinkId() : null;

            const quiz: Quiz = await QuizRepository.create(
                {
                    title,
                    isPublished,
                    permalinkId,
                    userId,
                },
                transaction
            );

            await QuizRepository.addQuestionsWithAnswers(
                quiz.id,
                questions,
                transaction
            );

            await transaction.commit();

            const quizWithAssociations =
                await QuizRepository.findByIdWithAnswerIsCorrect(quiz.id);

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
        updateQuizDTO: QuizDTO
    ): Promise<Quiz> {
        const { questions, isPublished } = updateQuizDTO;

        const quizToUpdate: Quiz | null = await QuizRepository.findById(quizId);

        if (!quizToUpdate) {
            throw new Error(`Quiz ${quizId} not found.`);
        }

        const transaction = await sequelize.transaction();

        const permalinkId = isPublished ? this.generatePermalinkId() : null;

        try {
            await QuizRepository.update(
                quizId,
                {
                    ...updateQuizDTO,
                    permalinkId,
                },
                transaction
            );

            // remove all associated questions/answers
            await QuestionRepository.deleteByQuizId(quizId, transaction);

            // readd questions/answers
            await QuizRepository.addQuestionsWithAnswers(
                quizId,
                questions,
                transaction
            );

            await transaction.commit();

            const quizWithAssociations =
                await QuizRepository.findByIdWithAnswerIsCorrect(quizId);

            return quizWithAssociations;
        } catch (error) {
            await transaction.rollback();
            throw error;
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
    // avoids just passing isPublished=true to updateQuiz since it rewrites the quiz
    public static async publishQuiz(quizId: string): Promise<Quiz> {
        const quizToUpdate: Quiz | null = await QuizRepository.findById(quizId);

        if (!quizToUpdate) {
            throw new Error(`Quiz ${quizId} not found.`);
        }

        const transaction = await sequelize.transaction();

        try {
            await QuizRepository.update(
                quizId,
                {
                    ...quizToUpdate,
                    isPublished: true,
                    permalinkId: this.generatePermalinkId(),
                },
                transaction
            );

            await transaction.commit();

            const publishedQuiz = await QuizRepository.findById(quizId);

            return publishedQuiz;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

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

    public static async getQuizResults(
        permalinkId: string,
        getQuizResultsDto: GetQuizResultsDTO
    ): Promise<QuizResults> {
        const quiz = await QuizRepository.findByPermalinkWithAnswerIsCorrect(
            permalinkId
        );

        if (!quiz) {
            throw new Error(`Quiz ${permalinkId} not found.`);
        }

        const { answers = [] } = getQuizResultsDto;

        const { totalCorrect, questions }: QuizResults = answers.reduce(
            (acc, answer) => {
                // get the question with the correct answers
                const question = quiz.questions.find(
                    (q) => q.id === answer.questionId
                );

                if (question) {
                    const correctAnswerIds = question.answers
                        .filter((a) => a.isCorrect)
                        .map((a) => a.id);

                    const isCorrect =
                        correctAnswerIds.length ===
                            answer.selectedAnswerIds.length &&
                        correctAnswerIds.every((id) =>
                            answer.selectedAnswerIds.includes(id)
                        );

                    if (isCorrect) {
                        acc.totalCorrect++;
                    }

                    acc.questions.push({
                        ...question,
                        correctAnswerIds,
                        selectedAnswerIds: answer.selectedAnswerIds,
                    });
                }

                return acc;
            },
            {
                totalCorrect: 0,
                questions: [],
            }
        );

        return {
            totalCorrect,
            questions,
        };
    }
}
