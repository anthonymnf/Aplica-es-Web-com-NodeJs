const express = require("express");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
