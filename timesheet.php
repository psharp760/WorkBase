<?php
session_start();

include 'db_connection.php';
$conn = OpenCon();

$uname = $_SESSION['username'];


$getUserInfo = "SELECT *FROM events WHERE evt_uname = '$uname'";

?>

<!DOCTYPE html>
<html>
<head>
  
<link rel="stylesheet" href="style.css">
   <meta charset="utf-8"/>
   <script type="text/javascript" src="timesheet.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <title>Workbase: Timesheet</title>
  <style type = "text/css">
    table {
      border-collapse: collapse;
      width: 100%;
      color: #8D33FF;
      font-family: monospace;
      font-size: 25px;
      text-align: left;
    }
    th {
      background-color: #8D33FF;
      color: white;
    }
    
    tr:nth-child(even) {background-color: #f2f2f2}
    </style>
    
  </head>
 <body>

   <header>
      <img  src="images/logo.png" alt="logo" id="logo_img">

      <div class="nav-container">
         <ul id="nav">
            <li><img src="images/calendar-icon.png" id="icon-nav"><a href="3a-calendar.php">Calendar</a></li>
            <li><img src="images/timesheet-icon.png" id="icon-nav"><a href="timesheet.php" id="current">Timesheet</a></li>
            <li><img src="images/user-icon.png" id="icon-nav"><a href="profile.php">Profile</a></li>
            <li><img src="images/logout-icon.png" id="icon-nav"><a href="login.php">Logout</a></li>
         </ul>
      </div>
   </header>
   <main>
    <table>
      <tr>
        <th>Date</th>
        <th>Start Time</th>
        <th>End Time</th>
      </tr>
</main>
<?php
if($result =mysqli_query($conn, $getUserInfo)){
  while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    echo "<tr><td>" .$row["evt_start"] . "</td><td>" . $row["evt_startTime"] . "</td><td>" . $row["evt_endTime"] . "</td></tr>";
  }
  echo "</table>";
}
?>
</table>

   </body>
</html>