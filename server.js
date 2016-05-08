var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send("Todo App!");
});

app.get('/todos', function(req, res) {
	res.json(todos);
	//res.send("todos json");
});

app.get('/todos/:id', function(req, res) {
	todos.forEach(function(todo)  {
		if(todo.id.toString() === req.params.id) {
			res.json(todo);
		}
	});
	res.status(404).send();
});

app.post('/todos', function(req, res) {
	console.log("posting to server:");
	var todo = req.body;
	todo.id = todoNextId++;
	todos.push(todo);
	res.send(todos);
});

app.listen(PORT, function() {
	console.log("express is listening on port " + PORT + "!");
});