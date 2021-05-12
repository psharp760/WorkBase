
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let cur = 0;

function chooseTimesheet(v){
    //document.querySelector('.month-box').innerHTML = monthInString[month-1] + '  ' + year;
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if(this.readState==4 && this.status==200){
            document.getElementById("timesheet").innerHTML = this.responseText;
        }
    };
    xml.open("GET", "timesheet.php?q="+v, true);
    xml.send();

    //document.querySelector('#timesheet').innerHTML = timesheetHtml;
    //document.querySelector('#previous').addEventListener('click', moveTimesheet);
    //document.querySelector('#next').addEventListener('click', moveTimesheet);
}
$(document).ready(function(){
    $("button").onclick(function(){
        $.post("timesheet.php", function(){
            alert("success!");
        });
    });
});
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
    $.post("timesheet.php", {month: month, year: year},
    function(data){
        alert( "success");
        $('#monthYear').html(data);
    });

    //var m = document.getElementById("monthYear");
    //m.value = month.toString() + year.toString();
    //var v = document.getElementById("my-select").value;
    //chooseTimesheet(v);
    //document.querySelector('.month-box').innerHTML = monthInString[month-1] + '  ' + year;
}


//showOption();
//showTimesheet(cur, year, month);
//chooseTimesheet("");
