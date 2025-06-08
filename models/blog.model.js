const fs = require("fs");

const getBlogData = () => {
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let blogs = data.blogs;

    return {data,blogs};
}

module.exports = getBlogData;