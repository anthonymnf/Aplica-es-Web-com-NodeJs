const users = require("../models/users");
const jwt = require("jsonwebtoken");

const secretKey = "my-secret-key";

const authController = {
  register: (req, res) => {
    const { username, password } = req.body;
    const newUser = { username, password };
    users.push(newUser);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = { username: "Matheus" };
    const token = jwt.sign(payload, secretKey, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "Login successful",
      token: token,
    });
  },
};

module.exports = authController;
