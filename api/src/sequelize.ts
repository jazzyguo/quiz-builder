import { Sequelize } from 'sequelize-typescript';
import { config } from './config';

import { Answer, Question, Quiz } from './models';

const envConfig = config[process.env.NODE_ENV || 'development'];

export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: envConfig.PG_NAME,
    host: envConfig.PG_HOST,
    username: envConfig.PG_USER,
    password: envConfig.PG_PASS,
    storage: ':memory:',
    models: [Answer, Question, Quiz],
});
