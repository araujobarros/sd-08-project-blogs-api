const { User } = require('../models');

/* req 1
*Mockup de mensagens
*/
const usuario = {
  nomeMenor: { message: '"displayName" length must be at least 8 characters long', status: 400 },
  emailInvalido: { message: '"email" must be a valid email', status: 400 },
  emailRequerido: { message: '"email" is required', status: 400 },
  passwordMenor: { message: '"password" length must be 6 characters long', status: 400 },
  passwordRequerido: { message: '"password" is required', status: 400 },
  usurarioExistente: { message: 'User already registered', status: 409 },
  usurarioCadastrado: { message: 'Success returned Token', status: 201 },
};

/* req 3
* Feito no Middleware de autenticação
*/

/* req 4
*Mockup de mensagens
*/
const listaUsuario = {
  usuarioEncontrado: { message: 'List user', status: 200 },
  usuarioInexistente: { message: 'User does not exist', status: 404 },
};

const validEntrie = (myValue, object) => {
  if (myValue === undefined || myValue === null) return object;
  return true;
};

const emailTest = (myEmail) => {
  const { emailInvalido } = usuario;
  const emailvalidation = /[\w\d]+@+[\w\d]+.com/;
  if (!emailvalidation.test(myEmail)) return emailInvalido;
  return true;
};

const uniqueEmail = async (myEmail) => {
  const { usurarioExistente } = usuario;

  const user = await User.findOne({ where: { email: myEmail } });
  
  if (user) return usurarioExistente;
  return true;
};

const validateEmail = async (myEmail) => {
  const { emailRequerido } = usuario;
  if (validEntrie(myEmail, emailRequerido) !== true) return validEntrie(myEmail, emailRequerido);
  if (emailTest(myEmail) !== true) return emailTest(myEmail);
  if (await uniqueEmail(myEmail) !== true) return uniqueEmail(myEmail);
  return true;
};

const passwordTest = (myPassword) => {
  const { passwordMenor } = usuario;
  const passwordValidation = /^\d{6,}$/;
  if (!passwordValidation.test(myPassword)) return passwordMenor;
  return true;
};

const validatePassword = (myPassword) => {
  const { passwordRequerido } = usuario;
  if (validEntrie(myPassword, passwordRequerido) !== true) {
    return validEntrie(myPassword, passwordRequerido);
  }
  if (passwordTest(myPassword) !== true) return passwordTest(myPassword);
  return true;
};

const validName = (myName) => {
  const { nomeMenor } = usuario;
  
  if (myName && myName.length < 8) return nomeMenor;
  return true;
};

const create = ({ displayName, email, password }) => {
  console.log(displayName, email, password);
  if (validName(displayName) !== true) return validName(displayName);
  if (validatePassword(password) !== true) return validatePassword(password);
  if (validateEmail(email) !== true) return validateEmail(email);
  return true;
};

const getUser = async (id) => {
  const userById = await User.findByPk(id);
  const { usuarioInexistente } = listaUsuario;
  if (!userById) {
    return ({ result: usuarioInexistente });
  }
  return ({ userById });
};
/* req 12
[Será validado que é possível excluir meu usuário com sucesso]
[Será validado que não é possivel excluir meu usuário com token inválido]
[Será validado que não é possivel excluir meu usuário sem o token]
*/
const deleteSe = {
  postagemAtualizada: { message: 'User deleted', status: 204 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
};

module.exports = {
  create,
  getUser,
};