const { getTodoData, addOrUpdateTodos } = require("../models/todo.model");

const getAllTodos = (req, res) => {
  let todos = getTodoData().todos;
  res.send({ msg: "lost of todos", todos });
};

const addTodo = (req, res) => {
  // console.log(req.body);
  let newTodo = req.body;
  let data = getTodoData().data;
  let todos = data.todos;
  todos.push(newTodo); //heap memory wont work now

  addOrUpdateTodos(data);
  res.send("todo was added");
};

const deleteTodoById = (req, res) => {
  // console.log(req.params);
  let id = req.params.id;
  let data = getTodoData().data;
  let todos = data.todos;
  let index = todos.findIndex((el) => el.id == id);

  if (index == -1) {
    res.send("todo wasnt found");
  } else {
    //todo was found. filter it out
    let filteredTodos = todos.filter((el) => el.id != id);
    data.todos = filteredTodos;
    addOrUpdateTodos(data);
    res.send("todo was deleted");
  }
};

const updateTodobyId = (req, res) => {
  let id = req.params.id;
  let data = getTodoData().data;
  let todos = data.todos; //since we are using heap meomey dont alter this
  let index = todos.findIndex((el) => el.id == id);

  if (index == -1) {
    res.send("todo wasnt found");
  } else {
    let updatedTodos = todos.map((el) => {
      if (el.id == id) {
        return { ...el, ...req.body };
      } else {
        return el;
      }
    });
    data.todos = updatedTodos;
    addOrUpdateTodos(data);
    res.send("todo was updated");
  }
};

const getTodoById = (req, res) => {
  // req.params
  let id = req.params.id;
  let todos = getTodoData().todos;
  let index = todos.findIndex((el) => el.id == id);

  if (index == -1) {
    res.send({ msg: "list of todos", todos });
  } else {
    //todo was found
    let filteredTodos = todos.filter((el) => {
      if (el.id == id) {
        res.send(el);
      }
    });
    res.send({ todos: filteredTodos });
  }
};

const getTodoByQuery = (req, res) => {
  // console.log(req.query); // {name:"Learn NEM"}
  const { name } = req.query;
  let todos = getTodoData().todos;
  if (name) {
    let filteredTodos = todos.filter((el) => {
      if (el.name.includes(name)) {
        return el;
      }
    });
    if (filteredTodos.length == 0) {
      res.send("no todos were found");
    } else {
      res.send({ todos: filteredTodos });
    }
  } else {
    res.send({ msg: "list of todos", todos });
  }
};

module.exports = { getAllTodos, addTodo, deleteTodoById, updateTodobyId, getTodoById, getTodoByQuery }