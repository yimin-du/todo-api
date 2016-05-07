var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.send("Todo App!");
});

app.listen(PORT, function() {
	console.log("express is listening on port " + PORT + "!");
});