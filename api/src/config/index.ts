require('dotenv').config();

export const config = {
    development: {
        PORT: process.env.PORT,
        PG_HOST: process.env.PG_HOST || 'quiz-builder-database',
        PG_USER: process.env.PG_USER || 'quizbuilder_user',
        PG_PASS: process.env.PG_PASSWORD || 'quizbuilder_password',
        PG_NAME: process.env.PG_NAME || 'quizbuilder',
    },
    test: {
        PORT: process.env.PORT,
        PG_HOST: process.env.PG_TEST_HOST || 'quiz-builder-database-test',
        PG_USER: process.env.PG_USER || 'quizbuilder_user',
        PG_PASS: process.env.PG_PASSWORD || 'quizbuilder_password',
        PG_NAME: process.env.PG_NAME || 'quizbuilder',
    },
};
