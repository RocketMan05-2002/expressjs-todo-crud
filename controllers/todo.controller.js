const { getTodoData, addOrUpdateTodo } = require("../models/todo.model");

const getAllTodos = (req, res) => {
  let todos = getTodoData().todos;
  res.status(200).send({ msg: "list of todos", todos });
};

const getTodoById = (req, res) => {
  let id = req.params.id;
  let todos = getTodoData().todos;
  let index = todos.findIndex((el) => el.id == id);

  if (index == -1) {
    res.status(400).send("todo wasnt found");
  } else {
    todos.forEach((el) => {
      if (el.id == id) {
        res.status(200).send({ todos: el });
      }
    });
  }
};

const getTodoByQuery = (req, res) => {
  // console.log(req.query);
  const { name } = req.query;
  let todos = getTodoData().todos;

  if (name) {
    let resultTodos = todos.filter((el) => {
      if (el.name.includes(name)) {
        return el;
      }
    });

    if (resultTodos.length == 0) {
      res.status(400).send("todo wasnt found");
    } else {
      res.status(200).send({ todos: resultTodos });
    }
  } else {
    res.status(400).send("todo wasnt found");
  }
};

const addTodo = (req, res) => {
  let newTodo = req.body;
  let data = getTodoData().data;
  let todos = data.todos;
  todos.push(newTodo);
  addOrUpdateTodo(data);
  res.status(200).send("todo was added");
};

const deleteTodoById = (req, res) => {
  //console.log(req.params);
  let id = req.params.id;
  let data = getTodoData().data;
  let todos = data.todos;
  let index = todos.findIndex((el) => el.id == id);
  if (index == -1) {
    res.status(400).send("todo wasnt found");
  } else {
    let filteredTodos = todos.filter((el) => el.id != id);
    data.todos = filteredTodos;
    addOrUpdateTodo(data);
    res.status(200).send("todo was deleted");
  }
};

const updateTodoById = (req, res) => {
  let id = req.params.id;
  let data = getTodoData().data;
  let todos = data.todos;
  let index = todos.findIndex((el) => el.id == id);

  if (index == -1) {
    res.status(400).send("todo wasnt found");
  } else {
    let updatedTodos = todos.map((el) => {
      if (el.id == id) {
        return { ...el, ...req.body };
      } else {
        return el;
      }
    });

    data.todos = updatedTodos;
    addOrUpdateTodo(data);
    res.status(200).send("todo was updated successfully");
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  getTodoByQuery,
  addTodo,
  deleteTodoById,
  updateTodoById,
};
