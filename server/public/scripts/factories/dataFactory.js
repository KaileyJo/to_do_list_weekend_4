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
        var promise = $http.post('/tasks', task).then(function(response) {
            getData();
            return response.data;
        });
        return promise;
    };

    var updateData = function(id) {
        var promise = $http.put('/tasks/' + id).then(function(response) {
            getData();
        });
        return promise;
    };

    var deleteData = function(id) {
        $http.delete('/tasks/' + id).then(function(response) {
            getData();
        });
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
        deleteTask: function(id) {
            deleteData(id);
        },
        tasksList: function() {
            return taskList;
        }
    };

    return publicApi;
}]);