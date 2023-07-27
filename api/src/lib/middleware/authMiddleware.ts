import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// middleware to decode accessToken from firebase auth user and add user id to request
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const { uid } = await admin.auth().verifyIdToken(token);
        req.userId = uid;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
