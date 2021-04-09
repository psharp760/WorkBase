
function loginCheck() {
    var uname= document.getElementById("uname").value;
    var psw = document.getElementById("psw").value;
    
    if(uname=="0000" && psw=="0000"){
        window.open('profile.html');
    } else {
        alert("*** Incorrect username or password ***");
    } 
}
