// Initialize Firebase
var config = {
    apiKey: "AIzaSyC3rK5fG2PwqAtjTQ2FhOCyzb4dIcXN2_0",
    authDomain: "project-2930.firebaseapp.com",
    databaseURL: "https://project-2930.firebaseio.com",
    projectId: "project-2930",
    storageBucket: "project-2930.appspot.com",
    messagingSenderId: "16612303844"
};
firebase.initializeApp(config);

function dis() {
    if(document.getElementById("i-need-you").style.left == "0px"){
        document.getElementById("i-need-you").style.left = "-10000px";
        document.getElementById("i-need-you").style.top = "-10000px";
    }else{
        document.getElementById("i-need-you").style.left = "0px";
        document.getElementById("i-need-you").style.top = "0px";

    }
}

//Script to display data

var count = 0;
document.getElementById("c1").addEventListener("click", function() {
    ShowlistFruits("Apple/Info");
    ShowlistFruits("Apple/Ingredients");
    ShowlistFruits("Apple/Ingredients1");
    ShowlistFruits("Apple/Method");
    ShowlistFruits("Apple/Method1");
    ShowlistFruits("Apple/Method2");
    ShowlistFruits("Apple/Method3");
    ShowlistFruits("Apple/Method4");
    ShowlistFruits("Apple/Method5");
});

document.getElementById("c2").addEventListener("click", function() {
    ShowlistFruits("Banana/Info");
    ShowlistFruits("Banana/Ingredients");
    ShowlistFruits("Banana/Ingredients1");
    ShowlistFruits("Banana/Method");
    ShowlistFruits("Banana/Method1");
    ShowlistFruits("Banana/Method2");
    ShowlistFruits("Banana/Method3");
    ShowlistFruits("Banana/Method4");
    ShowlistFruits("Banana/Method5");
});
document.getElementById("c3").addEventListener("click", function() {
    ShowlistFruits("Berries/Info");
    ShowlistFruits("Berries/Ingredients");
    ShowlistFruits("Berries/Ingredients1");
    ShowlistFruits("Berries/Method");
    ShowlistFruits("Berries/Method1");
    ShowlistFruits("Berries/Method2");
    ShowlistFruits("Berries/Method3");
    ShowlistFruits("Berries/Method4");
    ShowlistFruits("Berries/Method5");
});
document.getElementById("c4").addEventListener("click", function() {
    ShowlistFruits("Grapes/Info");
    ShowlistFruits("Grapes/Ingredients");
    ShowlistFruits("Grapes/Ingredients1");
    ShowlistFruits("Grapes/Method");
    ShowlistFruits("Grapes/Method1");
    ShowlistFruits("Grapes/Method2");
    ShowlistFruits("Grapes/Method3");
    ShowlistFruits("Grapes/Method4");
    ShowlistFruits("Grapes/Method5");
});
document.getElementById("c5").addEventListener("click", function() {
    ShowlistFruits("Citrus/Info");
    ShowlistFruits("Citrus/Ingredients");
    ShowlistFruits("Citrus/Ingredients1");
    ShowlistFruits("Citrus/Method");
    ShowlistFruits("Citrus/Method1");
    ShowlistFruits("Citrus/Method2");
    ShowlistFruits("Citrus/Method3");
    ShowlistFruits("Citrus/Method4");
    ShowlistFruits("Citrus/Method5");
});



function ShowlistFruits(catergory) {
    var dbRef = firebase.database().ref("Team02/Suggestions/Fruits/" + catergory);
    var promise = dbRef.once("value", function(snap) {
        list = snap.val();
        count++;
        if(count>9){
            var elem = document.getElementById('listofplant');
            elem.parentNode.removeChild(elem);
            var brek = document.getElementById('break');
            brek.parentNode.removeChild(brek);
        }
    });

    promise.then(function() {
        DisplayList(list); //JSON object
    });
}


function DisplayList(list) {
    var para = document.createElement("div");

    var linebreak = document.createElement("br");
    linebreak.setAttribute('id','break');

    var bottonClick = document.createElement("div");

    var inside = document.createElement("p");

    var doc = document.getElementById("content");
    doc.appendChild(para);

    para.appendChild(bottonClick);
    bottonClick.appendChild(inside);

    var node = document.createTextNode(list);

    inside.appendChild(node);

    para.setAttribute('id', 'listofplant');

    bottonClick.setAttribute("Class", "bottonClick");

    doc.appendChild(linebreak);
}

