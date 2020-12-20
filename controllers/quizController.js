const Quiz = require('../models/Quiz');

module.exports = {
  getHome: (req, res) => {
    res.render('index.ejs');
  },
  doFetchQuizData: async (req, res, next) => {
    try {
      //Modelsからデータを取ってくる
      const quiz = new Quiz();
      const result = await quiz.arrangedQuizData();
      //クイズデータをjsonでフロントへ返す
      res.status(200).send(JSON.stringify(result));
    } catch (error) {
      next(error);
    }
  },
};
