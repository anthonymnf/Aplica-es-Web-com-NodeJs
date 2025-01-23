/* let lists = [
  {id: //Id da lista de tarefas
  titleList: //Título da lista de tarefas
  tasks: [{ //Array de objetos das tasks
    idTask: //Id da task
    title: //Titulo da task
    finish: //Boleano que diz se a terefa foi finalizada ou não
  }]
}
] */

let lists = [
  {
    id: "1",
    titleList: "Lista de Compras",
    tasks: [
      {
        idTask: 1,
        title: "Comprar leite",
        finish: false,
      },
      {
        idTask: 2,
        title: "Comprar pão",
        finish: true,
      },
      {
        idTask: 3,
        title: "Comprar frutas",
        finish: false,
      },
    ],
  },
  {
    id: "2",
    titleList: "Tarefas Domésticas",
    tasks: [
      {
        idTask: "1",
        title: "Lavar a louça",
        finish: true,
      },
      {
        idTask: "2",
        title: "Limpar o quarto",
        finish: false,
      },
      {
        idTask: "3",
        title: "Varrer a sala",
        finish: true,
      },
    ],
  },
  {
    id: "3",
    titleList: "Trabalho",
    tasks: [
      {
        idTask: "1",
        title: "Enviar relatório",
        finish: false,
      },
      {
        idTask: "2",
        title: "Reunião com a equipe",
        finish: true,
      },
      {
        idTask: "3",
        title: "Revisar projeto",
        finish: false,
      },
    ],
  },
  {
    id: "4",
    titleList: "Estudos",
    tasks: [
      {
        idTask: "1",
        title: "Ler capítulo 4 do livro",
        finish: false,
      },
      {
        idTask: "2",
        title: "Fazer exercícios de matemática",
        finish: true,
      },
      {
        idTask: "3",
        title: "Assistir aula online",
        finish: false,
      },
    ],
  },
  {
    id: "5",
    titleList: "Saúde",
    tasks: [
      {
        idTask: "1",
        title: "Ir à academia",
        finish: false,
      },
      {
        idTask: "2",
        title: "Marcar consulta médica",
        finish: true,
      },
      {
        idTask: "3",
        title: "Comprar vitaminas",
        finish: false,
      },
    ],
  },
];

const taskListModel = {
  showAllLists: () => {
    return lists;
  },
  showListById: (id) => {
    return lists.find((list) => list.id === id);
  },
  createList: (titleList) => {
    const newList = {
      id: Math.floor(Math.random() * 99999999).toString(),
      titleList: titleList,
      tasks: [],
    };
    lists.push(newList);
  },
  deleteList: (id) => {
    lists = lists.filter((list) => list.id !== id);
  },
  addTask: (id, title) => {
    const newTask = {
      idTask: Math.floor(Math.random() * 99999999).toString(),
      title: title, //Titulo da task
      finish: false, //Boleano que diz se a terefa foi finalizada ou não
    };
    lists.find((list) => list.id === id).tasks.push(newTask);
  },
  finishTask: (id, idTask) => {
    const indexList = lists.findIndex((list) => list.id === id);
    const indexTask = lists[indexList].tasks.findIndex(
      (task) => task.idTask === idTask
    );
    lists[indexList].tasks[indexTask].finish = true;
  },
  undoTask: (id, idTask) => {
    const indexList = lists.findIndex((list) => list.id === id);
    const indexTask = lists[indexList].tasks.findIndex(
      (task) => task.idTask === idTask
    );
    lists[indexList].tasks[indexTask].finish = false;
  },
};

module.exports = taskListModel;
