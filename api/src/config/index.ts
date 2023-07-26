import dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/../../.env` });

export const config = {
    PORT: process.env.PORT,
    PG_HOST: process.env.PG_HOST || 'quiz-builder-database',
    PG_USER: process.env.PG_USER || 'quizbuilder_user',
    PG_PASS: process.env.PG_PASSWORD || 'quizbuilder_password',
    PG_NAME: process.env.PG_NAME || 'quizbuilder',
};
