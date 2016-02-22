$(document).ready(function () {
    getData();
    $('#submit').on('click', postTask);
    $('#to-do-list').on('click', '.complete', completeTask);
    $('#to-do-list').on('click', '.delete', deleteTask);
});

function getData() {
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function(data) {
            appendTask(data);
        }
    });
}

function postTask() {
    event.preventDefault();
    var values = {};

    $.each($('#task-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: values,
        success: function(data) {
            if(data) {
                console.log('from server: ', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });
}

function appendTask(info) {
    $('#to-do-list').empty();
    $('#done-list').empty();
    for (var i = 0; i < info.length; i++) {
        var task = info[i].task;
        var id = info[i].completed;
        if(id == true) {
            $('#done-list').append('<li>' + task + '</li>');
        } else {
            $('#to-do-list').append('<div class="new-task"></div>');
            var $el = $('#to-do-list').children().last();
            $el.append('<li id="' + info[i].id + '">' + task + '</li>');
            $el.append('<button class="complete">Complete!</button>');
            $el.append('<button class="delete">Not To Do!</button>');
        }
    }
}

function completeTask() {
    var id = $(this).siblings('li').attr('id');
    //var $el = $(this).parent();
    //var $li = $el.children('li').text();
    var values = {};

    values.id = id;
    //$('#done-list').append('<li>' + $li + '</li>');
    //$el.remove();

    $.ajax({
        type: 'POST',
        url: '/completed',
        data: values,
        success: function(data) {
            if(data) {
                console.log('from server:', data);
                getData(data);
            } else {
                console.log('error');
            }
        }
    });
}

function deleteTask() {
    var id = $(this).siblings('li').attr('id');
    var values = {};
    values.id = id;

    $(this).parent().remove();

    $.ajax({
        type: 'POST',
        url: '/delete',
        data: values,
        success: function(data) {
            if(data) {
                console.log('from server:', data);
            } else {
                console.log('error');
            }
        }
    });
}