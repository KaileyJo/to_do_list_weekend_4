var myApp = angular.module('myApp', []);

myApp.controller('TaskController', ['$scope', 'dataFactory', function($scope, dataFactory) {
    $scope.dataFactory = dataFactory;
    $scope.taskItem = '';

    var getAllTasks = function() {
        dataFactory.getTasks().then(function() {
            $scope.tasks = dataFactory.tasksList();

        });
    };


    $scope.submitTask = function() {
        var newTask = {
            task: $scope.taskItem,
            completed: false
        };

        dataFactory.postTask(newTask).then(function() {
            getAllTasks();
        });
    };

    $scope.complete = function(id) {
        dataFactory.updateTask(id).then(function() {
            getAllTasks();
        });
    };

    $scope.redo = function(id) {
        dataFactory.redoTask(id).then(function() {
            getAllTasks();
        });
    };

    $scope.delete = function(id) {
        var deleteTask = confirm('Are you sure you want to delete this task??');
        if (deleteTask == true) {
            dataFactory.deleteTask(id).then(function() {
                getAllTasks();
            });
        }
    };

    getAllTasks();
}]);