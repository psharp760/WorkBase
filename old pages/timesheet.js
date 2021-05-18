//user = {firstname, lastname, profilePhoto} but 'User (index)' for this example 
const userData = [{ emp_name:'Employee User 1', user_img:'images/user-icon.png', user_id: 1001},
                  { emp_name:'Work Base', user_img:'images/man1.png', user_id: 1002},
                  { emp_name:'Employee User 3', user_img:'images/user-icon.png', user_id: 1003},
                  { emp_name:'Employee User 4', user_img:'images/user-icon.png', user_id: 1004},
                  { emp_name:'Employee User 5', user_img:'images/user-icon.png', user_id: 1005},
                  { emp_name:'Employee User 6', user_img:'images/user-icon.png', user_id: 1006},
                  { emp_name:'Employee User 7', user_img:'images/user-icon.png', user_id: 1007},
                  { emp_name:'Employee User 8', user_img:'images/user-icon.png', user_id: 1008},
                  { emp_name:'Employee User 9', user_img:'images/user-icon.png', user_id: 1009},
                  { emp_name:'Employee User 10', user_img:'images/user-icon.png', user_id: 1010},
                  { emp_name:'Employee User 11', user_img:'images/user-icon.png', user_id: 1011},
                  { emp_name:'Employee User 12', user_img:'images/user-icon.png', user_id: 1012},
                  { emp_name:'Employee User 13', user_img:'images/user-icon.png', user_id: 1013},
                  { emp_name:'Employee User 14', user_img:'images/user-icon.png', user_id: 1014},
                  { emp_name:'Employee User 15', user_img:'images/user-icon.png', user_id: 1015},
                  { emp_name:'Employee User 16', user_img:'images/user-icon.png', user_id: 1016}];
const timesheetDatabase = [{emp_name:'Work Base', start_time:'2021.4.1.7:30', end_time:'2021.4.1.11:45', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.2.12:45', end_time:'2021.4.2.17:30', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.3.8:30', end_time:'2021.4.3.14:00', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.4.6:30', end_time:'2021.4.4.11:00', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.7.12:00', end_time:'2021.4.7.16:45', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.15.13:30', end_time:'2021.4.15.17:45', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.16.5:15', end_time:'2021.4.16.11:15', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.17.12:30', end_time:'2021.4.17.19:30', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.18.7:30', end_time:'2021.4.18.11:45', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.19.13:00', end_time:'2021.4.19.18:45', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.21.14:00', end_time:'2021.4.21.20:45', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.22.11:30', end_time:'2021.4.22.19:45', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.25.11:30', end_time:'2021.4.25.17:45', user_id: 1002},
                           {emp_name:'Work Base', start_time:'2021.4.29.5:30', end_time:'2021.4.29.12:45', user_id: 1002}];


const monthInString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayInString = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeInString = [' AM', ' PM'];
const leftTh = ['Date', 'Day', 'Total'];
const timeSeparation = ['00', '15', '30', '45'];
const timeHour = ['4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 AM','1 AM','2 AM','3 AM',]

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let cur = 0;

class TimesheetSchedule {
    constructor(i, m, d, start, end, t) {
        this.e_id = i;
        this.month = m;
        this.date = d;
        this.s_time = start;
        this.e_time = end;
        this.total_min = t;
    }
}
function timeCalc(i, s, e){
    var id = i;
    var m = parseInt(s.split('.')[1]);
    var d = parseInt(s.split('.')[2]);
    var st = s.split('.')[3];
    var et = e.split('.')[3];
    var s_hour = parseInt(s.split('.')[3].split(':')[0]);
    var s_min = parseInt(s.split('.')[3].split(':')[1]);
    var s_time = s_hour*60 + s_min;
    var e_hour = parseInt(e.split('.')[3].split(':')[0]);
    var e_min = parseInt(e.split('.')[3].split(':')[1]);
    var e_time = e_hour*60 + e_min;
    var t = e_time-s_time;
    var newTimesheetSchedule = new TimesheetSchedule(id, m, d, st, et, t);

    return newTimesheetSchedule;
}
function makeAllList(){
    var all_list = new Array(); 
    for(let i=0; i<timesheetDatabase.length; i++){
        var num = timesheetDatabase[i].user_id - 1000;
        var t_ob = timeCalc(num, timesheetDatabase[i].start_time, timesheetDatabase[i].end_time);
        //var d = t_ob.date;
        all_list.push(t_ob);
    }
    return all_list;
}
function makeIndividualList(){
    var list = new Array();
    for(let i=0; i<timesheetDatabase.length; i++){
        var num = timesheetDatabase[i].user_id - 1000;
        var t_ob = timeCalc(num, timesheetDatabase[i].start_time, timesheetDatabase[i].end_time);
        list.push(t_ob);
    }
    return list;
}
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
            var t = document.createTextNode(userData[i].emp_name);
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


function createIndividualUserTimesheet(e_id, year, month) {
    const startDate = new Date(year, month-1, 1);
    const endDate = new Date(year, month, 0);
    const endDayCount = endDate.getDate();
    const day = startDate.getDay();
    // for col span 
 
    let timesheetHtml = '';
    timesheetHtml += '<div id="table2" class="table2-contents"><table><thead>' 
    for (let i=0; i<2; i++) {
        timesheetHtml += '<tr>'
        //1st row
        if(i==0) {
            timesheetHtml += '<th colspan="3" id="left-size"></th>'
            for(let k=0; k<timeHour.length; k++) {
                timesheetHtml += '<th colspan="4" id="time-size">'+timeHour[k];
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

    var user = userData[e_id-1];
    var cur_user_id = user.user_id-1000;
    var list = makeIndividualList();

    for(let i=0; i<endDayCount; i++) {
        timesheetHtml += '<tr><td id="sub-left-height">'+month+"/"+(i+1)+'</td>'
                      +'<td id="sub-left-height">'+dayInString[(day+i)%7]+'</td>'
        if(list.length>0&&cur_user_id==list[0].e_id&&list[0].month==month){
            if(i+1==list[0].date){
                var ht, mt;
                var h = parseInt(list[0].total_min/60);
                var m = list[0].total_min%60;
                if(h<10){
                    ht = '0'+ h.toString();
                }else{
                    ht = h.toString;
                }
                if(m<10){
                    mt = '0'+ m.toString();
                }else{
                    mt = m.toString();
                }
                timesheetHtml +='<td id="sub-left-height">'+ ht+':'+mt+'</td>'
                var s = list.shift();
                var c_span = s.total_min/15;
                var st = (parseInt(s.s_time.split(':')[0]*60)+s.s_time.split(':')[1]%60)/15;
                for(let j=0; j<96; j++){
                    if(j+16==st){
                        if(m<1){
                            timesheetHtml+='<td id="time-bar" colspan="'+c_span+'">'+h+' hour</td>'
                        }else{
                            timesheetHtml+='<td id="time-bar" colspan="'+c_span+'">'+h+' hour '+m+' min'+'</td>'
                        }
                        j+=c_span;
                    }else{
                        timesheetHtml+= '<td></td>'    
                    }                
                }
            }else{
                for(let j=0; j<96; j++){
                    timesheetHtml+= '<td></td>'    
                }
            }   
        }else{
            for(let j=0; j<96; j++) {
                timesheetHtml+= '<td></td>'
            } 
        }
    }

    timesheetHtml += '</table></div>'

    return timesheetHtml ;
}
showOption();
showTimesheet(cur, year, month);
