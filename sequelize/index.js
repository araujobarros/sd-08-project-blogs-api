const express = require('express');
const bodyParser = require('body-parser');

const userControllers = require('./controllers/userControllers');
const { ErrorMiddleware } = require('./middlewares/ErrorMiddleware');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('/user', userControllers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(ErrorMiddleware);
