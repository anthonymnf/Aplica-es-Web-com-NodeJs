const express = require("express");
const path = require("node:path");
const router = require("./router");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
// Muito importe q esse middleware seja antes do use router
app.use(
  session({
    secret: "palavra-chave-secreta",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use(router);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
);
