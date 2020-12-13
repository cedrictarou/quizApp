class Quiz {
  constructor(quizData) {
    this.quizzes = quizData;
  }
  arrangedQuizzes() {
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
}

module.exports = Quiz;
