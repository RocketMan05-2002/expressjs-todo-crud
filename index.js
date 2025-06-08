// blogs - > blog router and this router should be connected to index.js
// if it is related to blogs index.js will send it to blog.router
// in express we have a feature called as router


const express = require("express");
const fs = require("fs");
const todoRouter = require("./routers/todo.routes");
const blogRouter = require("./routers/blog.routes");

const app = express();
app.use(express.json());

// todo routes
app.use("/todos", todoRouter); // any request with endpoint starting with todos,
// it will see /todos app will send the remaining part to todoRouter

//blog routes
app.use("/blogs", blogRouter);// any request with endpoint starting with blogs,
// it will see /blogs app will send the remaining part to blogRouter


app.listen(8000,()=>{
    console.log("server started at 8000 port");
})