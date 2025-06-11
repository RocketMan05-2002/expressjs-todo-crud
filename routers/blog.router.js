const express = require("express");
const getAllBlogs = require("../controllers/blog.controller");

const blogRouter = express.Router();

blogRouter.get("/get-blogs", getAllBlogs)

module.exports = blogRouter;