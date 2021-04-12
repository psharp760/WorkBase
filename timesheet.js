//user = {firstname, lastname, profilePhoto} but 'User (index)' for this example 
const userData = [['Employee User 1', 'images/user-icon.png'],
                  ['Employee User 2', 'images/user-icon.png'],
                  ['Employee User 3', 'images/user-icon.png'],
                  ['Employee User 4', 'images/user-icon.png'],
                  ['Employee User 5', 'images/user-icon.png'],
                  ['Employee User 6', 'images/user-icon.png'],
                  ['Employee User 7', 'images/user-icon.png'],
                  ['Employee User 8', 'images/user-icon.png'],
                  ['Employee User 9', 'images/user-icon.png'],
                  ['Employee User 10', 'images/user-icon.png'],
                  ['Employee User 11', 'images/user-icon.png'],
                  ['Employee User 12', 'images/user-icon.png'],
                  ['Employee User 13', 'images/user-icon.png'],
                  ['Employee User 14', 'images/user-icon.png'],
                  ['Employee User 15', 'images/user-icon.png'],
                  ['Employee User 16', 'images/user-icon.png'],
                  ['Employee User 17', 'images/user-icon.png'],
                  ['Employee User 18', 'images/user-icon.png'],
                  ['Employee User 19', 'images/user-icon.png'],];

const monthInString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayInString = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let cur = 0;

function showTimesheet(i, year, month) {
    document.querySelector('.month-box').innerHTML = monthInString[month-1] + '  ' + year;
    let timesheetHtml = '';
    if(i==0){
        timesheetHtml = createAllTimesheet(year, month);
    } else {
        timesheetHtml = createIndividualUserTimesheet(i, year, month);
    }
    document.querySelector('#timesheet').innerHTML = timesheetHtml;
    document.querySelector('#previous').addEventListener('click', moveTimesheet);
    document.querySelector('#next').addEventListener('click', moveTimesheet);
}

function showOption() {
    var count = document.getElementById("my-select").options.length;
    if(userData.length > 0 && count < userData.length+1)
    {
        var x = document.createElement("option");
        x.setAttribute("value", "0");
        var t = document.createTextNode("all");
        x.appendChild(t);
        document.getElementById("my-select").appendChild(x);

        for (let i=0; i<userData.length; i++) {
            let num = i+1; 
            var x = document.createElement("option");
            x.setAttribute("value", num.toString());
            var t = document.createTextNode(userData[i][0]);
            x.appendChild(t);
            document.getElementById("my-select").appendChild(x);
        }
    }
}
function chooseTimesheet(){
    var my_option = document.querySelector('#my-select').value;
    var num = parseInt(my_option);
    cur = num;
    showTimesheet(num, year, month);
}

function moveTimesheet(e) {
    if(e.target.id === 'previous') {
        month--;
        if(month<1) {
            year--;
            month = 12;
        }
    }
    if(e.target.id === 'next') {
        month++;
        if(month>12) {
            year++;
            month = 1;
        }
    }
    showTimesheet(cur, year, month)
    document.querySelector('.month-box').innerHTML = monthInString[month-1] + '  ' + year;
}

function createAllTimesheet(year, month) {
    //const startDate = new Date(year, month-1, 1);
    const endDate = new Date(year, month, 0);
    const endDayCount = endDate.getDate();
  
    let dayCount = 1;
    let timesheetHtml = '';

    timesheetHtml += '<thead> <tr>' + '<th id="user-size">Employees</th>'

    for(let d=0; d<endDayCount; d++){
        timesheetHtml  += '<th id="day-size">' +  dayCount + '</th>'
        dayCount++;
    }
    timesheetHtml += '<th id="hour-size">Total</th> </tr> </thread>'

    // Create the all users card with profile photo & name.
    for(let row=0; row<userData.length; row++) {
        timesheetHtml += '<tr><td class="card"> <img src="'+ userData[row][1] 
                      + '"> <span>' + userData[row][0] + '</span></td>'
        // Example data which will be removed once actual database is created.
        for(let col=0; col<dayCount-1; col++)
        {
            if(row%2 == 0) {
                timesheetHtml += '<td id=evenCell>8AM-3PM</td>'
            }
            else {
                timesheetHtml += '<td id=oddCell>8AM-3PM</td>'
            }
        }  
        timesheetHtml += '<td>150 hrs</td>'+ '</tr>'
    }
    return timesheetHtml;
}


function createIndividualUserTimesheet(i, year, month) {
    //const startDate = new Date(year, month-1, 1);
    const endDate = new Date(year, month, 0);
    const endDayCount = endDate.getDate();

    let dayCount = 1;
    let timesheetHtml = '';

    timesheetHtml += '<thead> <tr>' 
                  + '<th id="user-size">'+ userData[i-1][0] +'</th>'

    for(let d=0; d<endDayCount; d++){
        timesheetHtml  += '<th id="day-size">' +  dayCount + '</th>'
        dayCount++;
    }
    timesheetHtml += '<th id="hour-size"></th> </tr> </thread>'


    return timesheetHtml ;
}

showOption();
showTimesheet(cur, year, month);
