const express = require("express");
const authRouter = require("./routes/auth");
const protectedRouter = require("./routes/protected");
const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/protected", protectedRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening in http://localhost:${PORT}`));
