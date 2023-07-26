import { Sequelize } from 'sequelize-typescript';
import { config } from './config';

import { Answer, Question, Quiz } from './models';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: config.PG_NAME,
    host: config.PG_HOST,
    username: config.PG_USER,
    password: config.PG_PASS,
    storage: ':memory:',
    models: [Answer, Question, Quiz],
});
