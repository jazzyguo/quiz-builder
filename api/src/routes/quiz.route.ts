import express from 'express';
import { QuizController } from '../controllers/QuizController';
import { authMiddleware, userIsQuizOwnerMiddleware } from '../lib/middleware';


/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: API endpoints for quizzes - only accessible by authed users and owners
 */
export const quizRouter = express.Router();

quizRouter.use(authMiddleware);
quizRouter.use(userIsQuizOwnerMiddleware);

/**
 * @swagger
 * /quiz/all:
 *   get:
 *     summary: Get all quizzes, sorts by updatedAt DESC
 *     tags: [Quiz]
 *     parameters:
 *       - in: query
 *         name: isPublished
 *         schema:
 *           type: boolean
 *         description: Returns only the published quizzes
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QuizWithCorrect'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
quizRouter.get('/all', QuizController.getQuizzes);

/**
 * @swagger
 * /quiz/:quizId:
 *   get:
 *     summary: Get a quiz by ID, will return the correct answers
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the quiz to get
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuizWithCorrect'
 *       404:
 *         description: Quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
quizRouter.get('/:quizId', QuizController.getQuiz);

/**
 * @swagger
 * /quiz:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuizDTO'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuizWithCorrect'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
quizRouter.post('/', QuizController.createQuiz);

/**
 * @swagger
 * /quiz/{quizId}:
 *   patch:
 *     summary: Update an existing quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the quiz to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuizDTO'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuizWithCorrect'
 *       404:
 *         description: Quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
quizRouter.patch('/:quizId', QuizController.updateQuiz);

/**
 * @swagger
 * /quiz/{quizId}:
 *   delete:
 *     summary: Delete an existing quiz
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the quiz to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
quizRouter.delete('/:quizId', QuizController.deleteQuiz);

/**
 * @swagger
 * /quiz/publish/{quizId}:
 *   patch:
 *     summary: Publish a draft quiz to get the permalinkId
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the quiz to publish
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Quiz published successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuizWithCorrect'
 *       404:
 *         description: Quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
quizRouter.patch('/publish/:quizId', QuizController.publishQuiz);

/**
 * @swagger
 * components:
 *   schemas:
 *     QuizWithCorrect:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         isPublished:
 *           type: boolean
 *         permalinkId:
 *           type: string
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuestionWithCorrect'
 *     QuestionWithCorrect:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         text:
 *           type: string
 *         type:
 *           type: string
 *         quizId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         answers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AnswerWithCorrect'
 *     AnswerWithCorrect:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         text:
 *           type: string
 *         isCorrect:
 *           type: boolean
 *         questionId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
