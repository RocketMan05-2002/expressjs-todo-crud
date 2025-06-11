const getBlogData = require("../models/blog.model");

const getAllBlogs = (req,res)=>{
    let blogs = getBlogData().blogs;
    res.send({msg:"list of blogs", blogs});
};

module.exports = getAllBlogs;