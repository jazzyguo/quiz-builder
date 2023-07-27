API built on nodejs/express, sequelize with postgresql, docker

swagger set up at `/api-docs`

`docker-compose up` to run api dev server
`NPM_SCRIPT=test docker-compose up` to run tests

```
PG_NAME=quizbuilder
PG_USER=quizbuilder_user
PG_PASS=quizbuilder_password
PORT=4000
NPM_SCRIPT=dev
PG_HOST=quiz-builder-database
PG_TEST_HOST=quiz-builder-database-test

FIREBASE_SERVICE_ACCOUNT_KEY=''
```
