// ----- constants -----
// elements
let img = document.getElementById("img"),
    itemName = document.getElementById("itemName"),
    expirationDate = document.getElementById("expirationDate"),
    notifyMe = document.getElementById("notifyMe"),
    expitems = document.getElementById("expitems"),
    search = document.getElementById("search");
// variables
let items = [],
    sorter,
    recms = [],
    sortm,
    recns = [];

// ----- database -----
function find() {
    firebase.auth().onAuthStateChanged(function(user){
    if (user){
          var userName=user.displayName;
        console.log("Hello "+ userName);
    }
});
}

function insertDBrec(rec, t){
    let firebaseRef = firebase.database().ref();  
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            firebaseRef.child("rec/"+ user.email.split(".")[0]).push().set({
                time: t,
                name:  rec.name,
                img: rec.img,
                days: rec.days,
                info: rec.info,
                hit: rec.hit
            });
        }
    });
}

function insertDBitem(item){
    let firebaseRef = firebase.database().ref();  
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            firebaseRef.child("item/"+ user.email.split(".")[0]).push().set({
                time: item.time,
                name: item.name,
                img: item.img,
                date: item.date,
                noty: item.noty
            });
        }
    });
}

// ----- on start -----
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        let r3c = firebase.database().ref("rec/"+ user.email.split(".")[0]),
            it3m = firebase.database().ref("item/"+ user.email.split(".")[0]);
        
        r3c.on("child_added", function(snapshot){
            let rec = new Object();
            rec.name = snapshot.val().name;
            rec.img = snapshot.val().img;
            rec.days = snapshot.val().days;
            rec.info = snapshot.val().info;
            rec.hit = snapshot.val().hit;
            recms.push(rec);
            if(snapshot.val().time != -1){
                rec.time = snapshot.val().time;
                recns.push(rec);
            }
        });
        it3m.on("child_added", function(snapshot){
            let item = new Object();
            item.name = snapshot.val().name;
            item.img = snapshot.val().img;
            item.date = snapshot.val().date;
            item.time = snapshot.val().time;
            items.push(rec);
        });

    }else
        window.location.href = 'homepage.html';
    });


async function startupGeneration(){
    // DO NO CHANGE - TOP
    sorter = sortSelection(0);
    sortm = sortmSelection();
    // DO NO CHANGE END - TOP

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(4100);

    recns.sort(function (a,b) {
        return b.time - a.time;
    });

    if(recms.length==0){
        // apple
        let apple = new Object();
        apple.name = "Apple";
        apple.img = "apple.gif";
        apple.days = [14];
        apple.info = "fruits(1).html";
        apple.hit = 0;
        insertDBrec(apple, -1);
        recms.push(apple);
            
        // banana
        let banana = new Object();
        banana.name = "Banana";
        banana.img = "banana1.gif";
        banana.days = [2];
        banana.info = "fruits(1).html";
        banana.hit = 0;
        insertDBrec(banana, -1);
        recms.push(banana);
            
        // berries
        let berries = new Object();
        berries.name = "Berries";
        berries.img = "berries1.gif";
        berries.days = [2];
        berries.info = "fruits(1).html";
        berries.hit = 0;
        insertDBrec(berries, -1);
        recms.push(berries);
            
        // grapes
        let grapes = new Object();
        grapes.name = "Grapes";
        grapes.img = "SardonicExcellentIraniangroundjay-size_restricted.gif";
        grapes.days = [3];
        grapes.info = "fruits(1).html";
        grapes.hit = 0;
        insertDBrec(grapes, -1);
        recms.push(grapes);
            
        // citrus
        let citrus = new Object();
        citrus.name = "Citrus";
        citrus.img = "citrus.gif";
        citrus.days = [2];
        citrus.info = "fruits(1).html";
        citrus.hit = 0;
        insertDBrec(citrus, -1);
        recms.push(citrus);
    }
            
    // generate
    // DO NO CHANGE - BOTTOM
    putItems();
    putRecm();
    putRecn();
    // DO NO CHANGE END - BOTTOM
}

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

function sortmSelection(){
    return function (a,b){
        let r = b.hit - a.hit;
        if(r==0){
            let avg = [0,0];
            for (let i = 0; i < a.days.length; i++)
                avg[0] += a.days[i];
            for (let i = 0; i < b.days.length; i++)
                avg[1] += b.days[i];
            r = avg[0]/a.days.length - avg[1]/b.days.length;
        }if (r==0)
            r = a.name.localeCompare(b.name);
        return r;
    }
}

function daysTillExpiry(item){
    return Math.round((new Date(new Date(item.date).getFullYear(),new Date(item.date).getMonth(),new Date(item.date).getDate()+1) - new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()))/(1000*60*60*24));
}

function expiryTillDays(rec){
    let a = 0;
    for (let i = 0; i < rec.days.length; i++) {
        a += rec.days[i];
    }
    let y = new Date().getFullYear(),
        m = new Date().getMonth()+1,
        d = new Date().getDate()+Math.round(a/rec.days.length),
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
    if(m<10 && d<10)
        return y+"-0"+m+"-0"+d;
    else if(m<10)
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
        np3.style.color = "gold";
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

function removExItem(){
    for (let i = items.length-1; i >= 0; i--){
        if(daysTillExpiry(items[i])<0){
            items.splice(i,1);
        }
    }
    putItems();
}

// ----- in expiry input -----
function newItem(){
    let item = new Object();
    item.img = img.src;
    item.name = itemName.value;
    item.date = expirationDate.value;
    item.noty = notifyMe.value;
    item.time = (new Date()).getTime();
    
    insertDBitem(item)
    items.push(item);
    putItems();
    evalRecn(item);

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

function reclick(rec){
    img.src = rec.img;
    itemName.value = rec.name;
    expirationDate.value = expiryTillDays(rec);
}

// ----- search recomended expiry -----
search.addEventListener("keyup", function () {
    for(let i=0; i<recms.length; i++){
        if((recms[i].name.toLowerCase()).indexOf(search.value.toLowerCase())==-1)
            recms[i].hide = true;
        else
            recms[i].hide = false;
    }
    if(search.value == "")
        sortm = sortmSelection();
    else
        sortm = function (a,b) {
            let r = (a.name.toLowerCase()).indexOf(search.value.toLowerCase()) - (b.name.toLowerCase()).indexOf(search.value.toLowerCase());
            if (r==0)
                r = b.hit - a.hit;
            if(r==0){
                let avg = [0,0];
                for (let i = 0; i < a.days.length; i++)
                    avg[0] += a.days[i];
                for (let i = 0; i < b.days.length; i++)
                    avg[1] += b.days[i];
                r = avg[0]/a.days.length - avg[1]/b.days.length;
            }if (r==0)
                r = a.name.localeCompare(b.name);
            return r;
        }
    putRecm()
});

// ----- shared recomended & recent expiry -----
function addRec(rec) {
    if (rec.hide)
        return;

    let ndiv = document.createElement("div"),
        nbutton = document.createElement("button");
        ndiv2 = document.createElement("div"),
        nimg = document.createElement("img"),
        np = document.createElement("p");

    rec.con.appendChild(ndiv);
    ndiv.appendChild(nbutton);
    
    ndiv.appendChild(ndiv2);
    ndiv2.appendChild(np);
    ndiv2.appendChild(nimg);

    ndiv.className = "left qmarg";
    ndiv.id = "imgcon";
    ndiv.style.marginRight = "15px";

    nbutton.id = "recmod";
    nbutton.innerHTML = "info>>";
    if (rec.info == "")
        nbutton.style.visibility = "hidden";
    else
        nbutton.onclick = function(){location.href = rec.info;};

    ndiv2.onclick = function(){reclick(rec);};

    np.className = "left recmod";
    np.id = "imgbtn";
    np.innerHTML = rec.name;

    nimg.className = "recmodi";
    nimg.id = "img";
    nimg.src = rec.img;
}

// ----- in recomended expiry -----
function putRecm(){
    let con = document.getElementById("rec");

    recms.sort(sortm);
    con.innerHTML = "";

    for(let i=0; i<recms.length; i++){
        recms[i].con = con;
        addRec(recms[i]);
    }
}

// ----- in recent expiry -----
function putRecn(){
    let con = document.getElementById("re"),
        tit = document.getElementById("recn");
    if (recns.length==0)
        tit.style.display = "none";
    else 
        tit.style.display = "block";

    con.innerHTML = "";

    if(recns.length>8)
        recns.length = 8;
    for(let i=0; i<recns.length; i++){
        recns[i].con = con;
        recns[i].unique=i;
        addRec(recns[i]);
    }

    if (recns.length==0)
        con.style.height = "0px";
    else if(recns.length<=4)
        con.style.height = "120px";
    else
        con.style.height = "240px";
}

function evalRecn(rec){
    let trec = new Object();
    trec.name = rec.name;
    trec.img = rec.img;
    trec.date = rec.date;

    for(let i=0; i<recms.length; i++){
        if(trec.img.lastIndexOf(recms[i].img) != -1 && trec.name == recms[i].name){
            trec.days = recms[i].days;
            if (daysTillExpiry(trec)>=0){
                recms[i].days.push(daysTillExpiry(trec))
            }
            recms[i].hit++;
            trec.info = recms[i].info;
        }
    }
    for (let i = 0; i<recns.length; i++){
        if(trec.img.lastIndexOf(recns[i].img) != -1 && trec.name == recns[i].name){
            trec.days = recns[i].days;
            recns.splice(recns[i].unique,1);
        }
    }
    if (typeof trec.days === "undefined"){
        if(daysTillExpiry(trec)>=0)
            trec.days = [daysTillExpiry(trec)];
        else{
            trec.days = [0];
        }
        trec.hit = 1;
        trec.info = "";
        insertDBrec(trec, (new Date()).getTime());
        recms.push(trec);
    }else
        trec.days.push(daysTillExpiry(trec));

    putRecm();
    recns.unshift(trec);
    putRecn();
}