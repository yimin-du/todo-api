var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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

	var todo = _.pick(req.body, "description", "completed");
	if(!_.isString(todo.description) || !_.isBoolean(todo.completed) || !todo.description.trim()) {
		return res.status(400).send();
	}


	todo.id = todoNextId++;
	todo.description = todo.description.trim();
	todos.push(todo);
	res.json(todos);
});

app.delete('/todos/:id', function(req, res) {
	var id = parseInt(req.params.id);
	var index = -1;
	todos.forEach(function(todo, i) {
		if(id === todo.id)	index = i;
	});
	if(index > -1){
		todos.splice(index, 1);
		res.send(200);
	}
	else {
		res.send(404);
	}
});

app.listen(PORT, function() {
	console.log("express is listening on port " + PORT + "!");
});