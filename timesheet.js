//user = {firstname, lastname, profilePhoto} but 'User (index)' for this example 
const userData = [['Employee User 1', 'images/user-icon.png'],
                  ['Employee User 2', 'images/man1.png'],
                  ['Employee User 3', 'images/calendar-icon.png'],
                  ['Employee User 4', 'images/timesheet-icon.png'],
                  ['Employee User 5', 'images/key-icon.png'],
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
const user1 = [''];
const totalTime = [8, '', 9, 12, '', 5];

const monthInString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayInString = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeInString = [' AM', ' PM'];
const leftTh = ['Date', 'Day', 'Total'];
const timeSeparation = ['00', '15', '30', '45'];

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

    timesheetHtml += '<div class="table-contents"> <table> <thead> <tr>' + '<th id="user-head">Employees</th>'

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
    timesheetHtml += '</table></div>'

    return timesheetHtml;
}


function createIndividualUserTimesheet(i, year, month) {
    const startDate = new Date(year, month-1, 1);
    const endDate = new Date(year, month, 0);
    const endDayCount = endDate.getDate();
    const day = startDate.getDay();
    // for col span 
    var num_time = 4;

    let dayCount = 1;
    let timesheetHtml = '';
    timesheetHtml += '<div id="table2" class="table2-contents"><table><thead>' 
    for (let i=0; i<2; i++) {
        timesheetHtml += '<tr>'
        //1st row
        if(i==0) {
            timesheetHtml += '<th colspan="3" id="left-size"></th>'
            for(let k=0; k<24; k++) {
                timesheetHtml += '<th colspan="4" id="time-size">'
                if(k===0) {
                    timesheetHtml += (k+12)+timeInString[0]+'</th>';
                } else if(k<12) {
                    timesheetHtml += k+timeInString[0]+'</th>';
                } else if(k===12) {
                    timesheetHtml += k+timeInString[1]+'</th>';
                } else {
                    timesheetHtml += (k-12)+timeInString[1]+'</th>';
                }    
            }
        }  else {
            for(let l=0; l<3; l++) {
                timesheetHtml += '<td id="sub-left-size">'+ leftTh[l]+'</td>'
            }
            for(let m=0; m<96; m++) {
                timesheetHtml += '<td id="min-size">'+ timeSeparation[m%4]+'</td>'
            }
        } 
        timesheetHtml += '</tr>'
    }
    timesheetHtml += '</thead>'
    
    for(let i=0; i<endDayCount; i++) {
        var cur = i;
        timesheetHtml += '<tr><td id="sub-left-height">'+month+"/"+(i+1)+'</td>'
                      +'<td id="sub-left-height">'+dayInString[(day+i)%7]+'</td>'
                      +'<td id="sub-left-height">'+displayTotalTime(totalTime[i%6])+'</td>'
        for(let j=0; j<96; j++) {
            if(totalTime[i%6]!=0 && cur==i){
                var c_span = totalTime[i%6]*4;
                timesheetHtml+='<td id="time-bar" colspan="'+c_span+'">'+totalTime[i%6]+' hour</td>'
                cur++;    
            }
            timesheetHtml+= '<td></td>'
        } 
    }

    timesheetHtml += '</table></div>'

    return timesheetHtml ;
}
function displayTotalTime(n){
    if(n==0){
        return ''
    }else if(n<10){
        return '0'+n+':00'
    }else{
        return n+':00'
    }
}
showOption();
showTimesheet(cur, year, month);
