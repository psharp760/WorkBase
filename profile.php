<?php

session_start();

?>

<!DOCTYPE html>
<html>
<head>
   <link rel="stylesheet" href="style.css">
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
   <header>
      <img  src="images/logo.png" alt="logo" id="logo_img">

      <div class="nav-container">
         <ul id="nav">
            <li><img src="images/calendar-icon.png" id="icon-nav"><a href="calendar.html">Calendar</a></li>
            <li><img src="images/timesheet-icon.png" id="icon-nav"><a href="timesheet.html">Timesheet</a></li>
            <li><img src="images/user-icon.png" id="icon-nav"><a href="profile.php" id="current">Profile</a></li>
            <li><img src="images/logout-icon.png" id="icon-nav"><a href="login.php">Logout</a></li>
         </ul>
      </div>
   </header>
<div class="tab-wrap">
   <input class="tab-switch" type="radio" name="tab-name" id="tab1" checked>
   <label class="tab-label" for="tab1" id="edit-icon" onClick="ShowInfo()">Edit Profile</label>
   <div class="tab-content">
   <div class="inside-tab-container">
      <p>
         <h2>Edit Profile</h2>
         <div class="profile-container">
            <div class="row">
               <div class="column">
                   <div class="img-container">
                      <img id="your-photo" class="profile-img"/>
                      <div class="upload-btn">Upload</div>
                      <input class="file-upload" type="file" accept="image/*"/>
                   </div>
               </div>
               <div class="info-container">
                  <div class="column"> 
                     <div class="row">
                        <div class="column">
                           <div class="firstname-container">
                              <form method = 'post' action = 'profile.php' onclick = 'return UpdateInfo()'>
                              <label for="firstname">First name</label> 
                              <input class="profile-input" type="text" id="fname" name="firstname" required>
                           </div>
                        </div>
                        <div class="column">
                           <div class="lastname-container">
                              <label for="firstname">Last name</label> 
                              <input class="profile-input" type="text" id="lname" name="lastname" required>
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="email-container">
                           <label for="email">Email</label> 
                           <input class="profile-input" type="text" id="addr" name="email" required>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="space1">
            <button class="normalButton" type = "submit" name = "update" onclick="UpdateInfo()">Save</button>
         </div>
      </p>
   </form>
   </div>
   </div>

   <input class="tab-switch" type="radio" name="tab-name" id="tab2">
   <label class="tab-label" for="tab2" id="key-icon" onClick="ShowInfo()">Change Password</label>
   <div class="tab-content">
   <div class="inside-tab-container">
      <p>
         <h2>Change Password</h2>
         <div class="psw-container">
            <form method = "post" action = "profile.php" onsubmit= "return UpdatePassword()" >
            <label for="curr-pasw">Password</label>
            <input class="pwd-profile-input" id="cur-psw" type="password" placeholder= "Enter current password" name="cur-pasw" required> 
            <label for="new-pasw">New Password</label>
            <input class="pwd-profile-input" id="new-psw" type="password" placeholder= "Enter new password" name="new-psw" required> 
            <div class="error-msg"></div> 
         </div>
         <div class="space1">
            <button class="normalButton" name = 'changePass' onclick="UpdatePassword()">Save</button>
         </div>
      </p>
   </form>
   </div>
   </div>

   <input class="tab-switch" type="radio" name="tab-name" id="tab3">
   <label class="tab-label" for="tab3" id="delete-icon" onclick="ShowInfo()">Delete account</label>
   <div class="tab-content">
   <div class="inside-tab-container">
      <p>
         <h2>Delete Account</h2>
         <div class="tag-container">
            <form method = 'post' action= 'login.php' onsubmit = 'return confirm("Are you sure you will delete your account?")'>
            <p class="pg1">You are about delete your account. This will remove:
            <br><br>- your personal information
            <br>- your calendar and timesheet data
            <br><br>Are you sure you will delete your account?</p>
         </div>
         <div class="space1">
            <button class="normalButton" name = "delete">Delete account</button>
         </div>
      </p>
   </div>
   </div>



<?php

include 'db_connection.php';
$conn = OpenCon();

$uname = $_SESSION['username'];

$getUserInfo = "SELECT *FROM users WHERE username = '$uname'";
$result = mysqli_query($conn, $getUserInfo);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

if(isset($_POST['update']))
{
   $fname = $_POST['firstname'];
   $lname = $_POST['lastname'];
   $email = $_POST['email'];

   $update = "UPDATE users SET first_name = '$fname', last_name = '$lname', email = '$email' WHERE username = '$uname'";
   $refresh = 'profile.php';
   if(mysqli_query($conn,$update)){
      $getUserInfo = "SELECT *FROM users WHERE username = '$uname'";
      $result = mysqli_query($conn, $getUserInfo);
      $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
      
   }
   else{
      echo "Error" . mysqli_error($conn);
   }

}

if(isset($_POST['changePass']))
{
   $curpass = $_POST['cur-pasw'];
   $newpass = $_POST['new-psw'];

   $update = "UPDATE users SET pass_word = '$newpass' where username = '$uname'";
   if(mysqli_query($conn,$update)){
      $getUserInfo = "SELECT *FROM users WHERE username = '$uname'";
      $result = mysqli_query($conn, $getUserInfo);
      $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
   }

}

if(isset($_POST['delete']))
{

   $sql = "DELETE FROM users WHERE username = '$uname'";
   mysqli_query($conn,$sql);

}

?>

<script type="text/javascript"> _fname = "<?= $row['first_name']; ?>";</script> 
<script type="text/javascript"> _lname = "<?= $row['last_name']; ?>";</script>
<script type="text/javascript"> _email = "<?= $row['email']; ?>";</script>
<script type="text/javascript"> _pass = "<?= $row['pass_word']; ?>";</script>
<script type="text/javascript" src="profile.js"></script> 



</body>
</html>