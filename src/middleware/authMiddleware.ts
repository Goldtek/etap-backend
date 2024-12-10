import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: string | object; 
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
