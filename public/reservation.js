//https://firebase.google.com/docs/reference/js/firebase.database.Reference

function submitReservation(e){
    e.preventDefault();

    var event = document.getElementById('event').value;
    var date = document.getElementById('date').value;
    var reservation_name = document.getElementById('user_name').value;
    var reservation_email = document.getElementById('reserve_email').value;
    var reservation_id = firebase.database().ref().child('reservation').push().key;

    var data = {
        uid: reservation_id,
        user_name: reservation_name,
        user_email: reservation_email,
        event: event,
        date: date
    }

    var reservationDetails = {};
    reservationDetails['/reservation/' + reservation_id] = data;
    firebase.database().ref().update(reservationDetails);
    console.log('Reservation created');
}

function submitReservationModal2(e){
    e.preventDefault();

    var event = document.getElementById('event2').value;
    var date = document.getElementById('date2').value;
    var reservation_name = document.getElementById('user_name2').value;
    var reservation_email = document.getElementById('reserve_email2').value;
    var reservation_id = firebase.database().ref().child('reservation').push().key;

    var data = {
        uid: reservation_id,
        user_name: reservation_name,
        user_email: reservation_email,
        event: event,
        date: date
    }

    var reservationDetails = {};
    reservationDetails['/reservation/' + reservation_id] = data;
    firebase.database().ref().update(reservationDetails);
    console.log('Reservation created');
}


function submitReservationModal3(e){
    e.preventDefault();

    var event = document.getElementById('event3').value;
    var date = document.getElementById('date3').value;
    var reservation_name = document.getElementById('user_name3').value;
    var reservation_email = document.getElementById('reserve_email3').value;
    var reservation_id = firebase.database().ref().child('reservation').push().key;

    var data = {
        uid: reservation_id,
        user_name: reservation_name,
        user_email: reservation_email,
        event: event,
        date: date
    }

    var reservationDetails = {};
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


function updateReservation(){

    var reservation_id = document.getElementById('reservation_id').value;
    //var event = document.getElementById('event').value;
    var date = document.getElementById('date').value;
    var reservation_name = document.getElementById('user_name').value;
    var reservation_email = document.getElementById('reserve_email').value;

    var data = {
        uid: reservation_id,
        user_name: reservation_name,
        user_email: reservation_email,
        event: event,
        date: date
    }

    var reservationUpdate = {};
    reservationUpdate['/reservation/' + reservation_id] = data;
    firebase.database().ref().update(reservationUpdate);

    alert('The user is updated successfully!');

}

function deleteReservation(){
    var user_id = document.getElementById('reservation_id').value;

    firebase.database().ref().child('/reservation/' + user_id).remove();
    alert('The user is deleted successfully!');
}


function submitComment(e){
    e.preventDefault();

    var comment_name = document.getElementById('user_name').value;
    var comment_content = document.getElementById('comment').value;
    var reservation_id = firebase.database().ref().child('comments1').push().key;

    var data = {
        uid: reservation_id,
        comment_name: comment_name,
        comment_content: comment_content
    }

    var reservationDetails = {};
    reservationDetails['/comments1/' + reservation_id] = data;
    firebase.database().ref().update(reservationDetails);
    console.log('Comment created');
}


var commentsTable = document.getElementById('comments_table');
var commentRef = firebase.database().ref('comments1/');
var commentTableIndex = 1;

commentRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();



        var li = document.createElement('li');
        var span = document.createElement('span');
        span.innerHTML = "Name:" + "<br />" + childData.comment_name + "<br />" + "Comment:" + "<br />" + childData.comment_content;
        li.appendChild(span);
        commentsTable.appendChild(li);

        //  var row = commentsTable.insertRow(commentTableIndex);
        //  var table_name = row.insertCell(0);
        //  var table_email = row.insertCell(1);

        //  table_name.appendChild(document.createTextNode(childData.user_name));
        //  table_email.appendChild(document.createTextNode(childData.user_email));

        commentTableIndex = commentTableIndex + 1;
    });
});


function submitArticle(e){
    e.preventDefault();
    var article_name = document.getElementById('article_name').value;
    var article_content = document.getElementById('article_content').value;
    var article_id = firebase.database().ref().child('articles').push().key;
    var data = {
        uid: article_id,
        article_name: article_name,
        article_content: article_content
    }
    var articleDetails = {};
   articleDetails['/articles/' + article_id] = data;
    firebase.database().ref().update(articleDetails);
    console.log('Article created');
}


var articleTable = document.getElementById('article_table');
var articleRef = firebase.database().ref('articles/');
articleRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var li1 = document.createElement('li');
        var span1 = document.createElement('span');
        span1.innerHTML = "<br />" + "<h2>" + childData.article_name + "</h2>" + "<br />" + "<p>" + childData.article_content + "</p>";
        li1.appendChild(span1);
        articleTable.appendChild(li1);
    });
});


function submitHelp(e){
    e.preventDefault();

    //var event = document.getElementById('event').value;
    //var date = document.getElementById('date').value;
    var reservation_name = document.getElementById('user_name').value;
    var reservation_email = document.getElementById('reserve_email').value;
    var comment = document.getElementById('comment').value;
    var reservation_id = firebase.database().ref().child('contactus').push().key;

    var data = {
        uid: reservation_id,
        user_name: reservation_name,
        user_email: reservation_email,
        comment: comment
        //  date: date
    }

    var reservationDetails = {};
    reservationDetails['/contactus/' + reservation_id] = data;
    firebase.database().ref().update(reservationDetails);
    console.log('Reservation created');
}

