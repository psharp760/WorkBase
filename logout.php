<?php
    session_start();
    $_SESSION = array();
    session_destroy();
?>
    <script type ="text/javascript">
         window.location = "login.php";
      </script>
