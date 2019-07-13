// This file will contian the functions that will be executed
// for our todo routes. The reason for doing this is to keep our
// todo routes nice and clean looking and improve readability.

// the entire callback function that previously existed in our route file
// will first be copy and pasted here.

// preface that function with exports.<functionName>
// exports will be what sends out the arbitrary fn name when
// when we require this file in our todo route file

// make sure you require any necessary files that are used.
// ex. db.Todo is undefined without requiring the todo model

var db = require("../models");

// getTodos - show all todos
exports.getTodos = (req, res) => {
  // use the db model variable to find all Todo items
  db.Todo.find()
    .then(todos => {
      // send json back (found db items as json)
      res.json(todos);
    })
    .catch(err => {
      res.send(err);
    });
};

// create todo route
exports.createTodo = (req, res) => {
  // once body parser is included we can access post data via req.body
  // access the db variable we created that is exporting the Todo schema
  // use mongoose fn .create to create a new instance of todo using
  // the data passed in from req.body
  db.Todo.create(req.body)
    .then(newTodo => {
      // send back the newTodo (resolved promise data)
      // reminder - we can use this promise syntax because of the
      // mongoose.promise line we wrote in the models index.js file
      // res.status(201) simply tells us that something was successfully created

      res.status(201).json(newTodo);
    })
    .catch(err => {
      res.send(err);
    });
};

// show route
// each time a new database object is created, an id is automatically
// generated for that specific item. We can use this id to load in
// specific database objects via the restful show route

exports.getTodo = (req, res) => {
  // use the database variable we created that is exporting the Todo
  // model, and call the mongoose function -findById- to find the unique
  // db Todo item

  // the unique id is found via req.params.todoId - the data that is stored
  // in router.get("/: -> todoId <- ")
  db.Todo.findById(req.params.todoId)
    .then(foundTodo => {
      res.json(foundTodo);
    })
    .catch(err => {
      console.log(err);
    });
};

// update route
// give the unique id to update info for
// database variable which references the Todo model will use the mongoose
// method - findOneAndUpdate- which first takes an object as a param
// _id: req.params.todoId - will find the Todo obj who's ID matches
// the id given in req.params.todoId,
// The second param is what to update the information with, here
// we will use req.body as it is already a json object which contains
// data that will be used to update,
// finally, {new: true} simply lets res.json(todo) respond with the updated
// object. By default it would have sent back the object before updates
// once this process is complete, use .then(resolveData) & .catch(rejectData)
// to complete the functionality

exports.updateTodo = (req, res) => {
  db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
    .then(todo => {
      res.json(todo);
    })
    .catch(err => {
      console.log(err);
    });
};


// delete route
// works similar to the update route, except it will remove the found db item
// we simply send back a json object which states that the item has been deleted

exports.deleteTodo = (req, res) => {
    db.Todo.remove({_id: req.params.todoId})
    .then(() => {
        res.json({message: "Item deleted"});
    })
    .catch((err) => {
        console.log(err);
    });
}



// export from this module the -exports- that prefaces the
// function names
module.exports = exports;
