const fs = require("fs");

const loggerMiddleware = (req, res, next) => {
  // this middleware just logs all requests in a file
  let data = `\n End-point: ${req.url} | Method: ${
    req.method
  } | Date-Time: ${new Date().toISOString()} \n`;
  fs.appendFileSync("./logs.txt", data);
  next();
};

module.exports = loggerMiddleware;
