const express = require('express');
const app = express();
const indexRouter = require('./routes/index.js');

app.set('view engine', 'ejs');
app.disabled('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

//ホームへのルーティング
app.use('/', indexRouter);

// エラーハンドリング
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});

app.listen(3000);
