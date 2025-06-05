// using  request response cycle 
// i want to create a todo
// update a todo
// delete a todo
// read a todo . i.e. CRUD

const fs = require("fs");
const express = require("express");

const app = express();
//3.  we need to inform Express that JSON is coming from body.
// either from Postman or frontend
app.use(express.json());

// 1. app.get("/todos",(req,res)=>{
//     // i will read db.json file and give all available todos as response
//     // to read a file i need fs module here
//     let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
//     console.log(data);
//     res.send("List of todos");
// })

// 2. read todos
app.get("/todos",(req,res)=>{
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    console.log(data);
    let todos = data.todos;
    res.send({msg:"List of Todos",todos});
})

//3. add todo
app.post("/add-todo",(req,res)=>{
    let newTodo = req.body;
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));;
    let todos = data.todos;
    todos.push(newTodo);
    console.log(data);
    console.log(todos);
    fs.writeFileSync("./db.json",JSON.stringify(data));
    res.send("Todo added");
})

// o/p
/* 
{
    "msg": "List of Todos",
    "todos": [
        {
            "id": 1,
            "name": "Learn NEM",
            "status": false
        },
        {
            "id": 2,
            "name": "Learn Express",
            "status": false
        }
    ]
}
*/

app.delete("/delete-todo/:id",(req,res)=>{
    // console.log(req.params);
    let id = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;
    let index = todos.findIndex((el)=>el.id == id);

    if(index == -1){
        res.send(`No todo of ${id} was found`);
    }else{
        let filteredTodos = todos.filter((el)=>el.id != id);
        //replace todos with filteredTodos
        data.todos = filteredTodos;
        //update in database
        fs.writeFileSync("./db.json",JSON.stringify(data));
        res.send(`${id} Todo deleted`);
    }
})
// apparently === and !== wont work here, we gotta stick ton == and !=

app.listen(8000,()=>{
    console.log("Server started through port 8000");
});