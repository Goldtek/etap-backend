import * as express from 'express';

export abstract class BaseController {
    protected abstract executeImpl(req: express.Request, res: express.Response): Promise<void | any>;

    public async execute(req: express.Request, res: express.Response): Promise<void> {
        try {
            await this.executeImpl(req, res);
        } catch (err) {
            console.error(`[BaseController]: Uncaught controller error`, err);
            this.fail(res, 'An unexpected error occurred');
        }
    }

    protected fail(res: express.Response, error: string) {
        return res.status(500).json({ message: error });
    }
}
