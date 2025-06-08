const express = require("express");
const fs = require("fs");

const blogRouter = express.Router();

blogRouter.get("/get-blogs",(req,res)=>{
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let blogs = data.blogs;
    res.send({msg:"list of blogs", blogs});
})

module.exports = blogRouter;
