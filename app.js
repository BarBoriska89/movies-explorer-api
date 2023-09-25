require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { DB, PORT } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');
const corsMW = require('./middlewares/cors');

const router = require('./routes/index');

const { errorsMV } = require('./middlewares/errors');

const app = express();

app.use(helmet());

mongoose.connect(DB, { family: 4 });
app.use(bodyParser.json());

app.use(requestLogger);

app.use(limiter);

app.use(corsMW);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsMV);

app.listen(PORT, () => {
  console.log('Сервер запущен на 3000!');
});
