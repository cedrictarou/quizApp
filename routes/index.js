const router = require('express').Router();

const quizController = require('../controllers/quizController');

//ルート
router.get('/', quizController.fetchQuizData);

module.exports = router;
