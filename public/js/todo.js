var todoApp = angular.module('todoApp', []);
todoApp.controller('todoController', function($scope, $http) {
	$scope.todoList = [];
	$scope.newTodo = '';
	$http.get('/todo-api').then(function(response) {
		$scope.todoList = response.data;
		console.log(response);
	});
	$scope.addTodo = function() {
		$http.post('/todo-api', {todoItem:$scope.newTodo}).then(function (response) {
			$scope.todoList = response.data;
			console.log(response);
		});
		$scope.newTodo = '';
	}
	$scope.deleteTodo =  function (todo) {
		$http.delete('/todo-api/'+todo.id).then(function(response) {
			$scope.todoList = response.data;
			console.log(response);
		});
	}
	$scope.changeStatus =  function(todo) {
		$http.post('/todo-api', {todoId:todo.id, todoStatus:(todo.status ? 0 : 1)}).then(function (response) {
			$scope.todoList = response.data;
			console.log(response);
		});
	} 
});