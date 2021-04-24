const currUser = [_fname, _lname, _email, 'images/man1.png', _pass];

var fname, lname, addr;
var change=false;


$(document).ready(function(){
    var uploadProfile = function(input){
        if(input.files&&input.files[0]){
            var reader = new FileReader();
            reader.onload = function(e){
                $('.profile-img').attr('src', e.target.result);
                change = true;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $(".file-upload").on('change', function(){
        uploadProfile(this);
    });
    $(".upload-btn").on('click', function(){
        $(".file-upload").click();
    });
});

function ShowInfo() {
    fname = document.querySelector('#fname').value = currUser[0];
    lname = document.querySelector('#lname').value = currUser[1];
    addr = document.querySelector('#addr').value = currUser[2];
    photo = document.querySelector('.profile-img').src = currUser[3];
}
function UpdateInfo() {
    var newFname = document.querySelector('#fname').value;
    var newLname = document.querySelector('#lname').value;
    var newAddr = document.querySelector('#addr').value;
 
    if(fname!=newFname || lname!=newLname || addr!=newAddr || change)
    {
        alert("Updated your profile information");
    }
    else
    {
        alert("Profile information was not updated. Please enter a different name or email.")
        return false;
    }
}
function UpdatePassword() {
    var psw = document.querySelector('#cur-psw').value;
    var new_psw = document.querySelector('#new-psw').value;

    if(psw != currUser[4] || psw.length == 0){
        alert("**Incorrect Password\nPlease enter correct password.");
        return false
}
function DeleteAccount() {
    if(confirm("Are you sure you will delete your account?"))
    {
        window.location.href = "login.php";
    }
    else
  return false;
}

ShowInfo()