import cors from 'cors';
import { json } from 'body-parser';
import express, { Application } from 'express';
import errorHandler from 'strong-error-handler';
import { quizRouter, permalinkRouter } from './routes';
import admin from 'firebase-admin';
import { setupSwagger } from '../swagger';

require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    ),
});

export const app: Application = express();

setupSwagger(app);

app.use(cors());
app.use(json());

app.use('/quiz', quizRouter);
app.use('/permalink', permalinkRouter);

app.use(
    errorHandler({
        debug: process.env.NODE_ENV === 'development',
        log: true,
    })
);
