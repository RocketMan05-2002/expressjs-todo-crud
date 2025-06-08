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
app.use(express.json()); // body parser that senses json being sent

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

// 4. delete todo
app.delete("/delete-todo/:id",(req,res)=>{
    // console.log(req.params);

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

// update todo
app.put("/update-todo/:id",(req,res)=>{
    //:id is a path parameter
    // params is a key value pair in req object
    let id = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;
    let index = todos.findIndex((el)=>el.id == id);

    if(index == -1){
        res.send("todo not found");
    }else{
        //todo found
        let updatedTodos = todos.map((el,i)=>{
            if(el.id == id){
                return {...el,...req.body};
            }else{
                return el;
            }
        })
        data.todos = updatedTodos;
        fs.writeFileSync("./db.json",JSON.stringify(data));
        res.send("todo updated");
    }
})

// get todo by Id
app.get("/todo/:id",(req,res)=>{
    let id = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;
    let index = todos.findIndex((el)=>el.id == id);

    if(index == -1){
        res.send("todo not found");
    }else{
        todos.forEach((el)=>{
            if(el.id == id){
                res.send({todo:el});
            }
        })
    }
})

//6. get todo by query
app.get("/todos",(req,res)=>{
    console.log(req.query);
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let todos = data.todos;
    const {name} = req.query;
    if(name){
        //serach todo by name and send as a response
        let filteredTodos = todos.filter((el)=>{
            if(el.name.includes(name)){
                return el;
            }
        });
        if(filteredTodos.length ==0){
            res.send("no todos found");
        }else{
            res.send({todos: filteredTodos});
        }
    }else{
        res.send({msg:"list of todos",todos});
    }
})


app.listen(8000,()=>{
    console.log("Server started through port 8000");
});