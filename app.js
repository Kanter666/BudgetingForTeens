var auth = new Firebase('https://teenbudget-75e27.firebaseio.com');
var count = 0;
var login = false;

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
		if (login == true){
		login(userName, passWord);
	}else{
		saveToFB(userName, passWord);
	}

	} else {
		window.alert("Are you retarded?");
	}
	document.getElementById("user").value = "";
	document.getElementById("pass").value = "";
	document.getElementById("name").value = "";
}

function login(email, password){
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		window.location.href = "file:///Users/SagarJaiswal/Desktop/myFirebaseapp/jsFire/app1.html";
	}, function(error){
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorMessage){
			alert("Some login issue fam")
		}

	})	
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
	var payment = document.getElementById("payment").value.trim();
	if (budget.length!=0 && category.length!=0){
		var user = firebase.auth().currentUser;
		auth.child("users").child(user.uid).push({
			budget: budget,
			category: category
			payment: payment
		})
	}
	document.getElementById("budget").value = "";
	document.getElementById("category").value = "";
	document.getElementById("payment").value = "";
	fetchShit();
}

function fetchShit(){
	var rootref = firebase.database().ref();
	var userID = firebase.auth().currentUser.uid;
	var shit = rootref.child("users/"+userID);
	shit.once("value", function(snapshot){
		snapshot.forEach(function(child){
			console.log("Budget: "+child.child("budget").val());
			console.log("Category: "+child.child("category").val());
			console.log("Payment: "+child.child("payment").val());
		})
	})
}

