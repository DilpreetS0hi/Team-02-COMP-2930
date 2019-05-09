
let items = [];
    itemName = document.getElementById("itemName"),
    expirationDate = document.getElementById("expirationDate"),
    notifyMe = document.getElementById("notifyMe"),
    expitems = document.getElementById("expitems");

function addItem(i, n, d){ // test run - not final
    let nimg = document.createElement("img"),
        np = document.createElement("p"),
        np2 = document.createElement("p"),
        np3 = document.createElement("p"),
        nbutton = document.createElement("button");
        
    expitems.appendChild(nimg);
    expitems.appendChild(np);
    expitems.appendChild(np2);
    expitems.appendChild(np3);
    expitems.appendChild(nbutton);
    
    nimg.className = "left expitems";
    nimg.id = "exptab"
    nimg.src = i;

    np.className = "left exptab expitems";
    np.innerHTML = n;

    np2.className = "left exptab expitems";
    np2.innerHTML = d; 
    
    np3.className = "left exptab expitems";
    np3.innerHTML = new Date(new Date(d) - new Date()).getDate();;

    nbutton.className = "left expitems";
    nbutton.id = "exptabu";
    nbutton.innerHTML = "x";
 
}

function addItems(){
    console.log(items);
    let item = new Object();
    item.img = "icon3.png";
    item.name = itemName.value;
    item.date = expirationDate.value;
    item.notify = notifyMe.value;

    items.push(item)
    expitems.innerHTML = "";

    for(let i=0; i<items.length; i++){
        addItem(items[i].img, items[i].name, items[i].date);
    }

    itemName.value = "";
    expirationDate.value = "";
    notifyMe.value = 3;
}