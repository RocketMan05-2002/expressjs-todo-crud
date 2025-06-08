const express = require("express");
const fs = require("fs");
const getAllBlogs = require("../controllers/blog.controller");

const blogRouter = express.Router();

blogRouter.get("/get-blogs", getAllBlogs)

module.exports = blogRouter;
