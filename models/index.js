// This file is created to require these things in our apps main file
// as opposed to adding these settings into the file itself.
// When we require this directory, index will automatically be loaded,
// then this file exports the schema that we defined in the todo.js file
var mongoose = require("mongoose");
mongoose.set("debug", true);

mongoose.connect("mongodb://localhost/todo-api");

// Allows us to use promise syntax.
mongoose.Promise = Promise;

// Export the schema that we defined as Todo
module.exports.Todo = require("./todo");