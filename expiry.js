// ----- constants -----
// elements
let img = document.getElementById("img"),
    itemName = document.getElementById("itemName"),
    expirationDate = document.getElementById("expirationDate"),
    notifyMe = document.getElementById("notifyMe"),
    expitems = document.getElementById("expitems");
// variables
let items = [],
    sorter,
    recms = [];

// ----- general expiry -----
function sortSelection(num){
    switch (num) {
    case 0:
        return function (a,b) {
            let r = daysTillExpiry(a) - daysTillExpiry(b);
            if (r==0)
                r = a.name.localeCompare(b.name);
            return r;
        }
    default:
        return function (a,b) {
            let r = a.name.localeCompare(b.name);
            if (r==0)
                r = daysTillExpiry(a) - daysTillExpiry(b);
            return r;
        }
    }
}

function daysTillExpiry(item){
    return (new Date(new Date(item.date).getFullYear(),new Date(item.date).getMonth(),new Date(item.date).getDate()+1) - new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()))/(1000*60*60*24);
}

function expiryTillDays(num){
    let a = c = 0;
    for (let i = 0; i < num.length; i++) {
        a += num[i];
        c++;
    }
    let y = new Date().getFullYear(),
        m = new Date().getMonth()+1,
        d = new Date().getDate()+Math.round(a/c),
        t;
    do{
        t = false;
        if((m==0||m==2||m==4||m==6||m==7||m==9||m==11) && d>31){
            m++;
            d -= 31;
            t = true;
        }else if((m==3||m==5||m==8||m==10) && d>30){
            m++;
            d -= 30;
            t = true;
        }else if(m==1 && (((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0)) && d>29){
            m++;
            d -= 29;
            t = true;
        }else if(m==1 && d>28){
            m++;
            d -= 28;
            t = true;
        }
        if(m>11){
            y++;
            m -= 12;
            t = true;
        }
    }while(t);
    if(m<10)
        return y+"-0"+m+"-"+d;
    return y+"-"+m+"-"+d;
}

function addItem(item){
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
    
    nimg.className = nbutton.className = "left expitems";
    np.className = np2.className = np3.className = "left exptab expitems";
    
    nimg.id = "exptab"
    nimg.src = item.img;

    np.innerHTML = item.name;

    np2.innerHTML = item.date; 
    
    let days = daysTillExpiry(item);
    np3.innerHTML = days;
    if (days>3) {
        np3.style.color = "green";
    } else if (days<0){
        np3.style.color = "red";
        if (days==-1)
            np3.innerHTML = "Yesterday";
        else
            np3.innerHTML = -days + " Days Ago";
    }else{
        np3.style.color = "yellow";
        if (days==1)
            np3.innerHTML = "Tomorrow";
        else if (days==0)
            np3.innerHTML = "Today";
    }
    
    nbutton.id = "exptabu";
    nbutton.innerHTML = "x";
    nbutton.onclick = function() {removeItem(item.unique)};
}

function putItems(){
    let con = document.getElementById("expcon");
    if (items.length==0)
        con.style.display = "none";
    else 
        con.style.display = "block";

    items.sort(sorter);
    expitems.innerHTML = "";

    let h = 29;
    for(let i=0; i<items.length; i++){
        h+=62
        items[i].unique=i;
        addItem(items[i]);
    }
    con.style.height = h+"px";
}

// ----- in expiry container -----
function reput(num) {
    sorter = sortSelection(num);
    putItems();
}

function removeItem(num){
    items.splice(num,1);
    putItems();
}


// ----- in expiry input -----
function newItem(){
    let item = new Object();
    item.img = img.src;
    item.name = itemName.value;
    item.date = expirationDate.value;
    item.notify = notifyMe.value;

    items.push(item);
    putItems();

    img.src = "icon3.png";
    itemName.value = "";
    expirationDate.value = "";
    notifyMe.value = 3;
}

function readURL(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function(e) {
            $('#img').attr('src', e.target.result);
        }
  
        reader.readAsDataURL(input.files[0]);
    }
}
  
$("#file").change(function() {
    readURL(this);
});

// ----- recomended expiry -----
function reclick(rec){
    img.src = rec.img;
    itemName.value = rec.name;
    expirationDate.value = expiryTillDays(rec.days);
}
function addRec(rec) {
    let ndiv = document.createElement("div"),
        ndiv2 = document.createElement("div"),
        nimg = document.createElement("img"),
        np = document.createElement("p");
        
    rec.con.appendChild(ndiv);
    ndiv.appendChild(ndiv2);
    
    ndiv2.appendChild(np);
    ndiv2.appendChild(nimg);

    ndiv.className = "left qmarg";
    ndiv.id = "imgcon";
    ndiv.style.marginRight = "15px";

    ndiv2.onclick = function(){reclick(rec);};

    np.className = "left recmod";
    np.id = "imgbtn";
    np.innerHTML = rec.name;

    nimg.className = "recmodi";
    nimg.id = "img";
    nimg.src = rec.img;

    if (!(typeof rec.info === "undefined")){ // problems with positionning
        let nbutton = document.createElement("button");
        ndiv.appendChild(nbutton);
        nbutton.id = "recmod";
        nbutton.onclick = rec.info;
        nbutton.innerHTML = "info>>";
    }
}
function startupGeneration(){
    sorter = sortSelection(0);
    // apple
    let apple = new Object();
    apple.name = "Apple";
    apple.img = "apple.gif";
    apple.days = [2];
    apple.info = function (){location.href ="fruits(1).html";ShowlistFruits("Apple");};
    recms.push(apple);
    // banana
    let banana = new Object();
    banana.name = "Banana";
    banana.img = "banana1.gif";
    banana.days = [2];
    banana.info = function (){location.href ="fruits(1).html";ShowlistFruits("Banana");};
    recms.push(banana);
    // berries
    let berries = new Object();
    berries.name = "Berries";
    berries.img = "berries1.gif";
    berries.days = [2];
    berries.info = function (){location.href ="fruits(1).html";ShowlistFruits("Berries");};
    recms.push(berries);
    // grapes
    let grapes = new Object();
    grapes.name = "Grapes";
    grapes.img = "SardonicExcellentIraniangroundjay-size_restricted.gif";
    grapes.days = [2];
    grapes.info = function (){location.href ="fruits(1).html";ShowlistFruits("Grapes");};
    recms.push(grapes);
    // citrus
    let citrus = new Object();
    citrus.name = "Citrus";
    citrus.img = "citrus.gif";
    citrus.days = [2];
    citrus.info = function (){location.href ="fruits(1).html";ShowlistFruits("Citrus");};
    recms.push(citrus);
    // generate
    putRecm();
}

function putRecm(){
    let con = document.getElementById("rec");

    // recms.sort();
    con.innerHTML = "";

    for(let i=0; i<recms.length; i++){
        recms[i].con = con;
        addRec(recms[i]);
    }
}
