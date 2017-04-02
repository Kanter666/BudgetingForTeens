var auth = new Firebase('https://teenbudget-75e27.firebaseio.com');
var count = 0;

function saveToList(){	// as the user presses the enter key, we will attempt to save the data
	var userName = document.getElementById("user").value.trim();
	var passWord = document.getElementById("pass").value.trim();
	var namE = document.getElementById("name").value.trim()
	if (userName.length > 0 && passWord.length > 0) {
    	firebase.auth().onAuthStateChanged(function(authData){
    		count = count + 1;
    		if (count == 2){
				auth.child("users").child(authData.uid).set({
					displayName: namE
				})
			}
		})
		saveToFB(userName, passWord);

	} else {
		window.alert("Are you retarded?");
	}
	document.getElementById("user").value = "";
	document.getElementById("pass").value = "";
	document.getElementById("name").value = "";
}
 
function saveToFB(userName, passWord){
    // this will save data to Firebase
    firebase.auth().createUserWithEmailAndPassword(userName, passWord).then(function() {
    	window.location.href = "file:///Users/SagarJaiswal/Desktop/myFirebaseapp/jsFire/app1.html";
    }, function(error){
    	var errorCode = error.code;
    	var errorMessage = error.message;
    	if (errorMessage){
    		alert("There some shit goin on fam")
    	}
})
}

function confirmStuff(){
	var budget = document.getElementById("budget").value.trim();
	var category = document.getElementById("category").value.trim();
	if (budget.length!=0 && category.length!=0){
		var user = firebase.auth().currentUser;
		auth.child("users").child(user.uid).push({
			budget: budget,
			category: category
		})
	}
	budget = document.getElementById("budget").value = "";
	category = document.getElementById("category").value = "";
}

function fetchShit(){
	var rootref = firebase.database().ref();
	var shit = rootref.child("users/UpOKas4N6UT4IekltDA2AtYyW2u2")
	shit.once("value", function(snapshot){
		snapshot.forEach(function(child){
			console.log(child.key+": "+child.child("budget").val());
		})
	})
}

fetchShit();
