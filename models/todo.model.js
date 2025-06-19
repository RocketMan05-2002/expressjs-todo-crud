const fs = require("fs");

const getTodoData = () => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let todos = data.todos;

  return { data, todos };
};

const addOrUpdateTodo = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data));
};

module.exports = { getTodoData, addOrUpdateTodo };
