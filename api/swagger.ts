import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

export const setupSwagger = (app: Application): void => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Quiz Builder API',
                version: '1.0.0',
                description: 'API documentation for the Quiz Builder app',
            },
            servers: [
                {
                    url: 'http://localhost:4000',
                    description: 'Development server',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        apis: ['src/routes/**/*.ts'],
    };

    const specs = swaggerJSDoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
