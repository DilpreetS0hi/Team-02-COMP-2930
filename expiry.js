let expitems = document.getElementById("expitems");
function newExpiry(){ // test run - not final
    let itemName = document.getElementById("itemName"),
        expirationDate = document.getElementById("expirationDate"),
        notifyMe = document.getElementById("notifyMe"),
        nimg = document.createElement("img"),
        np = document.createElement("p"),
        np2 = document.createElement("p"),
        np3 = document.createElement("p"),
        nbutton = document.createElement("button");
        
    expitems.appendChild(nimg);
    expitems.appendChild(np);
    expitems.appendChild(np2);
    expitems.appendChild(np3);
    expitems.appendChild(nbutton);
    
    nimg.className = "left";
    nimg.id = "exptab"
    nimg.src = "icon3.png";

    np.className = "left exptab";
    np.innerHTML = itemName.value;

    np2.className = "left exptab";
    np2.innerHTML = expirationDate.value; 
    
    np3.className = "left exptab";
    np3.innerHTML = notifyMe.value;

    nbutton.className = "left";
    nbutton.id = "exptabu";
    nbutton.innerHTML = "x";

    itemName.value = "";
    expirationDate.value = "";
    notifyMe.value = 3;
}