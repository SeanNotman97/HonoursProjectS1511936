window.onload = function() {
  //each time the event page window is loaded the up to date my bookings is called
  bookingsDB.open(updateUserBookings);
  //For each event the relevant info is put into the indexeddb to show the user their bookings while offline
  //when user clicks the summer sessions
  addSummerSessions.onclick = function () {
    var text = "Summer Sessions";
    var date = document.getElementById('date').value;
    {
      submitReservation(event);
      //creating object with text and the user selected input
      bookingsDB.createBooking(text, date, function(booking) {
        //returned each time to update the page
        updateUserBookings();
      });
    }
    return false;
  };
  //repeated for the other event bookings

  cleanUp.onclick = function() {
    var text = "Kelvingrove Clean up";
    var date = "2019-04-19";
    {
      submitReservationModal2(event);
      bookingsDB.createBooking(text, date, function(booking) {
        updateUserBookings();
      });
    }
    return false;
  };

  natureWalk.onclick = function() {
    var text = "Nature Walk";
    var date = "2019-06-15";
    {
      submitReservationModal3(event);
      bookingsDB.createBooking(text, date, function(booking) {
        updateUserBookings();
      });
    }
    return false;
  };
}

//called when each booking is created to update the booking list on the events page
function updateUserBookings() {

  //fetches the bookings
  bookingsDB.getBookings(function(userBookings) {

    //appends it to table
    var bookingList = document.getElementById('booking_table');
    bookingList.innerHTML = '';

    //for every booking in the database
    for(var i = 0; i < userBookings.length; i++) {


      var booking = userBookings[(userBookings.length - 1 - i)];

      //creates the list
      var li2 = document.createElement('li');
      var span2 = document.createElement('span');
      span2.innerHTML = booking.text + "<br />" + booking.date;

      li2.appendChild(span2);
      bookingList.appendChild(li2);

    }

  });
}
