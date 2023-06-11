const userRepository = require("./repositories/userRepository");

const getUser = async (req, res, next) => {
  const name = req.query.name;

  /* 
    Caso a busca não tenha uma limitação de caracteres, é possível buscar apenas por " ", o que encontraria resultado em todos os nomes.
    Uma busca com poucos caracteres também poderia pesar nas queries do banco, por isso foi criada essa limitação.
  */
  if (name.length < 3)
    return res.status(400).json({
      message: "A busca de usuários deve conter pelo menos 3 caracteres",
    });

  // Informações sobre esse método no arquivo repositories/userRepository.js
  let user = await userRepository.getUserByName(name);

  if (user) {
    // Atualização teste5
    user.lido++;
    try {
      await userRepository.updateUser(user);
    } catch {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }

    return res
      .status(200)
      .json({ id: user.id, name: user.name, job: user.job });
  } else {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }
};

const getUsers = async (req, res, next) => {
  const users = await userRepository.getAllUsers();

  if (users.length > 0) {
    return res.status(200).json(users);
  } else {
    return res.status(404).json({ message: "Sem usuários encontrados" });
  }
};

module.exports = {
  getUser,
  getUsers,
};
