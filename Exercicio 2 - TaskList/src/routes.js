const express = require("express");
const taskListController = require("./controllers/taskListController");

const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/app", taskListController.index);
router.get("/app/nova-lista", (req, res) => res.render("create"));
router.post("/app/nova-lista", taskListController.createList);
router.post("/app/:id/excluir", taskListController.delete);
router.get("/app/:id", taskListController.showList);
router.post("/app/:id/nova-tarefa", taskListController.newTask);
router.post("/app/:id/completar/:idTask", taskListController.completedTask);
router.post("/app/:id/desfazer/:idTask", taskListController.undoTask);

module.exports = router;
