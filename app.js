var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/iota');
mongoose.model(
    'Task',
    new Schema({
        'task': String,
        'completed': Boolean
        },
        {
            collection: 'tasks'
        }
    )
);

var Task = mongoose.model('Task');

app.get('/tasks', function(req, res) {
    Task.find({}, function(err, data) {
        if(err) {
            console.log(err);
        }
        console.log(data);
        res.send(data);
    });
});

app.post('/tasks', function(req, res) {
    var addTask = new Task({
        "task": req.body.task,
        "completed": req.body.completed
    });

    addTask.save(function(err, data) {
        if(err) {
            console.log('ERR::', err);
        }

        Task.find({}, function(err, data) {
            if(err) {
                console.log(err);
            }
            res.send(data);
        });
    });
});

app.put('/tasks/:id', function(req, res) {
    Task.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: {completed: true}},
        function(err, data) {
            if(err) {
                console.log('Err::', err);
            }
            res.send(data);
        }
    );
});

app.delete('/tasks/:id', function(req, res) {
    Task.findByIdAndRemove({_id: req.params.id}, function(err, data) {
        if(err) {
            console.log(err);
        }
        res.send(data);
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