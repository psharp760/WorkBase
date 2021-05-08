
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="createAccount.js"></script>
    <title>WorkBase: CreateAccount</title>
</head>
<body>
  
     <img src="images/logo.png" alt="logo" id="logo_img">
     <h1>Create Account</h1>

    <form action = "CreateAccount.php" method = "post" onsubmit="return continueornot();">
        <div class="container">
            <input class="createAccount-input-user" type="text" id="fname" placeholder="First Name" name="fname" required>
            <input class="createAccount-input-user" type="text" id="lname" placeholder="Last Name" name="lname" required>
            <input class="createAccount-input-user" type="text" placeholder="Email" id="email" name="email" required>
            <input class="createAccount-input-user" type="text" placeholder ="Username" id="username" name="username" required>
            <input class="createAccount-input-user" type="password" placeholder="Password" id="psw" name="psw" required>
            <button class="signupbtn" type="submit" name="signUp">Sign Up</button>
        </div>
            </form>
            <center>
            <p>Already have an account?<a href="login.php">Login</a></p><br/>
        </center>
  
  


<?php
include 'db_connection.php';
$conn = OpenCon();


if(isset($_POST['signUp']))
{
//echo "Connected Successfully";
	$firstname = $_POST['fname'];
	$lastname = $_POST['lname'];
	$email = $_POST['email'];
	$username = $_POST['username'];
	$password = $_POST['psw'];

    //check if username/email already exists
    $getUserInfo = "SELECT *FROM users WHERE username = '$username'";
    $getEmail = "SELECT *FROM users WHERE email = '$email'";
    $emailResult = mysqli_query($conn,$getEmail);
    $result = mysqli_query($conn,$getUserInfo);
    if(mysqli_num_rows($result) == 1){
        ?> <script type="text/javascript">
            alert("Username already exits. Try another one!");
        </script>
        <?php
    }
    if(mysqli_num_rows($emailResult) == 1){
        ?> <script type="text/javascript">
            alert("Account already exists with this email.")
            window.location = 'login.php';
        </script>
        <?php
    }

    if(mysqli_num_rows($result) == 0 && mysqli_num_rows($emailResult) == 0){


	$sql = "INSERT INTO users(first_name, last_name, email, pass_word,username)
	values ('$firstname', '$lastname', '$email','$password', '$username')";

	if ($conn->query($sql) === TRUE) {
  	//echo "New record created successfully";
		header("Location:login.php");
	} 
	else {
  //echo "Error: " . $sql . "<br>" . $conn->error;
		header("Location:createAccount.php");
	   }
    }
}
CloseCon($conn);

?>

</body>
</html>