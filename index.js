const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

//1. read todos
app.get("/todos",(req,res)=>{
    // i will read db.json file and give all available todos as response
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;
    console.log(todos);
    res.send({msg:"List of todos",todos});
})

//2. add a todo
app.post("/add-todo",(req,res)=>{
    // body will be sent by POSTMAN or frontend
    let newTodo = req.body;
    console.log(req.body);
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;
    todos.push(newTodo);
    fs.writeFileSync("./db.json",JSON.stringify(data));
    res.send("Todo added");
})

//3. delete todo
app.delete("/delete-todo/:id",(req,res)=>{
    console.log(req.params);
    let id = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;
    let index = todos.findIndex((el)=>el.id == id);
    if(index == -1){
        res.send(`No todo of ${id} was found`);
    }else{
        let filteredTodos = todos.filter((el)=>el.id != id);
        data.todos = filteredTodos;
        //update database
        fs.writeFileSync("./db.json", JSON.stringify(data));
        res.send(`${id} todo deleted`);
    }
})

app.listen(8000,()=>{
    console.log("server started through port 8000");
});