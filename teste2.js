const userRepository = require("./repositories/userRepository");

module.exports = async function (req, res) {
  const name = req.body.name;
  const job = req.body.job;
  const admin = req.body.admin ? true : false;

  if (name.length == 0 || job.length == 0)
    return res
      .status(400)
      .json({ message: "Todos os campos devem ser informados!" });

  const newUser = {
    name: name,
    job: job,
    admin: admin,
    lido: 0,
  };

  try {
    await userRepository.createUser(newUser);
    return res.status(201).json(newUser);
  } catch {
    return res.status(500).json({ message: "Não foi possível criar usuário" });
  }
};
