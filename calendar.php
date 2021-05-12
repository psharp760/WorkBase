<?php
session_start();
$mName = array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
$days = array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sun");
$data = null;
$sDay = 0;
$sMth = 0;
$sYear = 0;
$Mon = false;
$year = Date("Y");
$month = Date("m");

function getCalendar($y,$m,$date)
{
   $curYear = $y;
   $curMonth = $m;
   $unixMonth = mktime(0,0,0,$curMonth,1,$curYear);
   $endDay = date('t',$unixMonth);
   $output = $curMonth." ".$curYear;

   echo $output;
}

function getMthYear($month,$year)
{
$mName = array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
display .= "<div class= 'cal-btns'></div>"
		. "<select id = 'cal-mth'</select>"
		. "<select id = 'cal-yr'</select>"
		. "<input id= 'cal-set' type= 'button' value= 'SET' </input>"

echo $display;
}


include 'db_connection.php';
$con = OpenCon();
?>

<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8" />
    <link rel="stylesheet" href="style.css" />
    <script src="calendar.js"></script>
    <title>Workbase: Calendar</title>
</head>

<body>
    <header>
        <!--Navigation menu on top of calander page-->
        <img src="images/logo.png" alt="logo" id="logo_img">

        <div class="nav-container">
            <ul id="nav">
                <li><img src="images/calendar-icon.png" id="icon-nav"><a href="calendar.html" id="current">Calendar</a></li>
                <li><img src="images/timesheet-icon.png" id="icon-nav"><a href="timesheet.html">Timesheet</a></li>
                <li><img src="images/user-icon.png" id="icon-nav"><a href="profile.html">Profile</a></li>
                <li><img src="images/logout-icon.png" id="icon-nav"><a href="login.html">Logout</a></li>
            </ul>
        </div>
    </header>
    <main>
	<form action="calendar.php" methods="post">
        <div id="cal-wrap">
            <!-- [Date SELECTOR] -->
            <div id="cal-date">
                <select id="cal-mth"></select>
                <select id="cal-yr"></select>
                <input id="cal-set" type="button" value="SET" />
            </div>

            <!-- [CALENDAR] -->
            <div id="cal-container"></div>
			<?php

			?>

            <!-- [EVENT] -->
            <div id="cal-event"></div>

        </div>
    </main>
</body>
</html>
