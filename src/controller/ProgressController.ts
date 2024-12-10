import * as express from 'express';
import { ProgressModel } from '../model/Progress';
import { BaseController } from './BaseController';

export class ProgressController extends BaseController {
    private progressModel = new ProgressModel();

    protected executeImpl(req: express.Request, res: express.Response): Promise<void> {
        // You can define what this method should do, for example:
        return this.trackProgress(req, res);
    }

    public async trackProgress(req: express.Request, res: express.Response): Promise<void> {
        const { userId, topicId } = req.body;

        try {
            const progress = await this.progressModel.updateCompletion(userId, topicId);
            res.status(200).json(progress);
        } catch (error) {
            if (error instanceof Error) {
                this.fail(res, error.message);
            } else {
                this.fail(res, 'An unknown error occurred');
            }
        }
    }

    public async getUserProgress(req: express.Request, res: express.Response): Promise<void> {
        const userId = parseInt(req.params.userId);

        try {
            const progress = await this.progressModel.findByUserId(userId);
            res.status(200).json(progress);
        } catch (error) {
            if (error instanceof Error) {
                this.fail(res, error.message);
            } else {
                this.fail(res, 'An unknown error occurred');
            }
        }
    }

    public async getRanking(req: express.Request, res: express.Response): Promise<void> {
        try {
            const rankings = await this.progressModel.getRanking();
            res.status(200).json(rankings);
        } catch (error) {
            if (error instanceof Error) {
                this.fail(res, error.message);
            } else {
                this.fail(res, 'An unknown error occurred');
            }
        }
    }
}



