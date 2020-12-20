const fetch = require('node-fetch');
const API_URL = 'https://opentdb.com/api.php?amount=10';

class Quiz {
  constructor() {
    this.quizzes = '';
  }
  async arrangedQuizData() {
    this.quizzes = await this.fetchQuizData();
    this.quizzes.forEach((quiz) => {
      const incorrectAnswers = quiz.incorrect_answers;
      const correctAnswer = quiz.correct_answer;
      const choices = [...incorrectAnswers, correctAnswer];
      const shuffledChoices = this.shuffle(choices);
      quiz.choices = shuffledChoices;
    });
    return this.quizzes;
  }
  shuffle([...array]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  async fetchQuizData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const quizData = data.results;
    return quizData;
  }
}
module.exports = Quiz;
