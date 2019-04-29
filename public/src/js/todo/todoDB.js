window.onload = function() {

    //each time the event page window is loaded the up to date my bookings is called

    acitivitiesDB.open(updateUserList);


    var lawn = document.getElementById('lawn_todo');
        lawn.onclick = function() {
        var text = "Kelvingrove Lawn Bowls and Tennis Centre";
        var link = "tennis.html";
        console.log(`Adding ${text} to the to-do list`);
        {
            acitivitiesDB.addToDo(text, link, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };


    document.getElementById('skate_todo').onclick = function() {
        var text = "Kelvingrove Skatepark";
        var link = "skatepark.html";
        console.log(`Adding ${text} to the to-do list`);
        {
            acitivitiesDB.addToDo(text, link, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

    document.getElementById('stand_todo').onclick = function() {
        var text = "The Stand Comedy Club";
        var link = "thestand.html";
        console.log(`Adding ${text} to the to-do list`);
        {
            acitivitiesDB.addToDo(text, link, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

    document.getElementById('band_todo').onclick = function() {
        var text = "Kelvingrove Bandstand";
        var link = "bandstand.html";
        console.log(`Adding ${text} to the to-do list`);

        {
            acitivitiesDB.addToDo(text, link, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

    document.getElementById('brew_todo').onclick = function() {
        var text = "Brewdog";
        var link = "brewdog.html";
        console.log(`Adding ${text} to the to-do list`);

        {
            acitivitiesDB.addToDo(text, link, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

    document.getElementById('clach_todo').onclick = function() {
        var text = "Al Clachan Cafe";
        var link = "cafe1.html";
        console.log(`Adding ${text} to the to-do list`);

        {
            acitivitiesDB.addToDo(text, link, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

    document.getElementById('fountain_todo').onclick = function() {
        var text = "Stewart Memorial Fountain";
        var link = "fountain.html";
        console.log(`Adding ${text} to the to-do list`);

        {
            acitivitiesDB.addToDo(text, link, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

    document.getElementById('deep_todo').onclick = function() {
        var text = "Inn Deep";
        var link = "inndeep.html";
        console.log(`Adding ${text} to the to-do list`);

        {
            acitivitiesDB.addToDo(text, link, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

    document.getElementById('museum_todo').onclick = function() {
        var text = "Kelvingrove Art Gallery & Museum";
        var link = "kmuseum.html";
        console.log(`Adding ${text} to the to-do list`);

        {
            acitivitiesDB.addToDo(text, link, function(userTodo) {
                updateUserList();
            });
        }
        return false;
    };

}

//called when each booking is created to update the booking list on the events page
function updateUserList() {

    acitivitiesDB.getuserToDoList(function(todo_user) {
        var list = document.getElementById('toDoList');
        list.innerHTML = '';

        for(var i = 0; i < todo_user.length; i++) {


            var booking = todo_user[(todo_user.length - 1 - i)];

            //creates the list
            var l = document.createElement('li');


            var text = document.createElement('a');
            text.innerText = booking.text;
            text.href = booking.date;

            l.appendChild(text);

            list.appendChild(l);

        }

    });
}
