<?php

include 'db_connection.php';
$conn = OpenCon();

//    localhost/WorkBase-main/forgotPassword.php

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/includes/PHPMailer.php';
  require 'phpmailer/includes/SMTP.php';
  require 'phpmailer/includes/Exception.php';
  /*
  require 'vendor/phpmailer/phpmailer/src/Exception.php';
  require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
  require 'vendor/phpmailer/phpmailer/src/SMTP.php';
  */

  // Include autoload.php file
  //require 'vendor/autoload.php';
  // Create object of PHPMailer class
  $mail = new PHPMailer(true);

  $output = '';

  if (isset($_POST['submit'])) {
    //$name = $_POST['name'];
    $email = $_POST['email'];
    //$subject = $_POST['subject'];
    //$message = $_POST['message'];

    try {
      $mail->isSMTP();  //may need to remove if live hosting on server
      $mail->Host = 'smtp.gmail.com';   //names smtp server
      $mail->SMTPAuth = true;           //sets smtp authenticator
      // Gmail ID which you want to use as SMTP server
      $mail->Username = 'workbase441@gmail.com';
      // Gmail Password
      $mail->Password = 'workbase!23';
      //smtp encryption
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
      //tcp port 
      $mail->Port = 587;

      // Email ID from which you want to send the email
      $mail->setFrom('workbase441@gmail.com');
      // Recipient Email ID where you want to receive emails
      $mail->addAddress($email);
      //grabs user info with imputed email adress
      $getUserInfo = "SELECT pass_word *FROM users WHERE email = '$email'";

      //retreive user password
      $pswd = mysqli_query($conn, $getUserInfo);

      $mail->isHTML(true);
      $mail->Subject = 'Forgot Password';
      $mail->Body = "<h3>Email : $email <br>Password : $pswd</h3>";


      $mail->send();
      $output = '<div class="alert alert-success">
                  <h5>Thankyou! for contacting us, We\'ll get back to you soon!</h5>
                </div>';
    } catch (Exception $e) {
      $output = '<div class="alert alert-danger">
                  <h5>' . $e->getMessage() . '</h5>
                </div>';
    }
  }
  CloseCon($conn);

?>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>WorkBase:Forgot Password</title>
</head>
<body>
    <img src="images/logo.png" alt="logo" id="logo_img">
    <h3>Forgot Password?</h3>

    <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6 mt-3">
        <div class="card border-danger shadow">
          <div class="card-body px-4">
            <form action="#" method="POST">
              <div class="form-group">
              <?= $output; ?> 
              </div>
              
              <div class="form-group">
                <label for="email">E-Mail</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="Enter E-Mail" required>
              </div>
              
              <div class="form-group">
                <input type="submit" name="submit" value="Send" class="btn btn-danger btn-block" id="sendBtn">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</body>
</html>