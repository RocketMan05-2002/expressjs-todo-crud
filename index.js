
const fs = require("fs");
const express= require("express");
const todoRouter = require("./routers/todo.router");
const blogRouter = require("./routers/blog.router");
const loggerMiddleware = require("./middlewares/logger");

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

//0. test request
app.get("/test",(req,res)=>{
    res.send("wepbicI");
})

//todos
app.use("/todos", todoRouter);

//blogs
app.use("/blogs", blogRouter)

app.use((req,res)=>{
    res.status(400).send("request not found");
})

app.listen(8000,()=>{
    console.log("server started via 8000 port");
})