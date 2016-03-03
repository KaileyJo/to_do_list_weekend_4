myApp.factory('DataFactory', ['$http', function($http) {
    var getData = function() {
        var promise = $http.get('/tasks', tasks).then(function(response) {
            return response.data;
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
        }
    }
}]);