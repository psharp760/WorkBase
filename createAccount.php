
<!DOCTYPE html>
<html>
<head>
    <title>WorkBase: CreateAccount</title>
</head>
<body>
    <center>
        <h1 style="color:#792ef9; font-size:50px;"><br />Create Account</h1>
    </center>

    <style>
        <!-- logo,boxes,and link formats-->
        #content {
            position: relative;
        }

        #content img {
            position: absolute;
            top: 0px;
            left: 0px;
        }

        input[type=text], input[type=password] {
            width: 30%;
            padding: 10px;
            margin: 5px 0 22px 0;
          
        }

        .signupbtn {
            background-color: #8444f2;
            color: white;
            padding: 10px 14px;
            margin: 8px 0;
            border: none;
            cursor: pointer;
            width: 32%;
            opacity: 0.9;
        }

            .signupbtn:hover {
                opacity: 1;
            }
            a{
                color:dodgerblue;
            }
    </style>
    <div id="content">
     
        <img src="logo.png" height="100px" width="250px" alt=" " />
    </div>

    <form action = "CreateAccountPHP.php" method = "post" onsubmit="return continueornot();">
        <center>
            <input type="text" placeholder="First Name" id="fname" name="fname" required />
            <br />
            <input type="text" placeholder="Last Name" id="lname" name="lname" required />
            <br />
            <input type="text" placeholder="Email" id="email" name="email" required />
            <br />
            <input type="text" placeholder="Username" id="username" name="username" required />
            <br />
            <input type="password" placeholder="Password" id="psw" name="psw" required />
            <br />
            <button type="submit" name = "signUp" class="signupbtn">Sign Up</button><br />
          
            <p>Already have an account?
            <a href="">Login</a></p>
        </center>
    </form>
    <script src = "createAccount.js"></script>


<?php
include 'db_connection.php';
$conn = OpenCon();


if(isset($_POST['signUp']))
{
//echo "Connected Successfully";
	$firstname = filter_input(INPUT_POST, 'fname');
	$lastname = filter_input(INPUT_POST, 'lname');
	$email = filter_input(INPUT_POST, 'email');
	$username = filter_input(INPUT_POST, 'username');
	$password = filter_input(INPUT_POST, 'psw');


	$sql = "INSERT INTO users(first_name, last_name, email, pass_word,username)
	values ('$firstname', '$lastname', '$email','$password', '$username')";

	if ($conn->query($sql) === TRUE) {
  	//echo "New record created successfully";
		header("Location:login.php");
	} 
	else {
  //echo "Error: " . $sql . "<br>" . $conn->error;
		header("Location:CreateAccountPHP.php");
	}
}
CloseCon($conn);

?>

</body>
</html>