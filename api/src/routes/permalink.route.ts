import express from 'express';
import { PermalinkController } from '../controllers/PermaLinkController';

/**
 * @swagger
 * tags:
 *   name: Permalink
 *   description: API endpoints for accessing quizzes by permalink
 */
export const permalinkRouter = express.Router();

/**
 * @swagger
 * /permalink/{permalinkId}:
 *   get:
 *     summary: Get a quiz by permalink ID, will not return the correct answers
 *     tags: [Permalink]
 *     parameters:
 *       - in: path
 *         name: permalinkId
 *         schema:
 *           type: string
 *         required: true
 *         description: Permalink ID of the quiz to get
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuizWithoutCorrect'
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
permalinkRouter.get('/:permalinkId', PermalinkController.getQuiz);

/**
 * @swagger
 * /permalink/{permalinkId}:
 *   post:
 *     summary: Get quiz results by permalink ID
 *     tags: [Permalink]
 *     parameters:
 *       - in: path
 *         name: permalinkId
 *         schema:
 *           type: string
 *         required: true
 *         description: Permalink ID of the quiz to get results for
 *     requestBody:
 *       description: Quiz results data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetQuizResultsDTO'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuizResults'
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
permalinkRouter.post('/:permalinkId', PermalinkController.getQuizResults);

/**
 * @swagger
 * components:
 *   schemas:
 *     QuizWithoutCorrect:
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
 *             $ref: '#/components/schemas/QuestionWithoutCorrect'
 *     QuestionWithoutCorrect:
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
 *             $ref: '#/components/schemas/AnswerWithoutCorrect'
 *     AnswerWithoutCorrect:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         text:
 *           type: string
 *         questionId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GetQuizResultsDTO:
 *       type: object
 *       properties:
 *         answers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *               selectedAnswerIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - questionId
 *               - selectedAnswerIds
 *       required:
 *         - answers
 *
 *     QuizResults:
 *       type: object
 *       properties:
 *         totalCorrect:
 *           type: number
 *         questions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               correctAnswerIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               selectedAnswerIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - id
 *               - correctAnswerIds
 *               - selectedAnswerIds
 */
