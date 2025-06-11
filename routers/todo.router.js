const express = require("express");
const { getAllTodos, getTodoById, addTodo, deleteTodoById, updateTodoById, getTodoByQuery } = require("../controllers/todo.controller");
const checkIncomingTodo = require("../middlewares/checkIncomingTodo")
const todoRouter = express.Router();


//1. get(read all todos)
todoRouter.get("/get-todos", getAllTodos)

//2. add todo
todoRouter.post("/add-todo", checkIncomingTodo , addTodo)

//3. delete todo
todoRouter.delete("/delete-todo/:id", deleteTodoById)

// 4. update a todo
todoRouter.put("/update-todo/:id", updateTodoById)

// 5. get todo by id
todoRouter.get("/todo-id/:id", getTodoById)

//6. get todo by query
todoRouter.get("/todo-query", getTodoByQuery)

module.exports = todoRouter;