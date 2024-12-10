import * as express from 'express';
import { TopicModel } from '../model/Topic';
import { BaseController } from './BaseController';

export class TopicController extends BaseController {
    private topicModel = new TopicModel();

    protected async executeImpl(req: express.Request, res: express.Response): Promise<void> {
        const { subject_id, title, video_url, description } = req.body;

        try {
            const newTopic = await this.topicModel.create({ subject_id, title, video_url, description});
            res.status(201).json(newTopic);
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

    public async findBySubjectId(req: express.Request, res: express.Response): Promise<void> {
        const { subject_id } = req.params;

        try {
            const topics = await this.topicModel.findBySubjectId(parseInt(subject_id));
            res.status(200).json(topics);
        } catch (error) {
            if (error instanceof Error) {
                this.fail(res, error.message);
            } else {
                this.fail(res, 'An unknown error occurred');
            }
        }
    }

}
