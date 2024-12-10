import * as express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/User';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
    private userModel = new UserModel();

    protected async executeImpl(req: express.Request, res: express.Response): Promise<void> {
        const { name, email, password } = req.body;
        try {
            const newUser = await this.userModel.create({ name, email, password });
            res.status(201).json(newUser);
        } catch (error) {
            if (error instanceof Error) {
                this.fail(res, error.message);
            } else {
                this.fail(res, 'An unknown error occurred');
            }
        }
    }

    public async register(req: express.Request, res: express.Response): Promise<void> {
        await this.execute(req, res);
    }

    public async login(req: express.Request, res: express.Response): Promise<void> {
        const { email, password } = req.body;
        const secret = process.env.JWT_SECRET || '';
        
        try {
            const user = await this.userModel.findByEmail(email);
            if (!user || !(await this.userModel.verifyPassword(user.password, password))) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }
           
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                this.fail(res, error.message);
            } else {
                this.fail(res, 'An unknown error occurred');
            }
        }
    }
}
