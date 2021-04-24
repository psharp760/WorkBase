
function loginCheck() {
    var uname= document.getElementById("uname").value;
    var psw = document.getElementById("psw").value;

    if(uname == "" && ps.length == ""){
    	alert("Username and password fields are empty");
    	return false;
    }
    else
    {
    	if(uname.length ==""){ 	
    		alert("Username field is empty");
    		return false;
    	}
    	if(psw.length == ""){
    		alert("Password field is empty");
    		return false;
    	}

    }

    function redirectToProfile(){
    window.location.href="profileTest.php";
}
    
    /*if(uname=="0000" && psw=="0000"){
        window.location.href = "profile.html";
    } else {
        alert("*** Incorrect username or password ***");
    } */
} 
