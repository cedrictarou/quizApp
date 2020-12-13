const fetch = require('node-fetch');
const API_URL = 'https://opentdb.com/api.php?amount=10';
const Quiz = require('../lib/quizData');

const fetchQuizData = async (req, res, next) => {
  //json形式でリクエストがあったら
  if (req.query.format === 'json') {
    const response = await fetch(API_URL);
    const data = await response.json();
    const quizData = data.results;

    //Quizクラスで処理する
    const quiz = new Quiz(quizData);
    //クイズデータをjsonでフロントへ返す
    res.send(JSON.stringify(quiz.arrangedQuizzes()));
  } else {
    res.render('index.ejs');
  }
};

module.exports = {
  fetchQuizData,
};
