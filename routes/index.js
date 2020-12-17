const router = require('express').Router();
const quizController = require('../controllers/quizController');

//ホーム
router.get('/', quizController.getHome);
//クイズデータを取得するよう
router.get('/quiz', quizController.doFetchQuizData);

module.exports = router;
