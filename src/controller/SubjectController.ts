import * as express from 'express';
import { SubjectModel } from '../model/Subject';
import { BaseController } from './BaseController';

export class SubjectController extends BaseController {
    private subjectModel = new SubjectModel();

    protected async executeImpl(req: express.Request, res: express.Response): Promise<void> {
        const { title } = req.body;

        try {
            const newSubject = await this.subjectModel.create({ title });
            res.status(201).json(newSubject);
        } catch (error) {
            if (error instanceof Error) {
                this.fail(res, error.message);
            } else {
                this.fail(res, 'An unknown error occurred');
            }
        }
    }

    public async create(req: express.Request, res: express.Response): Promise<void> {
        await this.execute(req, res);
    }

    public async findAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const subjects = await this.subjectModel.findAll();
            res.status(200).json(subjects);
        } catch (error) {
            if (error instanceof Error) {
                this.fail(res, error.message);
            } else {
                this.fail(res, 'An unknown error occurred');
            }
        }
    }
}
