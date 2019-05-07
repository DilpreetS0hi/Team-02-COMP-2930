(function(){

    var firebase = app_firebase;
    
    var banner = document.getElementById("banner");
    var quote = document.getElementById("quote");
    var userName = " ";
    var userQuote = " ";
    var numQuotes=0;
    var rand=0;

    //If the current user is authenticated then
  
    firebase.auth().onAuthStateChanged(function(user){
    	if (user){
          	var userName=user.displayName;			  // grab name of user
			banner.innerText = "Hello "+ userName;    // update with Personalized Hello

	  		//display quote from database 	
	  		var dbRef = firebase.database().ref('quotes/count');
	  		var promise = dbRef.once('value', function(snap) {
	  			 numQuotes = snap.val();
	  			 localStorage.setItem("num", numQuotes);
	  			 });
			//console.log (localStorage.getItem("num"));
	  		//random number between 1 and num
	  		promise.then(function(){
	  			rand = Math.floor(Math.random()* localStorage.getItem("num"))+1;
	  			localStorage.setItem("rand", rand);
	  			});

			//convert Random number to a string for db reference
			var randString = localStorage.getItem("rand")+"";			
			var dbRef = firebase.database().ref('quotes/').child(""+randString);
			dbRef.on('value', function(snap){
                userQuote = snap.val();
                quote.innerText = userQuote;		// update with Quote
                console.log(userQuote);
            });
    	} 
        
    });
})();

