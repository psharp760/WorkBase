
const monthInString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let cur = 0;

function showTimesheet(i, year, month) {
    document.querySelector('.month-box').innerHTML = monthInString[month-1] + '  ' + year;
    let timesheetHtml = ''
    if(i==0){
        timesheetHtml = createAllTimesheet(year, month);
    } else {
        timesheetHtml = createIndividualUserTimesheet(i, year, month);
    }
    document.querySelector('#timesheet').innerHTML = timesheetHtml;
    document.querySelector('#previous').addEventListener('click', moveTimesheet);
    document.querySelector('#next').addEventListener('click', moveTimesheet);
}



function chooseTimesheet(v){
    //document.querySelector('.month-box').innerHTML = monthInString[month-1] + '  ' + year;

    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if(this.readState==4 && this.status==200){
            document.getElementById("timesheet").innerHTML = this.responseText;
        }
    };
    xml.open("GET", "timesheet.php?q="+v,true);
    xml.send();

    document.querySelector('#timesheet').innerHTML = timesheetHtml;
    document.querySelector('#previous').addEventListener('click', moveTimesheet);
    document.querySelector('#next').addEventListener('click', moveTimesheet);
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
    var m = document.getElementById("monthYear");
    m.value = month.toString() + year.toString();
    //var v = document.getElementById("my-select").value;
    //chooseTimesheet(v);
    //document.querySelector('.month-box').innerHTML = monthInString[month-1] + '  ' + year;
}

function createAllTimesheet(year, month) {
    //const startDate = new Date(year, month-1, 1);
    const endDate = new Date(year, month, 0);
    const endDayCount = endDate.getDate();
  
    let dayCount = 1;
    let timesheetHtml = '';

    timesheetHtml+='<div class="table-contents"><table><thead><tr>'+'<th id="user-head">Employees</th>'

    for(let d=0; d<endDayCount; d++){
        timesheetHtml+='<th id="day-size">'+dayCount+'</th>'
        dayCount++;
    }
    timesheetHtml+='<th id="hour-size">Total</th></tr></thread>'
    var list = makeAllList();
    var all_list = new Array();
    all_list.push(list);

    for(let i=0; i<userData.length; i++) {
        timesheetHtml+='<tr><td class="card"> <img src="'+ userData[i].user_img
                     +'"> <span>' + userData[i].emp_name + '</span></td>'
        var r_total = 0;
        if(all_list.length>0){ // there is data in the all_list
            var cur_id = all_list[0][0].e_id;
            var cur_m = all_list[0][0].month; 
            var cur_indv;
            if(cur_id==i+1 && month==cur_m){ //if there is database for (user id# i) employee
                cur_indv = all_list.shift();
                for(let j=0; j<dayCount-1; j++){
                    if(cur_indv.length>0){
                        var cur_indv_date = cur_indv[0].date;
                        if(cur_indv_date==(j+1)){
                            if(i%2==0){
                                timesheetHtml += '<td id=evenCell>'+cur_indv[0].s_time+' - '+cur_indv[0].e_time+'</td>'
                            }else{
                                timesheetHtml += '<td id=oddCell>'+cur_indv[0].s_time+' - '+cur_indv[0].e_time+'</td>'
                            }
                            r_total += cur_indv[0].total_min;
                            cur_indv.shift();
                        }else{
                            timesheetHtml += '<td></td>'
                        }
                    }else{
                        timesheetHtml += '<td></td>'
                    }
                } 
            }else{
                for(let j=0; j<dayCount-1; j++){
                    timesheetHtml += '<td></td>'
                }  
            }
        }else{ //no database for # i of user id
            for(let j=0; j<dayCount-1; j++){
                timesheetHtml += '<td></td>'
            } 
        }
        var total_hour;
        if(r_total==0){
            total_hour = '00:00';
        }else{
            total_hour = parseInt(r_total/60)+':'+r_total%60;
        }
        timesheetHtml+='<td>'+total_hour+'</td>'+'</tr>' 
    }
    timesheetHtml+='</table></div>'

    return timesheetHtml;
}

showOption();
showTimesheet(cur, year, month);
chooseTimesheet("");
