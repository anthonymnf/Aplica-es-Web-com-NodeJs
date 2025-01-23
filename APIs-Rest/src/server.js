const express = require("express");
const gamesControllers = require("./controllers/games-controllers");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.get("/games", gamesControllers.index);
app.get("/games/:id", gamesControllers.show);
app.post("/games", gamesControllers.save);
app.post("/games/:id/genres", gamesControllers.addGenre);
router.put("/games/:id", gamesController.update);
router.delete("/games/:id", gamesController.delete);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor iniciado em http://localhost:${PORT}/`)
);
