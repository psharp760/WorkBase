<?php

session_start();

?>


<!DOCTYPE html>
<html>
<head>
   <link rel="stylesheet" href="style.css">
</head>
<body>
<img src="images/logo.png" alt="logo" id="logo_img">
<h1>Login</h1>

<form action = "login.php" onsubmit = "return loginCheck()" method = "post">
<div class="container">
   <input class="login-input-user" type="text" id="uname" placeholder= "Username" name="uname" required> 
   <input class="login-input-psw" type="password" id="psw" placeholder= "Password" name="psw" required>
   <p class="space1"><a href="forgotPassword.php">Forget password?</a></p>
</div>
<div>
   <button type = "submit" class="normalButton" name = "submitButton" onclick="loginCheck()">Login</button>
</div>
<div>
   <a href="createAccount.php">Don't have an account?</a>
</div>
</form>
<script src="login.js"></script>

<?php

include'db_connection.php';
$conn = OpenCon();

//if user pressed login, find in database
if(isset($_POST['submitButton'])){
	$uname = $_POST['uname'];
	$pass = $_POST['psw'];

	$uname = stripcslashes($uname);  
    $pass = stripcslashes($pass);  
    $uname = mysqli_real_escape_string($conn, $uname);  
    $pass = mysqli_real_escape_string($conn, $pass);

    $sql = "SELECT *from users where username = '$uname' and pass_word = '$pass'";  
    $result = mysqli_query($conn, $sql);  
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);  
    $count = mysqli_num_rows($result); 

    if($count == 1){
    	$_SESSION['username'] = $uname;
      $_SESSION['user_id'] = $row['user_id'];

      //echo $row['first_name'];
    header("Location:3a-calendar.php");
    }
    else
    {
    	echo "Login failed. Invalid username or password";
        echo "<script>setTimeout(\"location.href = 'login.php';\", 3000); </script>";
        exit();
    }
}
CloseCon($conn);



?>

</body>
</html>