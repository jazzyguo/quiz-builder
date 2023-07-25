import getConfig from 'next/config';
const { publicRuntimeConfig = {} } = getConfig() || {};

export const API_URL = publicRuntimeConfig.API_URL || 'http://127.0.0.1:4000/';

export const HOME_URL = '/quiz/published';

export const MAX_QUESTIONS = 10;

export const MAX_ANSWERS = 5;
