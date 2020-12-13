(() => {
  const QUIZ_URL = '/?format=json';
  const quizNumElement = document.getElementById('questionNum');
  const questionElement = document.getElementById('question');
  const btnElement = document.getElementById('btn');
  const categoryElement = document.getElementById('category');
  const difficultyElement = document.getElementById('difficulty');
  const choicesContainer = document.getElementById('choices-container');

  const gameState = {
    quizzes: [],
    quizIndex: 0,
    correctNum: 0,
  };

  btnElement.addEventListener('click', () => {
    questionElement.textContent = 'loading';
    btnElement.hidden = true;
    fetchQuizData();
  });

  //fetchでクイズデータを取得する処理
  const fetchQuizData = async () => {
    try {
      const response = await fetch(QUIZ_URL);
      gameState.quizzes = await response.json();
      //クイズを用意する
      displayQuiz();
    } catch (error) {
      alert(`読み込み失敗... (${error.message})`);
    }
  };
  const displayQuiz = () => {
    const quizNum = gameState.quizIndex;
    const question = gameState.quizzes[gameState.quizIndex].question;
    const category = gameState.quizzes[gameState.quizIndex].category;
    const difficulty = gameState.quizzes[gameState.quizIndex].difficulty;
    const choices = gameState.quizzes[gameState.quizIndex].choices;

    quizNumElement.textContent = `問題${quizNum + 1}`;
    questionElement.textContent = unescapeHTML(question);
    categoryElement.textContent = `カテゴリー：${unescapeHTML(category)}`;
    difficultyElement.textContent = `難しさ：${unescapeHTML(difficulty)}`;

    //選択肢を準備する
    createChoices(choices);
  };
  const createChoices = (choices) => {
    const correctAnser = gameState.quizzes[gameState.quizIndex].correct_answer;

    choices.forEach((choice) => {
      const liElement = document.createElement('li');
      liElement.innerHTML = `<button class="btn">${choice}</button>`;
      choicesContainer.appendChild(liElement);
      liElement.addEventListener('click', (event) => {
        //正誤判定の処理
        if (event.target.textContent === unescapeHTML(correctAnser)) {
          gameState.correctNum += 1;
        }
        setNextQuiz();
      });
    });
  };
  const setNextQuiz = () => {
    removeChoices();
    gameState.quizIndex += 1;
    if (gameState.quizIndex < gameState.quizzes.length) {
      displayQuiz();
    } else {
      showResult();
    }
  };
  const removeChoices = () => {
    while (choicesContainer.firstChild) {
      choicesContainer.removeChild(choicesContainer.firstChild);
    }
  };
  const showResult = () => {
    quizNumElement.textContent = `あなたの正解数は… ${gameState.correctNum} / ${gameState.quizzes.length}`;
    questionElement.textContent = '再度挑戦するにはボタンを押してください。';
    categoryElement.textContent = '';
    difficultyElement.textContent = '';
    restart();
  };
  const restart = () => {
    btnElement.textContent = 'もう一度やる';
    btnElement.hidden = false;
    gameState.quizIndex = 0;
  };
  const unescapeHTML = (str) => {
    const div = document.createElement('div');
    div.innerHTML = str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/ /g, '&nbsp;')
      .replace(/\r/g, '&#13;')
      .replace(/\n/g, '&#10;');

    return div.textContent || div.innerText;
  };
})();
