// Repositório criado para agrupar as funções de acesso ao banco

var database = require("../fakeData");

/*
  Como a especificação diz para trazer apenas um usuário se pesquisando por nome,
  a função traz apenas o primeiro resultado. Pessoas com mesmo nome não aparecerão todas na busca individual.
  O ideal neste caso seria fazer também uma busca que trouxesse o array de usuários que fossem encontrados com aquele nome.
  Para isso poderia ser utilizada a função filter ao invés da find. Mas sua aplicação dependeria da necessidade da aplicação.

  Obs: A função abaixo permite pesquisar o usuário por parte do nome ao invés de apenas o nome completo. 
  Ela busca independente de acentos ou maiúsculas/minúsculas, graças a função auxiliar "normalizeName"
*/
async function getUserByName(nameSent) {
  const normalizedNameSent = normalizeName(nameSent);

  const user = database.find((user) =>
    normalizeName(user.name).includes(normalizedNameSent)
  );

  if (user) return user;
  else return false;
}

async function getUserById(id) {
  const user = database.find((user) => user.id === +id);

  if (user) return user;
  else return false;
}

async function getAllUsers() {
  return database;
}

async function createUser(user) {
  // Obtendo o último id criado - com um ODM/ORM não será necessário pois é atribuído na criação
  const lastIndex = database.length - 1;
  const lastIdCreated = +database[lastIndex].id;

  user = { id: lastIdCreated + 1, ...user };
  database.push(user);
}

async function updateUser(updatedUser) {
  const indexUser = database.findIndex((user) => user.id === +updatedUser.id);

  if (indexUser > -1) {
    database[indexUser] = updatedUser;

    return true;
  } else {
    return false;
  }
}

async function deleteUserById(id) {
  /*
    Solução aplicada para formato atual do banco, em objeto.
    Normalmente seria ideal aplicar um ODM como Mongoose
    ou um ORM como o Sequelize para fazer essa e outras transações no banco 
  */
  const indexUser = database.findIndex((user) => user.id === +id);

  database.splice(indexUser, 1);

  return true;
}

const normalizeName = (name) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

module.exports = {
  getUserByName,
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUserById,
};
