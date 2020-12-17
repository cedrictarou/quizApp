const Quiz = require('../models/Quiz');

module.exports = {
  getHome: (req, res) => {
    res.render('index.ejs');
  },
  doFetchQuizData: async (req, res, next) => {
    try {
      //Modelsからデータを取ってくる
      const result = await Quiz.fetchQuizData();
      //クイズデータをjsonでフロントへ返す
      res.status(200).send(JSON.stringify(result));
    } catch (error) {
      console.log(error.message);
    }
  },
};
