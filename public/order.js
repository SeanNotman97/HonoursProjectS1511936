//https://firebase.google.com/docs/reference/js/firebase.database.Reference
//submitting reservation to firebase
function submitReservation(e){

  //prevents submit refreshing page
    e.preventDefault();

    //getting the user elements from form inputs by id
    var event = document.getElementById('event').value;
    var date = document.getElementById('date').value;
    var reservation_name = document.getElementById('user_name').value;
    var reservation_email = document.getElementById('reserve_email').value;
    var reservation_id = firebase.database().ref().child('reservation').push().key;

    //defining the data to be put into the database
    var data = {
        uid: reservation_id,
        user_name: reservation_name,
        user_email: reservation_email,
        event: event,
        date: date
    }

    //declaring the reservation object to be sent
    var reservationDetails = {};

    //putting the data into database by id
    reservationDetails['/reservation/' + reservation_id] = data;

    firebase.database().ref().update(reservationDetails);
    console.log('Reservation created');
}


var tblUsers = document.getElementById('tbl_users_list');
var reservationRef = firebase.database().ref('reservation/');
var rowIndex = 1;

reservationRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = tblUsers.insertRow(rowIndex);
        var table_reservation = row.insertCell(0);
        var table_name = row.insertCell(1);
        var table_cell = row.insertCell(2);
        var table_email = row.insertCell(3);

        table_reservation.appendChild(document.createTextNode(childKey));
        table_name.appendChild(document.createTextNode(childData.user_name));
        table_cell.appendChild(document.createTextNode(childData.date));
        table_email.appendChild(document.createTextNode(childData.user_email));

        rowIndex = rowIndex + 1;
    });
});





var tblContacts = document.getElementById('table_contacts');
var reservationRefContacts = firebase.database().ref('contactus/');
var rowIndex2 = 1;


reservationRefContacts.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = tblContacts.insertRow(rowIndex2);
        var table_reservation = row.insertCell(0);
        var contact_table = row.insertCell(1);
        var table_cell = row.insertCell(2);
        var table_comment = row.insertCell(3);

        table_reservation.appendChild(document.createTextNode(childKey));
        contact_table.appendChild(document.createTextNode(childData.user_name));
        table_cell.appendChild(document.createTextNode(childData.user_email));
        table_comment.appendChild(document.createTextNode(childData.comment));

        rowIndex2 = rowIndex2+ 1;
    });
});






