const express = require("express");
const fs = require("fs");

const todoRouter = express.Router();

// 1. read todos
todoRouter.get("/get-todos", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  res.status(200).send({ msg: "lost of todos", todos });
});

// 2. add a todo
todoRouter.post("/add-todo", (req, res) => {
  // console.log(req.body);
  let newTodo = req.body;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  todos.push(newTodo);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.send("todo was added");
});

//3. delete a todo
todoRouter.delete("/delete-todo/:id", (req, res) => {
  // console.log(req.params);
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
  let index = todos.findIndex((el) => el.id == id);

  if (index == -1) {
    res.status(404).send("todo wasnt found");
  } else {
    //todo was found. filter it out
    let filteredTodos = todos.filter((el) => el.id != id);
    data.todos = filteredTodos;
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send("todo was deleted");
  }
});

// 4. update a todo
todoRouter.put("/update-todo/:id", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
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
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send("todo was updated");
  }
});

//5. get todo by id
todoRouter.get("/todos/:id", (req, res) => {
  // req.params
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
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
});

//6. get todo by query
todoRouter.get("/todo", (req, res) => {
  // console.log(req.query); // {name:"Learn NEM"}
  const { name } = req.query;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;
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
});

module.exports = todoRouter;
