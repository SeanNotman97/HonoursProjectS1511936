//https://developers.google.com/web/ilt/pwa/working-with-indexeddb
//https://blog.teamtreehouse.com/create-your-own-to-do-app-with-html5-and-indexeddb
//https://www.tutorialspoint.com/html5/html5_indexeddb.htm
//https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

var bookingsDB = (function() {
  var bookingsCollection = {};
  var datastore = null;


  //connection to indexeddb open
  bookingsCollection.open = function(callback) {

    var version = 1;

    //datastore connection
    var datastoreConnection = indexedDB.open('userBookings', version);

    //new version upgrade
    datastoreConnection.onupgradeneeded = function(event) {
      var db = event.target.result;

      event.target.transaction.onerror = bookingsCollection.onerror;

      // Delete the old datastore.
      if (db.objectStoreNames.contains('booking')) {
        db.deleteObjectStore('booking');
      }

      var store = db.createObjectStore('booking', {
        keyPath: 'text'
      });
    };

    // Handle successful datastore access.
    datastoreConnection.onsuccess = function(event) {
      // Get a reference to the DB.
      datastore = event.target.result;

      // Execute the callback.
      callback();
    };

    // Handle errors when opening the datastore.
    datastoreConnection.onerror = bookingsCollection.onerror;
  };


  bookingsCollection.getBookings = function(callback) {
    var db = datastore;
    var transaction = db.transaction(['booking'], 'readwrite');
    var objStore = transaction.objectStore('booking');
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);
    var userBookings = [];

    transaction.oncomplete = function(e) {
      // Execute the callback function.
      callback(userBookings);
    };
    cursorRequest.onsuccess = function(e) {
      var result = e.target.result;

      if (!!result == false) {
        return;
      }
      userBookings.push(result.value);
      result.continue();
    };
    cursorRequest.onerror = bookingsCollection.onerror;
  };

  bookingsCollection.createBooking = function(text, date, callback) {

    //getting the database
    var db = datastore;

    // database transaction
    var transaction = db.transaction(['booking'], 'readwrite');

    var objectStore = transaction.objectStore('booking');

    //creating a booking object
    var booking = {
      'text': text,
      'date': date

    };

    //datastore request
    var request = objectStore.put(booking);

    //successful datastore put
    request.onsuccess = function(e) {
      callback(booking);
    };

    //error handling
    request.onerror = bookingsCollection.onerror;
  };

  //exporting bookingCollections
  return bookingsCollection;
}());



