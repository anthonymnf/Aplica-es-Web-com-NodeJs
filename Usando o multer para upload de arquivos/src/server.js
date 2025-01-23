const express = require("express");
const uploadMulter = require("./middlewares/upload-multer");
const app = express();

app.use(express.static("public"));

app.post("/upload", uploadMulter.single("image"), (req, res) => {
  console.log(req.file);
  res.json({ message: "Arquivo enviado com sucesso" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor iniciado em <http://localhost>:${PORT}/`)
);
