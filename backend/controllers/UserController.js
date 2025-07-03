var User = require("../models/User");

class UserController {
    // Listar todos os usuários
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
  // Listar usuario por id
  async userByID(req, res) {
    const { id } = req.params;

    try {
      var user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      } else {
        return res.status(200).json(user);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário: ", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  // Criar usuário
  async create(req, res) {
    const { nome, foto, idade, rua, bairro, cidade, estado, biografia } = req.body;

    if (!nome || !idade || !rua || !bairro || !cidade || !estado || !biografia) {
      return res.status(400).json({ error: "Preencha os dados obrigatorios" });
    }

    try {
      const result = await User.newUser(nome, foto, idade, rua, bairro, cidade, estado, biografia);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }
  // Atualizar usuário
  async update(req, res) {
    const { id } = req.params;
    const { nome, foto, idade, rua, bairro, cidade, estado, biografia } = req.body;

    try {
      const result = await User.updateUser(id, nome, foto, idade, rua, bairro, cidade, estado, biografia);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao atualizar usuário: ", error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }
  // Deletar usuário
  async delete(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user || user.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      await User.deleteUser(id);
      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar usuário: ", error);
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
}

module.exports = new UserController();
