const jwt = require("jsonwebtoken");
const users = require("../models/users");

const secretKey = "my-secret-key";

const adminController = {
  addAdmin: (req, res) => {
    const { email } = req.body;
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Usuário não encontrado
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "User already an admin" }); // Usuário já é um admin
    }

    user.role = "admin";
    res.status(200).json({ message: "Admin added successfully", user: user });
  },

  readAllUsers: (req, res) => {
    res.status(200).json({ users: users });
  },

  deleteUser: (req, res) => {
    const { email } = req.body;
    const user = users.findIndex((user) => user.email === email); // Busca o usuário pelo e-mail

    if (user === -1) {
      return res.status(404).json({ message: "User not found" }); // Usuário não encontrado
    }

    users.splice(user, 1); // Remove o usuário da lista
    res.status(200).json({ message: "User deleted successfully" });
  },
};

module.exports = adminController;
