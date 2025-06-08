const getBlogData = require("../models/blog.model")

const getAllBlogs = (req,res)=>{
    let data = getBlogData().data;
    let blogs = data.blogs;
    res.send({msg:"list of blogs", blogs});
};

module.exports = getAllBlogs;