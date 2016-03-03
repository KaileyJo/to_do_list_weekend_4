myApp.factory('dataFactory', ['$http', function($http) {
    var taskList = undefined;

    var getData = function() {
        console.log('Getting Data');
        var promise = $http.get('/tasks').then(function(response) {
            taskList = response.data;
            console.log('Async data response', taskList);
        });
        return promise;
    };

    var postData = function(task) {
        var promise = $http.post('/tasks', task).then(function(response) {});
        return promise;
    };

    var updateData = function(id) {
        var promise = $http.put('/tasks/done/' + id).then(function(response) {});
        return promise;
    };

    var redoData = function(id) {
        var promise = $http.put('/tasks/redo/' + id).then(function(response) {});
        return promise;
    };

    var deleteData = function(id) {
        var promise = $http.delete('/tasks/' + id).then(function(response) {});
        return promise;
    };

    var publicApi = {
        getTasks: function() {
            return getData();
        },
        postTask: function(task) {
            return postData(task);
        },
        updateTask: function(id) {
            return updateData(id);
        },
        redoTask: function(id) {
            return redoData(id)
        },
        deleteTask: function(id) {
            return deleteData(id);
        },
        tasksList: function() {
            return taskList;
        }
    };

    return publicApi;
}]);