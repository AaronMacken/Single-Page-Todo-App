var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

//   bodyParser is used to handle data coming in from post requests

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var todoRoute = require("./routes/todos");

app.use("/api/todos", todoRoute);

app.get("/", (req, res) => {
    res.send("Hello from root");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Sever is listening");
});
