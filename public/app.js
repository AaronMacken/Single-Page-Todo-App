// our API's calls are sent via HXR requests using jQuery

$(document).ready(function() {
  // /api/todos is thrown onto the server-path that we are already on
  // ex. we do not need to explicitly tell it appName.com/api/todos
  // When dom is loaded, request this api

//   the .then will call the addTodos function, which will be given the resolve object from the getJSON promise
  $.getJSON("/api/todos").then(addTodos);

  // .keypress is a jquery fn that we are created an event out of
  // if event (the key the user pressed) == 13 (the enter key) do something

  $("#todoInput").keypress(function(event) {
    if (event.which == 13) {
      createTodo();
    }
  });
});

$('.list').on('click', 'li', function() {
  updateTodo($(this));
});

// spans are added to the dynamically loaded data, so selecting spans is not reliable as they may not have been loaded onto the page yet
// the html UL is already on the page, so we select the UL and have it listen for clicks on spans
$('.list').on('click', 'span', function(e) {
  // this prevents the span from triggering the on click 
  // event of the li.
    e.stopPropagation();
    removeTodo($(this).parent());
});



// add todos to page here
// jQuery code - create li
// add the crossed out css class if todo item's completed attribute returns true
// add to html UL each newTodo li created from the json our api returned from mongo db

// function accepts an array of promise objects
// array.forEach(function(individualPromiseObject))
// call the addTodo function


function addTodos(todos) {
  todos.forEach(function(todo){
    addTodo(todo);
  }); 
}





// function takes the individual promise object  and creates a variable with the objects json
// jQuery is also written to turn it into an html element that includes this data
function addTodo(todo) {
  var newTodo = $("<li class='task'>" + todo.name + '<span>X</span>' + "</li>");
//   todo.data - store an item in jquery memory, but not in the database itself.
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if (todo.completed) {
    newTodo.addClass("done");
  }
//   add to our unordered list in html the new html item
  $(".list").append(newTodo);
}



// send post request to creat new todo route
function createTodo() {
    // variable equal to the value of the selected element
    // whatever the user types in is going to be the json that is sent to our api's post route
    // the function that executes takes req.body and creates a new object with that data.
    // add addTodo function is run again and the value of the input box is reset to nothing.
  var userInput = $("#todoInput").val();
  $.post("/api/todos", { name: userInput })
    .then(function(newTodo) {
      $("#todoInput").val("");
      addTodo(newTodo);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function updateTodo(todo) {
  var clickedId = todo.data('id');
  var updateUrl = '/api/todos/' + clickedId;
  // when we load the database items, each item's id and completed boolean values are loaded
  // all boolean values are initially set to false, since the item has not been completed yet
  // the isDone var finds the todo's boolean value and uses the not operator on it, switching it to true, instead of false
  // or vise versa
  var isDone = !todo.data('completed');
  // create a var that holds json who's value is the isDone boolean, which will be specific to each db item
  var updateData = {completed: isDone};
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    // data - data to pass into the put method
    data: updateData
  })
  .then(function(updatedTodo) {
    todo.toggleClass('done');
    // use this without the ! symbol to trigger boolean switch
    todo.data('completed', isDone);
  })
}

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var delteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: delteUrl
    })
    .then(function(data){
        todo.remove();
        console.log(data);
    });
}