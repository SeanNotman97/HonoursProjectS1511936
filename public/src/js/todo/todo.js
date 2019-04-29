//https://developers.google.com/web/ilt/pwa/working-with-indexeddb
//https://blog.teamtreehouse.com/create-your-own-to-do-app-with-html5-and-indexeddb
//https://www.tutorialspoint.com/html5/html5_indexeddb.htm
//https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

var acitivitiesDB = (function() {
    var user_ToDo = {};
    var dataStore2 = null;


    //connection to indexeddb open
    user_ToDo.open = function(callback) {

        var version = 2;

        //dataStore2 connection
        var datastoreConnection = indexedDB.open('todos', version);

        //new version upgrade
        datastoreConnection.onupgradeneeded = function(event) {
            var db = event.target.result;

            event.target.transaction.onerror = user_ToDo.onerror;

            // Delete the old dataStore2.
            if (db.objectStoreNames.contains('userTodo')) {
                db.deleteObjectStore('userTodo');
            }

            var store = db.createObjectStore('userTodo', {
                keyPath: 'text'
            });
        };

        // Handle successful dataStore2 access.
        datastoreConnection.onsuccess = function(event) {
            // Get a reference to the DB and callback
            dataStore2 = event.target.result;
            callback();
        };

        // handle errors
        datastoreConnection.onerror = user_ToDo.onerror;
    };


    user_ToDo.getuserToDoList = function(callback) {
        var db = dataStore2;
        var transaction = db.transaction(['userTodo'], 'readwrite');
        var objStore = transaction.objectStore('userTodo');
        var cursor = objStore.openCursor(IDBKeyRange.lowerBound(0));


        var toDo = [];
        transaction.oncomplete = function(e) {
            callback(toDo);
        };
        cursor.onsuccess = function(e) {
            var result = e.target.result;

            if (!!result == false) {
                return;
            }
            toDo.push(result.value);
            result.continue();
        };
        cursor.onerror = user_ToDo.onerror;
    };

    user_ToDo.addToDo = function(text, date, callback) {

        var transaction = dataStore2.transaction(['userTodo'], 'readwrite');

        var objectStore = transaction.objectStore('userTodo');

        var entry = {
            'text': text,
            'date': date
        };

        var request = objectStore.put(entry);

        request.onsuccess = function(e) {
            callback(entry);
        };

        request.onerror = user_ToDo.onerror;
    };

    //exporting
    return user_ToDo;
}());



