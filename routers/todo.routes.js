const express = require("express");
const { getAllTodos, addTodo, deleteTodoById, updateTodobyId, getTodoById, getTodoByQuery } = require("../controllers/todo.controller");

const todoRouter = express.Router();

const checkIncomingTodo = (req,res,next) => {
    const allowedKeys = ["id","name","status"];
    const keys = Object.keys(req.body);

    const hasOnlyAllowedKeys = keys.every( key => allowedKeys.includes(key));
    const hasRequiredKeys = allowedKeys.every(key => key in req.body);

    if(!hasOnlyAllowedKeys || !hasRequiredKeys){
        res.status(400).send("Invalid todo format: only 'name' and 'status' are allowed.");
    }else{
        next();
    }
}

// 1. read todos
todoRouter.get("/get-todos", getAllTodos);

// 2. add a todo
todoRouter.post("/add-todo", checkIncomingTodo , addTodo );

//3. delete a todo
todoRouter.delete("/delete-todo/:id", deleteTodoById);

// 4. update a todo
todoRouter.put("/update-todo/:id", updateTodobyId );

//5. get todo by id
todoRouter.get("/todos/:id", getTodoById);

//6. get todo by query
todoRouter.get("/todo", getTodoByQuery);

module.exports = todoRouter;
