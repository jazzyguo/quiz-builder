import express from 'express';
import { PermalinkController } from '../controllers/PermaLinkController';

export const permalinkRouter = express.Router();

// anyone can access
permalinkRouter.get('/:permalinkId', PermalinkController.getQuiz);
