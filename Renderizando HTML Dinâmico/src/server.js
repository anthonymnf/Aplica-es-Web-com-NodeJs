const express = require("express");
const path = require("node:path");

const app = express();

app.set("view engine", "ejs"); // Setando a variável view engine pra ejs
app.set("views", path.join(__dirname, "views")); //Setando q os nossos templates estão na pasta /views

app.get("/", (req, res) => {
  const title = "Homepage";
  const message = "Mensagem dinâmica inserida do server side";
  res.render("index", { title, message });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}/`)
);
