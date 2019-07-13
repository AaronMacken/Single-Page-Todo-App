var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

//   bodyParser is used to handle data coming in from post requests

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// following line lets the app find the given directory no matter
// where it is searching from
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

var todoRoute = require("./routes/todos");

app.use("/api/todos", todoRoute);

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Sever is listening");
});
