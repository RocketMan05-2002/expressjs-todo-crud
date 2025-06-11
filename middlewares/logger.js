const fs = require("fs")

const loggerMiddleware = (req,res,next) => {
    // this middleware just logs all requests in a file
    let data =`End-point: ${req.url} | Method: ${req.method} | Date-Time: ${Date.now()} \n`;
    fs.appendFileSync("./logs.txt",data);
    next();
}

module.exports = loggerMiddleware;