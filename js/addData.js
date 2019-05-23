        var contact = document.getElementById('Contact');
        var post = document.getElementById('Post');
        var names;
            var citySubmitButton = document.getElementById('citySubmitButton');
            function submitCityClick(){
                var firebaseRef = firebase.database().ref();  
                var d = new Date();
                var months = ["January","February","March","April","May","June","July","August",
                              "September","October","November","December"];
                var date = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
                firebase.auth().onAuthStateChanged(function(user){
                    if (user){
                        var user1 =  user.email;
                        var user2 = contact.value;
                        var user3 = post.value;
                        names = user.displayName;
                        firebaseRef.child("Post").push().set({
                            email: user1,
                            contact: user2,
                            post: user3,
                            name: names,
                            dates: date
                        })
                    }})
                document.getElementById('Contact').innerHTML="";
            };

            var ref = firebase.database().ref('Post');

            ref.on("child_added", function(snapshot) {
                var contact = snapshot.val().contact;
                var email = snapshot.val().email;
                var posts = snapshot.val().post;
                var name = snapshot.val().name;
                var namediv = document.createElement('div');
                namediv.innerHTML=name;
                namediv.setAttribute('class', 'nameClass');
                namediv.style.color = getRandomColor();
                var contactdiv = document.createElement('div');
                contactdiv.innerHTML=contact;
                contactdiv.setAttribute('class', 'contactClass');
                var emaildiv = document.createElement('div');
                emaildiv.style.color="grey";
                emaildiv.setAttribute('class', 'emailClass');
                emaildiv.innerHTML=email;
                var postdiv = document.createElement('div');
                postdiv.innerHTML=posts;
                postdiv.setAttribute('class', 'postdivClass');
                postdiv.style.margin = "2.5%";
                var post = document.createElement('div');
                post.setAttribute('class','posts');
                post.style.background = 'white';
                post.setAttribute('class', 'postClass');
                var datediv = document.createElement('div');
                datediv.innerHTML = snapshot.val().dates;
                datediv.setAttribute('class', 'dateClass');
                var linebreak = document.createElement("br");
                var separatediv = document.createElement('div');
                separatediv.append(postdiv, linebreak, datediv);
                separatediv.setAttribute('class','separateClass');
                document.getElementById('ex1').prepend(post);
                post.append(namediv,contactdiv, emaildiv, separatediv);

            }, function (error) {
                console.log("Error: " + error.code);
            });
            function getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
                console.log(color);
            }


            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                        // User successfully signed in.
                        // Return type determines whether we continue the redirect automatically
                        // or whether we leave that to developer to handle.
                        return true;
                    },
                    uiShown: function() {
                        // The widget is rendered.
                        // Hide the loader.
                        document.getElementById('loader').style.display = 'none';
                    }
                },
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInFlow: 'popup',
                signInSuccessUrl: 'tryMe.html',
                signInOptions: [
                    // Leave the lines as is for the providers you want to offer your users.


                    firebase.auth.EmailAuthProvider.PROVIDER_ID
                ],
                // Terms of service url.
                tosUrl: 'tryMe.html',
                // Privacy policy url.
                privacyPolicyUrl: 'tryMe.html'
            };
            
            function dis() {
    if(document.getElementById("i-need-you").style.left == "0px"){
        document.getElementById("i-need-you").style.left = "-10000px";
        document.getElementById("i-need-you").style.top = "-10000px";
    }else{
        document.getElementById("i-need-you").style.left = "0px";
        document.getElementById("i-need-you").style.top = "0px";

    }
}
