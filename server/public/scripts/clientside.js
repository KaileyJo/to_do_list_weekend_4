var myApp = angular.module('myApp', []);

myApp.controller('TaskMaster', ['$scope', 'DataFactory', function($scope, dataFactory) {
    $scope.dataFactory = dataFactory;

    dataFactory.getTasks();

    $scope.submitTask = function() {
        var newTask = {
            task: $scope.taskItem,
            completed: false
        };

        dataFactory.postTask(newTask);
    };

    $scope.complete = function(id) {
        dataFactory.updateTask(id);
    };

    $scope.delete = function(id) {
        var deleteTask = confirm('Are you sure you want to delete this task??');
        if (deleteTask == true) {
            dataFactory.deleteTask(id);
        }
    };
}]);