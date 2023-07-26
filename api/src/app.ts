import cors from 'cors';
import { json } from 'body-parser';
import express, { Application } from 'express';
import errorHandler from 'strong-error-handler';

export const app: Application = express();

app.use(cors());
app.use(json());

app.use(
    errorHandler({
        debug: process.env.NODE_ENV === 'development',
        log: true,
    })
);
