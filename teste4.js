const userRepository = require("./repositories/userRepository");

module.exports = async function (req, res) {
  const { id, name, job, admin } = req.query;

  if (!id) return res.status(400).json({ message: "Informe o ID do usuário" });
  if (!name && !job)
    return res
      .status(400)
      .json({ message: "Não há dados para serem alterados" });

  const user = await userRepository.getUserById(id);

  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  const updatedUser = {
    id: user.id,
    name: name ? name : user.name,
    job: job ? job : user.job,
    admin: admin ? admin : user.admin,
    lido: user.lido,
  };

  try {
    await userRepository.updateUser(updatedUser);
    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch {
    return res
      .status(500)
      .json({ message: "Não foi possível atualizar o usuário." });
  }
};
