const currUser = ['Work', 'Base', 'workbase@gmail.com', 'images/man1.png', '0000'];
var fname, lname, addr;


$(document).ready(function(){
    var uploadProfile = function(input){
        if(input.files&&input.files[0]){
            var reader = new FileReader();
            reader.onload = function(e){
                $('.profile-img').attr('src', e.target.result);
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

function ShowPhoto(photo) {
    document.querySelector('.profile-img').src = photo;
}
function ShowInfo() {
    document.querySelector('#fname').value = currUser[0];
    document.querySelector('#lname').value = currUser[1];
    document.querySelector('#addr').value = currUser[2];
    ShowPhoto(currUser[3]);
}
function UpdateInfo() {
    var newFname = document.querySelector('#fname').value;
    var newLname = document.querySelector('#lname').value;
    var newAddr = document.querySelector('#addr').value;
 
    if(fname!=newFname || lanem!=newLname || addr!=newAddr)
    {
        alert("Updated your Info\nName: "+ newFname + " " + newLname + "\nEmail: " + newAddr);
    }
}
function UpdatePassword() {
    var psw = document.querySelector('#cur-psw').value;
    var new_psw = document.querySelector('#new-psw').value;

    if(psw != currUser[4] && psw.length!=0 && new_psw.length!=0){
        alert("**Incorrect Password\nPlease enter correct password.");
    }else if(psw == currUser[4]){
        /* CODE:: update password of the database*/
    }
}
function DeleteAccount() {
    if(confirm("Are you sure you will delete your account?"))
    {
        /* CODE:: remove info from the database */

        window.location.href = "login.html";
    }
}

ShowPhoto(currUser[3]);
ShowInfo()