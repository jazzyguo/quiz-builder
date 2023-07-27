import { sequelize } from '../../sequelize';
import { QuizDTO } from '../../controllers/QuizController';
import {
    GetQuizResultsDTO,
} from '../../controllers/PermaLinkController';
import { QuizService } from '../QuizService';
import {
    QuizRepository,
    QuestionRepository,
    AnswerRepository,
} from '../../repositories';

const userId = 'awesomeuser11';

describe('QuizService', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('createQuiz', () => {
        it('should successfully create a new quiz with a permalinkId if isPublished is true', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: true,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            };

            const quiz = await QuizService.createQuiz(userId, quizDTO);

            expect(quiz.title).toBe(quizDTO.title);
            expect(quiz.isPublished).toBe(quizDTO.isPublished);
            expect(quiz.permalinkId).toBeTruthy();
            expect(quiz.questions).toHaveLength(quizDTO.questions.length);
            expect(quiz.questions[0].text).toBe(quizDTO.questions[0].text);
            expect(quiz.questions[0].type).toBe('single-answer');
            expect(quiz.questions[0].answers).toHaveLength(
                quizDTO.questions[0].answers.length
            );
            expect(quiz.questions[0].answers[0].text).toBe(
                quizDTO.questions[0].answers[0].text
            );
            expect(quiz.questions[0].answers[0].isCorrect).toBe(
                quizDTO.questions[0].answers[0].isCorrect
            );
        });

        it('should successfully create a new quiz without a permalinkId if isPublished is false', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: false,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            };

            const quiz = await QuizService.createQuiz(userId, quizDTO);

            expect(quiz.title).toBe(quizDTO.title);
            expect(quiz.isPublished).toBe(quizDTO.isPublished);
            expect(quiz.permalinkId).toBeFalsy();
            expect(quiz.questions).toHaveLength(quizDTO.questions.length);
            expect(quiz.questions[0].text).toBe(quizDTO.questions[0].text);
            expect(quiz.questions[0].type).toBe('single-answer');
            expect(quiz.questions[0].answers).toHaveLength(
                quizDTO.questions[0].answers.length
            );
            expect(quiz.questions[0].answers[0].text).toBe(
                quizDTO.questions[0].answers[0].text
            );
            expect(quiz.questions[0].answers[0].isCorrect).toBe(
                quizDTO.questions[0].answers[0].isCorrect
            );
        });

        it('should create a quiz with the correct question types', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: false,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            };

            const quiz = await QuizService.createQuiz(userId, quizDTO);

            expect(quiz.questions[0].type).toBe('single-answer');
            expect(quiz.questions[1].type).toBe('multiple-answers');
        });

        it('should fail on creating a quiz with a question that has no correct answer', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: false,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: false,
                            },
                        ],
                    },
                ],
            };
            await expect(
                QuizService.createQuiz(userId, quizDTO)
            ).rejects.toThrowError();
        });
    });

    describe('updateQuiz', () => {
        it('should successfully update an existing quiz', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: false,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            };

            const quiz = await QuizService.createQuiz(userId, quizDTO);

            const updateQuizDTO: QuizDTO = {
                title: 'Updated Quiz',
                isPublished: true,
                questions: [
                    {
                        text: 'Updated 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                            {
                                text: 'Answer 2',
                                isCorrect: true,
                            },
                        ],
                    },
                    {
                        text: 'New Q',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            };

            const updatedQuiz = await QuizService.updateQuiz(
                quiz.id,
                updateQuizDTO
            );

            // check update has new title
            expect(updatedQuiz.title).toBe(updateQuizDTO.title);

            // check new perma link
            expect(updatedQuiz.permalinkId).toBeTruthy();

            // check new question added
            expect(updatedQuiz.questions).toHaveLength(
                updateQuizDTO.questions.length
            );

            // check updated question text
            expect(updatedQuiz.questions[0].text).toBe(
                updateQuizDTO.questions[0].text
            );

            // check updated question type
            expect(updatedQuiz.questions[0].type).toBe('multiple-answers');

            // check new question is correct
            expect(updatedQuiz.questions[1].text).toBe(
                updateQuizDTO.questions[1].text
            );
            expect(updatedQuiz.questions[1].type).toBe('single-answer');
            expect(updatedQuiz.questions[1].answers).toHaveLength(
                updateQuizDTO.questions[1].answers.length
            );
        });

        it('should fail on trying to update a quiz using a bad payload', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: false,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            };

            const quiz = await QuizService.createQuiz(userId, quizDTO);

            // @ts-ignore
            const updateQuizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: false,
            };

            await expect(
                QuizService.updateQuiz(quiz.id, updateQuizDTO)
            ).rejects.toThrowError();
        });

        it('should fail on trying to update a nonexisting quiz', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: false,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            };

            await expect(
                QuizService.updateQuiz('quizid', quizDTO)
            ).rejects.toThrowError();
        });
    });

    describe('deleteQuiz', () => {
        it('should successfully delete an existing quiz along with all associated questions and answers', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: false,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            };

            const quiz = await QuizService.createQuiz(userId, quizDTO);

            await QuizService.deleteQuiz(quiz.id);

            // check quiz is deleted
            const deletedQuiz = await QuizRepository.findById(quiz.id);
            expect(deletedQuiz).toBeNull();

            // check questions are deleted
            const deletedQuestions = await QuestionRepository.findByQuizId(
                quiz.id
            );
            expect(deletedQuestions).toHaveLength(0);

            // check answers deleted
            const deletedAnswers = await AnswerRepository.findByQuizId(quiz.id);
            expect(deletedAnswers).toHaveLength(0);
        });

        it('should fail on trying to delete a nonexisting quiz', async () => {
            await expect(
                QuizService.deleteQuiz('quizid')
            ).rejects.toThrowError();
        });
    });

    describe('publishQuiz', () => {
        it('should create a permalinkId and set isPublished to true', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: false,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                        ],
                    },
                ],
            };

            const quiz = await QuizService.createQuiz(userId, quizDTO);

            const publishedQuiz = await QuizService.publishQuiz(quiz.id);

            expect(publishedQuiz.isPublished).toBe(true);
            expect(publishedQuiz.permalinkId).toBeTruthy();
        });
    });

    describe('getQuizResults', () => {
        it('should correctly return the results of the quiz', async () => {
            const quizDTO: QuizDTO = {
                title: 'Test Quiz',
                isPublished: true,
                questions: [
                    {
                        text: 'Question 1',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                            {
                                text: 'Answer 2',
                                isCorrect: true,
                            },
                        ],
                    },
                    {
                        text: 'Question 2',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: false,
                            },
                            {
                                text: 'Answer 2',
                                isCorrect: false,
                            },
                            {
                                text: 'Answer 3',
                                isCorrect: true,
                            },
                        ],
                    },
                    {
                        text: 'Question 3',
                        answers: [
                            {
                                text: 'Answer 1',
                                isCorrect: true,
                            },
                            {
                                text: 'Answer 1',
                                isCorrect: false,
                            },
                        ],
                    },
                ],
            };

            const quiz = await QuizService.createQuiz(userId, quizDTO);

            // create dto using created quiz question ids and correct answer ids
            const getQuizResultsDTO: GetQuizResultsDTO = {
                answers: quiz.questions.map((question) => {
                    const selectedAnswerIds: string[] = question.answers
                        .filter((answer) => answer.isCorrect)
                        .map((answer) => answer.id);

                    return {
                        questionId: question.id,
                        selectedAnswerIds,
                    };
                }),
            };

            const quizResults = await QuizService.getQuizResults(
                quiz.permalinkId,
                getQuizResultsDTO
            );

            expect(quizResults.totalCorrect).toBe(3);
        });
    });
});
