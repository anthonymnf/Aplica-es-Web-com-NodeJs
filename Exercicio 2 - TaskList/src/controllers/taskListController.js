const taskListModel = require("../models/taskListModel");

const taskListController = {
  //GET /app
  index: (req, res) => {
    const taskLists = taskListModel.showAllLists();
    res.render("app", { taskLists });
  },
  // POST /app/nova-lista
  createList: (req, res) => {
    const { title } = req.body;
    taskListModel.createList(title);
    res.redirect("/app");
  },
  // POST /app/:id/excluir
  delete: (req, res) => {
    const id = req.params.id;
    taskListModel.deleteList(id);
    res.redirect("/app");
  },
  //GET /app/:id
  showList: (req, res) => {
    const id = req.params.id;
    const taskList = taskListModel.showListById(id);
    res.render("show", { taskList });
  },
  // POST /app/:id/nova-tarefa
  newTask: (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    taskListModel.addTask(id, title);
    res.redirect(`/app/${id}`);
  },
  // POST /app/:id/completar/:idTask
  completedTask: (req, res) => {
    const { id, idTask } = req.params;
    taskListModel.finishTask(id, idTask);
    res.redirect(`/app/${id}`);
  },
  // POST /app/:id/desfazer/:idTask
  undoTask: (req, res) => {
    const { id, idTask } = req.params;
    taskListModel.undoTask(id, idTask);
    res.redirect(`/app/${id}`);
  },
};

module.exports = taskListController;
