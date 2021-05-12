<?php 
session_start();

$year = date("Y");
$month = date("m");

function getMonthYear($month, $year){
   $monthInString = array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
   $display .= "<div class='monthly-btns'></div>"
            . "<button id='previous' type='submit' class='previousButton' name='previous' onclick='moveTimesheet(this.id)'></button>"
            . "<div class='month-box' id='monthYear'>".$monthInString[$month-1]." ".$year."</div>"
            . "<button id='next' type='submit' class='nextButton' name='next' onclick='moveTimesheet(this.id)'></button>"
            . "</div></form>";
   echo $display;
}
function IndividualTimesheet($month, $year, $q){
   $timeHour = array("4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM","12 AM","1 AM","2 AM","3 AM");
   $leftTh = array("Date", "Day", "Total");
   $timeSeparation = array("00", "15", "30", "45");
   $dayInString = array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"); 
   $endDayCount = cal_days_in_month(CAL_GREGORIAN, $month, $year);
   $startDay = date('w', strtotime($year.'-'.$month.'-1'));
   $display = "";
   global $con; 
   
   $display .= "<div id='table2' class='table2-contents'><table><thead>";
   for($i=0; $i<2; $i++){
      $display .= "<tr>";
      if($i===0){
         $display .= "<th colspan='3' id='left-size'></th>";
         for($k=0; $k<count($timeHour); $k++){
            $display .= "<th colspan='4' id='time-size'>".$timeHour[$k];
         }
      }else{
         for($l=0; $l<3; $l++){
            $display .= "<td id='sub-left-size'>".$leftTh[$l]."</td>";
         }
         for($m=0; $m<96; $m++){
            $display .= "<td id='min-size'>".$timeSeparation[$m%4]."</td>";
         }
      }
      $display .= "</tr>";
   }
   $display .= "</thead>";

   //mysqli_select_db($con, "timesheet");
   //$sql = "SELECT DAY(start_time) AS sDay, 
                  //FORMAT(start_time, 'HH') AS sHour, 
                  //FORMAT(start_time, 'mm') AS sMin, 
                  //DATEDIFF(minute, start_time, end_time) AS workMin
           //FROM timesheet WHERE id = '".$q."' AND start_time = '".$year."-".$month."' 
           //ORDER BY start_time";
   //$res = mysqli_query($con, $sql);
   //$resCount = mysqli_num_rows($res);

   for($i=0; $i<$endDayCount; $i++){
      $display .= "<tr><td id='sub-left-height'>".$month."/".($i+1)."</td> 
            <td id='sub-left-height'>".$dayInString[($startDay+$i)%7]."</td>";
      //if($resCount>0){ // Data in the database
         //while($row = mysqli_fetch_array($res)){
            //if(($i+1)===intval($row['sDay'])){
               //$workMin = intval($row['workMin']);
               //$wHour = floor($workMin/60);
               //$wMin = $workMin%60;
               //$display .= "<td id='sub-left-height'>".$wHour.":".$wMin."</td>";
               
               //$span = round($workMin/15);
               //$sInMin = floor(intval($row['sHour'])/60) + intval($row['sMin'])%60;
               //for($j=0; $j<96; $j++){
                  //if((j+16)===$sInMin){
                     //if($wMin<1){
                        //$display .= "<td id='time-bar' colspan='".$span."'>".$wHour." hour</td>";
                     //}else{
                        //$display .= "<td id='time-bar' colspan='".$span."'>".$wHour." hour '".$wMin." min</td>";
                     //}
                     //$j+=$span;
                  //}else{
                     //$display .= "<td></td>";
                  //}
               //}
            //}else{
               //for($j=0; $j<96; $j++){
                  //$display .= "<td></td>";
               //}
            //}
         //}
      //}else{ // No data
         for($j=0; $j<97; $j++){
            $display .= "<td></td>";
         }
      //}
   }
   $display .= "</table></div>";

   echo $display;
}
function AllTimesheet($month, $year){
   global $con; 
   $display = "";
   $endDayCount = cal_days_in_month(CAL_GREGORIAN, $month, $year);

   $display .= "<div class='table-contents'> <table> <thead> <tr> 
         <th id='user-head'>Employees</th>";

   for($i=1; $i<$endDayCount+1; $i++){
      $display .= "<th id='day-size'>".$i."</th>";
   }
   $display .= "<th id='hour-size'>Total</th></tr></thread>";
   $count=0;

   if($resCount>0){
      while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
         $display .= "<tr><td class='card'> <img src='".$row['user_img']."'><span>".$row['first_name']." ".$row['last_name']."</span></td>";
         $curId = $row['user_id'];
         $isql = "SELECT DAY(start_time) AS sDay, 
                         FORMAT(start_time, 'HH-mm') AS start_hour_min,  
                         FORMAT(end_time, 'HH-mm') AS end_hour_min, 
                         DATEDIFF(minute, start_time, end_time) AS workMin 
                  FROM timesheet WHERE id = '".$curId."' AND start_time = '".$year."-".$month."'";
         $ires = mysqli_query($con, $isql);
         $iresCount = mysqli_num_rows($ires);
         $total=0;
         if($iresCount>0){
            while($irow = mysqli_fetch_array($ires, MYSQLI_ASSOC)){
               for($j=0; $j<$endDayCount+1; $j++){
                  if(intval($irow['sDay'])===($j+1)){
                     if($count%2===0){
                        $display .= "<td id=evenCell>".$irow['start_hour_min']." - ".$irow['end_hour_min']."</td>";
                     }else{
                        $display .= "<td id=oddCell>".$irow['start_hour_min']." - ".$irow['end_hour_min']."</td>";
                     }
                     $total+=intval($irow['workMin']);
                  }else{
                     $display .= "<td></td>";
                  }
               }  
            }
         }else{
            for($j=0; $j<$endDayCount+1; $j++){
               $display .= "<td></td>";
            }
         }
         if($total===0){
            $total_display = "00:00"; 
         }else{
            $total_display = floor($total/60).":".($total%60);
         }
         $display .= "<td>".$total_display."</td></tr>";  
      }
      if($resCount<11){
         for($k=0; $k<(11-$resCount); $k++){
            $display .= "<tr><td class='card'><span></span></td>";
            for($j=0; $j<$endDayCount+1; $j++){
               $display .= "<td></td>";
            }
            $display .= "<td></td></tr>"; 
         }
      }
   }else{
      for($k=0; $k<11; $k++){
         $display .= "<tr><td class='card'><span></span></td>";
            for($j=0; $j<$endDayCount+1; $j++){
               $display .= "<td></td>";
            }
            $display .= "<td></td></tr>"; 
      }
   }
   $display .= "</table></div>";

   echo $display; 
}

include 'db_connection.php';
$con = OpenCon();
?>

<!DOCTYPE html>
<html>
<head>
   <link rel="stylesheet" href="style.css">
   <meta charset="utf-8"/>
   <script type="text/javascript" src="timesheet.js"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
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
<form action="timesheet.php" method="post">
<div class="monthly-container">
   <p class="select-option"> Employee: 
      <select id="my-select" name="employee-options" onchange="chooseTimesheet(this.id)">
         
         <option value="1">option1</option>
         <?php 
         //<option value="0">all</option>

         //$sql = "SELECT first_name, last_name FROM users";
         //$result = mysqli_query($con, $sql);
         //while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
               //echo "<option value ='".$row['user_id']."'>".$row['first_name']." ".$row['last_name']."</option>"; 
         //}
         ?>
      </select>
   </p>
   
<div id="timesheet"></div>
<?php
//--------------- Calendar Movement ----------------------------
$display = "";
//if(isset($_SERVER['HTTP_CACHE_CONTROL']) && $_SERVER['HTTP_CACHE_CONTROL']==='max-age=0'){
   //unset($_SESSION);
//}

if(!isset($_SESSION['month'])){
   $year = date("Y");
   $month = date("m");
   $_SESSION['month'] = $month;
   $_SESSION['year'] = $year;
}
if(isset($_POST['previous'])){
   $year = intval($_POST['year']);
   //$month = intval($_POST['month']);
   $month = $_SESSION['month'];
   $year = $_SESSION['year'];
   $month--;
   if($month<1){
      $year--;
      $month=12;
   }
   $_SESSION['month'] = $month;
   $_SESSION['year'] = $year;
   getMonthYear($month, $year);
}else if(isset($_POST['next'])){
   $month = $_SESSION['month'];
   $year = $_SESSION['year'];
   $month++;
   if($month>12){
      $year++;
      $month=1;
   }
   $_SESSION['month'] = $month;
   $_SESSION['year'] = $year;
   getMonthYear($month, $year);
}else{
   $month = $_SESSION['month'];
   $year = $_SESSION['year'];
   getMonthYear($month, $year);
}


//----------------- Timesheet contents -----------------------------------------
//if(isset($_GET['q']))
$option = intval($_POST['employee-options']);
$q = intval($_GET['q']);
if($option>0){ 
   IndividualTimesheet($_SESSION['month'], $_SESSION['year'], $q);
}else{
   AllTimesheet($_SESSION['month'], $_SESSION['year']);
}
Close($con);
?>
</main>
</body>
</html>
