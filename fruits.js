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

var count = 0;
document.getElementById("c1").addEventListener("click", function() {
    ShowlistFruits("Apple");
});

document.getElementById("c2").addEventListener("click", function() {
    ShowlistFruits("Banana");
});
document.getElementById("c3").addEventListener("click", function() {
    ShowlistFruits("Berries");
});
document.getElementById("c4").addEventListener("click", function() {
    ShowlistFruits("Grapes");
});
document.getElementById("c5").addEventListener("click", function() {
    ShowlistFruits("Citrus");
});



function ShowlistFruits(catergory) {
    var dbRef = firebase.database().ref("Team02/Suggestions/Fruits/" + catergory);
    var promise = dbRef.once("value", function(snap) {
        list = snap.val();
        count++;
        if(count>1){
            var elem = document.getElementById('listofplant');
            elem.parentNode.removeChild(elem);
        }
    });

    promise.then(function() {
        DisplayList(list); //JSON object
    });
}


function DisplayList(list) {
    console.log(list);
    var para = document.createElement("div");

    console.log(count);
    var bottonClick = document.createElement("div");
    var inside = document.createElement("p");

    var doc = document.getElementById("content");
    doc.appendChild(para);

    para.appendChild(bottonClick);
    bottonClick.appendChild(inside);

    var node = document.createTextNode(list);

    inside.appendChild(node);
    para.setAttribute("id", "listofplant");
    bottonClick.setAttribute("Class", "bottonClick");

}
