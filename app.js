var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/iota';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/tasks', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM tasks ORDER BY id ASC');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

app.post('/tasks', function(req, res) {
    var addTask = {
        task: req.body.task,
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO tasks (task) VALUES ($1)",
            [addTask.task],
            function(err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            }
        );
    });
});

app.put('/completed/:id', function(req, res) {
    var task = {
        taskID: req.params.id,
        completed: 'TRUE'
    };

    console.log(task);

    pg.connect(connectionString, function(err, client, done) {
        client.query("UPDATE tasks SET completed = $1 WHERE id = $2",
            [task.completed, task.taskID],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error updating data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            }
        );
    });
});

app.delete('/delete/:id', function(req, res) {
    var task = {
        taskID: req.params.id
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("DELETE FROM tasks WHERE id = $1",
            [task.taskID],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            }
        );
    });
});

app.use(express.static('server/public/'));
app.use(express.static('server/public/views'));
app.use(express.static('server/public/vendors'));
app.use(express.static('server/public/styles'));
app.use(express.static('server/public/scripts'));


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});