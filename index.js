const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');
// const routes = require('./router/userRouter');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

console.log('aquiIndex');
app.post('/user', userController.createUsers);
// app.use(routes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
