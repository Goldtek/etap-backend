    import { Router } from "express";

    import authMiddleware from './middleware/authMiddleware';
    import { UserController } from './controller/UserController';
    import { SubjectController } from './controller/SubjectController';
    import { TopicController } from './controller/TopicController';
    import { ProgressController } from './controller/ProgressController';



    const router: Router = Router();
    const userController = new UserController();
    const subjectController = new SubjectController();
    const topicController = new TopicController();
    const progressController = new ProgressController();

    // SignUp endpoint
    router.post('/user/register', (req, res) => userController.register(req, res));

    // Login endpoint
    router.post('/login', (req, res) => userController.login(req, res));

    // create a subject endpoint
    router.post('/create/subject', (req, res) => subjectController.create(req, res));

    // get all subjects
    router.get('/subjects', (req, res) => subjectController.findAll(req, res));

    // create topic endpoint
    router.post('/create/topic', (req, res) => topicController.create(req, res));

    // find subject by id
    router.get('/subject/:subject_id', (req, res) => topicController.findBySubjectId(req, res));

    // Track learning progress
    router.post('/track', (req, res) => progressController.trackProgress(req, res));

    // Get user progress by user ID 
    router.get('/:userId', (req, res) => progressController.getUserProgress(req, res));

    // Get rankings of users based on completion rates
    router.get('/ranking', (req, res) => progressController.getRanking(req, res));


    export const Routes: Router = router;
