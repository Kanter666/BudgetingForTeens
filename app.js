var auth = new Firebase('https://prac-379b1.firebaseio.com/users');

function saveToList(){	// as the user presses the enter key, we will attempt to save the data
	var userName = document.getElementById("user").value.trim();
	var passWord = document.getElementById("pass").value.trim();
	if (userName.length > 0 && passWord.length > 0) {
		saveToFB(userName, passWord);
	} else {
		window.alert("Are you retarded?");
	}
	document.getElementById("user").value = "";
	document.getElementById("pass").value = "";
	return false;
}
 
function saveToFB(userName, passWord) {
    // this will save data to Firebase
    var keyid = auth.push({
        username: userName,
        password: passWord
    });
    auth.once('value', function(snapshot) {
    	var name = keyid.key;
    	console.log(name);
    	if (auth.child(name).hasChild(userName)) {
    		alert('exists');
  		}
  	})		
};
 
 
// this will get fired on inital load as well as when ever there is a change in the data
