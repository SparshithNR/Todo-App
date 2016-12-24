var express = require('express');

var app = express();
var cors = require('cors');
var bodyParser =  require('body-parser');
var counter = 4;

var todoList = [
	{
		id: '1',
		todoItem: 'b',
		status: 1
	},
	{
		id: '2',
		todoItem: 'd',
		status: 1	
	},
	{
		id: '3',
		todoItem: 'f',
		status: 1
	},
	{
		id: '4',
		todoItem: 'h',
		status: 0
	}
];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
	console.log(`${req.method} request for '${JSON.stringify(req.body)}'`);
	next();
});
app.use(express.static('./public'));

app.get('/todo-api', function (req, res) {
	res.json(todoList);
});

app.post('/todo-api', function(req,res) {
	if(req.body.todoId) {
		todoList.forEach(function(ele) {
			if(ele.id === req.body.todoId) {
				ele.status = req.body.todoStatus;
				return false;
			}
		});
	} else {
		var id = counter+1;
		todoList.push({
			id : id.toString(),
			todoItem: req.body.todoItem,
			status: 1
		});
	}
	res.json(todoList);
});

app.delete('/todo-api/:id', function(req, res) {
	todoList  = todoList.filter(function(ele) {
		if(ele.id.toLowerCase() === req.params.id.toLowerCase()) {
			return false;
		}
		return true;
	});
	res.json(todoList);
});
app.use(cors());
app.listen(3000);

console.log('express running in port 3000:');

module.exports = app;

