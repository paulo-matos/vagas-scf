const userRepository = require("./repositories/userRepository");

module.exports = async function (req, res) {
  const name = req.query.name;

  if (name.length < 3)
    return res.status(400).json({
      message: "Informe ao menos 3 caracteres",
    });

  // Informações sobre esse método no arquivo repositories/userRepository.js
  let user = await userRepository.getUserByName(name);
  if (user) {
    res
      .status(200)
      .json({ message: `Usuário ${user.name} foi lido ${user.lido} vezes.` });
  } else {
    res.status(404).json({ message: "Usuário não encontrado." });
  }
};
