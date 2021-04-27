<?php 
session_start();
?>
<!DOCTYPE html>
<html>
<head>
   <link rel="stylesheet" href="style.css">
   <meta charset="utf-8" />
</head>
<body>
   <header>
      <img  src="images/logo.png" alt="logo" id="logo_img">

      <div class="nav-container">
         <ul id="nav">
            <li><img src="images/calendar-icon.png" id="icon-nav"><a href="calendar.php">Calendar</a></li>
            <li><img src="images/timesheet-icon.png" id="icon-nav"><a href="timesheet.php" id="current">Timesheet</a></li>
            <li><img src="images/user-icon.png" id="icon-nav"><a href="profile.php">Profile</a></li>
            <li><img src="images/logout-icon.png" id="icon-nav"><a href="login.php">Logout</a></li>
         </ul>
      </div>
   </header>
<main>
   
<div class="monthly-container">
   <p class="select-option"> Employee: 
      <select id="my-select" name="employee-options" onchange="chooseTimesheet(this.value)">
      <?php
      include 'db_connection.php';
      $con = OpenCon();
      mysqli_select_db($con, "users");
      $sql = "SELECT first_name, last_name FROM users";
      $result = mysqli_query($con, $sql);
      mysqli_select_db($con, "timesheet");
      $sql = "SELECT * FROM timsheet";
      $res = mysqli_query($con, $sql);
      
      echo "<option value='' selected>all</option>";
      while($row = mysqli_fetch_array($result)){
           echo "<option value ='".$row['user_id']."'>".$row['first_name']." ".$row['last_name']."</option>"; 
      }
      ?>
      </select>
   </p>
   <button id="previous" type="button" class="previousButton"></button>
   <div class="month-box"></div>
   <button id="next" type="button" class="nextButton"></button> 
</div>
<div id="timesheet"></div>
<script src="timesheet.js"></script>
<?php
$q = intval($_GET['q']);

mysqli_select_db($con, "users");
$sql = "SELECT user_id, first_name, last_name FROM users";
$result = mysqli_query($con, $sql);

mysqli_select_db($con, "timesheet");
$sql = "SELECT * FROM timesheet";
$res = mysqli_query($con, $sql);

if($q==""){ //All timesheet
   echo "<div class='table-contents'> <table> <thead> <tr> 
         <th id='user-head'>Employees</th>";

   
   while($row = mysqli_fetch_array($result)){
      
   }
   $sql = "SELECT * FROM timesheet WHERE id = '".$q."'";

}else{ // Individual timesheet
   $sql = "SELECT * FROM timesheet WHERE id = '".$q."'";
}
//'2021.4.1.7:30'
function timeCalc($time){
   $timearr = split("\.", $time);
   $hour = intval($timearr[0]);
   $min = intval($timearr[1]);
}

Close($con);
?>
</main>
</body>
</html>
