const userRepository = require("../repositories/userRepository");

async function validarUsuario(req, res, next) {
  // Em termos de segurança seria ideal a utilização de tokens e não apenas passar o ID pela rota
  const { userId } = req.params;
  const user = await userRepository.getUserById(userId);

  if (user) {
    if (!!user.admin === true) {
      next();
    } else return res.status(403).json({ message: "Sem permissão" });
  } else {
    res.status(500).json({ message: "Não foi possível validar sua permissão" });
  }
}

module.exports = { validarUsuario };
