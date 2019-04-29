// const express = require('express')
//
// const app = express()
// const port = 3000
//
// app.get('/', (req, res) => res.send('Hello World!'))
//
// app.listen(port, () => console.log(`!!!!!!!!!!!!!!!!!!!! Example app listening on port ${port}!`))
//
//
//
//
// //app.use(express.urlencoded())
//
// app.post('/KgMuseum.html', (req,res) => {
//   const email_address = req.body.email
//   console.log(`!!!!!!!!!!!!!!!!!!!! hello!`)
//   res.end()
//
//   })

/**
app.post('/', function(req, res){
  console.log(req.body);
  res.send("recieved your request!");
});
app.listen(port);
**/


var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}


//public folder covers scope

//if browser has service worker object supported add



if ('serviceWorker' in navigator) {
  navigator.serviceWorker

//where the service worker is being used


    .register('/sw.js')

      //promise complete register

      .then(function () {
      console.log('Registered service worker');
    })

    .catch(function(err) {
      console.log(err);
    });
}

//triggered by chrome before installed banner event
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');

  //Chrome wont show browser
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

/**
 * @file The main logic for the Todo List App.
 * @author Matt West <matt.west@kojilabs.com>
 * @license MIT {@link http://opensource.org/licenses/MIT}.
 */


window.onload = function() {

    // Display the todo items.
    todoDB.open(refreshTodos);


    // Get references to the form elements.
    var newTodoForm = document.getElementById('new-todo-form');
    var newTodoInput = document.getElementById('new-todo');


    // Handle new todo item form submissions.
    newTodoForm.onsubmit = function() {
        // Get the todo text.
        var text = newTodoInput.value;

        // Check to make sure the text is not blank (or just spaces).
        if (text.replace(/ /g,'') != '') {
            // Create the todo item.
            todoDB.createTodo(text, function(todo) {
                refreshTodos();
            });
        }

        // Reset the input field.
        newTodoInput.value = '';

        // Don't send the form.
        return false;
    };

}

// Update the list of todo items.
function refreshTodos() {
    todoDB.fetchTodos(function(todos) {
        var todoList = document.getElementById('todo-items');
        todoList.innerHTML = '';

        for(var i = 0; i < todos.length; i++) {
            // Read the todo items backwards (most recent first).
            var todo = todos[(todos.length - 1 - i)];

            var li = document.createElement('li');
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.className = "todo-checkbox";
            checkbox.setAttribute("data-id", todo.timestamp);

            li.appendChild(checkbox);

            var span = document.createElement('span');
            span.innerHTML = todo.text;

            li.appendChild(span);

            todoList.appendChild(li);

            // Setup an event listener for the checkbox.
            checkbox.addEventListener('click', function(e) {
                var id = parseInt(e.target.getAttribute('data-id'));

                todoDB.deleteTodo(id, refreshTodos);
            });
        }

    });
}



