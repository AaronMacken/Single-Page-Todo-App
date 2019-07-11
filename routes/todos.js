var express = require("express"),
    router = express.Router();

// Give this route file access to db items
var db = require("../models");

// require the helper file to execute our functions
var helper = require("../helpers/todos");

// instead of creating two different routes for get & post,
// we can chain them together with the below syntax
// this is because they both use the same route, just different
// methods

// get todos & create a todo route
// within the route, call the helper file .<functionName>
router.route("/")
.get(helper.getTodos)
.post(helper.createTodo);

router.route("/:todoId")
.get(helper.getTodo)
.put(helper.updateTodo)
.delete(helper.deleteTodo);




module.exports = router;