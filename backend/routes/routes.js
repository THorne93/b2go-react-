const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const exercisesRouter = require('./exercises');
const questionsRouter = require('./questions');
const answersRouter = require('./answers');
const choicesRouter = require('./choices');
const mailsRouter = require('./mails');
const recordsRouter = require('./records');
const schoolsRouter = require('./schools');

router.use('/users', usersRouter);
router.use('/exercises', exercisesRouter);
router.use('/questions', questionsRouter);
router.use('/answers', answersRouter);
router.use('/choices', choicesRouter);
router.use('/mails', mailsRouter);
router.use('/records', recordsRouter);
router.use('/schools', schoolsRouter);


module.exports = router;
