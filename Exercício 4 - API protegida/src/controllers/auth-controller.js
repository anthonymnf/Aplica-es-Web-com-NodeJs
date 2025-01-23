const jwt = require("jsonwebtoken");
const users = require("../models/users");

const secretKey = "my-secret-key";

const authController = {
  register: (req, res) => {
    const { username, email, password } = req.body;

    // Verificar se todos os campos foram preenchidos
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verificar formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Verificar se o e-mail já existe
    const emailIsAlreadyExists = users.find((user) => user.email === email);
    if (emailIsAlreadyExists) {
      return res.status(400).json({ message: "E-mail already exists" });
    }

    // Verificar força da senha (exemplo: ao menos 8 caracteres, 1 número, 1 letra maiúscula)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, include one uppercase letter and one number",
      });
    }

    // Criar novo usuário
    const newUser = {
      username,
      email,
      password,
      role: "standard",
    };
    users.push(newUser);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  },

  login: (req, res) => {
    const { username, email, password } = req.body;

    // Verificar se todos os campos foram preenchidos
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verificar credenciais
    const user = users.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.email === email
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Gerar token JWT
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Login successful",
      token: token,
    });
  },
  home: (req, res) => {
    const username = req.authenticatedUser.username;
    if (!username) {
      return res.json({ message: "Welcome visitor" });
    }
    res.status(200).json({ message: `Welcome ${username}` });
  },
};

module.exports = authController;
