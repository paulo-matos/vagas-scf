const userRepository = require("./repositories/userRepository");

module.exports = async function (req, res) {
  const name = req.query.name;

  /*
    Deletar usuários por NOME é extremamente contra-indicado, pois há pessoas com mesmo nome.
    O correto seria o uso de ID para fazer a remoção da entrada do banco.
  */

  // Adicionada limitação de caracteres para evitar deletar outros usuários, visto que busca pelo nome.
  if (name.length < 3)
    return res.status(400).json({
      message: "O nome do usuário deve conter pelo menos 3 caracteres",
    });

  const user = await userRepository.getUserByName(name);

  if (user) {
    try {
      await userRepository.deleteUserById(user.id);
      return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch {
      return res.status(500).json({ message: "Erro ao excluir registro" });
    }
  } else {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }
};
