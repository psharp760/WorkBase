const currUser = ['Work', 'Base', 'workbase@gmail.com', 'images/man1.png', '0000'];
var fname, lname, addr;


/* NEED TO FIX:  Image selected by user doesn't uplod and display on the page*/
function ShowPhoto(photo) {
    document.querySelector('.img-container').innerHTML += '<img id="your-photo" class="profile-img" src="'+ photo +'">'
}
function ChangePhoto() {

}
/* NEED TO FIX:  Input value should be back to the one of the database when user move the tab */
function ShowInfo() {
    fname = document.querySelector('#fname').value = currUser[0];
    lname = document.querySelector('#lname').value = currUser[1];
    addr = document.querySelector('#addr').value = currUser[2];
}
function UpdateInfo() {
    var newFname = document.querySelector('#fname').value;
    var newLname = document.querySelector('#lname').value;
    var newAddr = document.querySelector('#addr').value;
    
    /* CODE:: update info of the database (this is just for checking the value) */
 
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