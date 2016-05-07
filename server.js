var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [
	{ 	id: 1,
		task: 'pick up alex',
		completed: false
	},
	{ 	id: 2,
		task: 'feed the cat',
		completed: true
	},
	{ 	id: 3,
		task: 'buy milk',
		completed: false
	}


];

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

app.listen(PORT, function() {
	console.log("express is listening on port " + PORT + "!");
});