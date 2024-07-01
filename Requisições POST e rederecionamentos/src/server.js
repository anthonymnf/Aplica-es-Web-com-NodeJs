const express = require("express");
const path = require("node:path");

const app = express();

const storedUsers = [];

// Configuração do EJS
app.set("view engine", "ejs"); // Setando a variável view engine pra ejs
app.set("views", path.join(__dirname, "views")); //Setando q os nossos templates estão na pasta /views

// Configuração do body da requisição POST
app.use(express.urlencoded({ extended: true })); //Com isso eu configurei pra aceitar o dado padrão do input do form

app.get("/", (req, res) => {
  const title = "Homepage";
  const message = "Mensagem dinâmica inserida do server side";
  res.render("index", { title, message });
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  storedUsers.push({ username, password });
  res.redirect("/usuarios");
});

app.get("/usuarios", (req, res) => {
  res.render("users", { users: storedUsers });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}/`)
);
