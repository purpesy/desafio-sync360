var User = require("../models/User");

class UserController {
  async index(req, res) {
    try {
      var users = await User.findAll();
      if (!users || users.length === 0) {
        return res.status(404).json({ error: "Nenhum usuário encontrado" });
      } else {
        return res.status(200).json(users);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários: ", error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }
}

module.exports = new UserController();
