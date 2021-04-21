<?php
include 'db_connection.php';
$conn = OpenCon();

echo "Connected Successfully";
$firstname = filter_input(INPUT_POST, 'fname');
$lastname = filter_input(INPUT_POST, 'lname');
$email = filter_input(INPUT_POST, 'email');
$username = filter_input(INPUT_POST, 'username');
$password = filter_input(INPUT_POST, 'psw');


$sql = "INSERT INTO users(first_name, last_name, email, pass_word,username)
values ('$firstname', '$lastname', '$email','$password', '$username')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

CloseCon($conn);
?>
