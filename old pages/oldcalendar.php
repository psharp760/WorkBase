﻿<?php

session_start();


include 'db_connection.php';
$conn = OpenCon();

$uname = $_SESSION['username'];

$getUserInfo = "SELECT *FROM users WHERE username = '$uname'";
$result = mysqli_query($conn, $getUserInfo);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
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
                <li><img src="images/user-icon.png" id="icon-nav"><a href="profile.php">Profile</a></li>
                <li><img src="images/logout-icon.png" id="icon-nav"><a href="logout.php">Logout</a></li>
            </ul>
        </div>
    </header>
    <main>
        <div id="cal-wrap">
            <!-- [Date SELECTOR] -->
            <div id="cal-date">
                <select id="cal-mth"></select>
                <select id="cal-yr"></select>
                <input id="cal-set" type="button" value="SET" />
            </div>

            <!-- [CALENDAR] -->
            <div id="cal-container"></div>

            <!-- [EVENT] -->
            <div id="cal-event"></div>
        </div>
    </main>
</body>
</html>
