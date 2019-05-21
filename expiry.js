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
// delete
function deleteDB(node){
    let firebaseRef = firebase.database().ref(); 
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            firebaseRef.child(node +"/"+ user.email.split(".")[0]).remove();
        }
    });
}

// update
function updateRec(){
    deleteDB("rec");
    for(let i = 0; i < recms.length; i++)
        insertDBrec(recms[i]);
}

function updateItem(){
    deleteDB("item");
    for(let i = 0; i < items.length; i++)
        insertDBrec(items[i]);
}

// push
function insertDBrec(rec){
    let firebaseRef = firebase.database().ref(); 
    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            firebaseRef.child("rec/"+ user.email.split(".")[0]).push().set({
                time: rec.time,
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
        let ref1 = firebase.database().ref("rec/"+ user.email.split(".")[0]),
            ref2 = firebase.database().ref("item/"+ user.email.split(".")[0]);
        ref1.on("child_added", function(snapshot){
            let rec = new Object();
            rec.name = snapshot.val().name;
            rec.img = snapshot.val().img;
            rec.days = snapshot.val().days;
            rec.info = snapshot.val().info;
            rec.hit = snapshot.val().hit;
            rec.time = snapshot.val().time;
            recms.push(rec);
            if(rec.time != -1)
                recns.push(rec);
        });
        ref2.on("child_added", function(snapshot){
            let item = new Object();
            item.name = snapshot.val().name;
            item.img = snapshot.val().img;
            item.date = snapshot.val().date;
            item.noty = snapshot.val().noty;
            items.push(item);
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
        let temp = createTempStart(),
            con = document.getElementById("rec");

        temp.sort(sortm);
        con.innerHTML = "";

        for (let i = 0; i < temp.length; i++){
            temp[i].con = con;
            insertDBrec(temp[i]);
            addRec(temp[i]);
        }
    }else{
        // generate
        // DO NO CHANGE - BOTTOM
        putItems();
        putRecm(false);
        putRecn();
        // DO NO CHANGE END - BOTTOM
    }
}

// ----- general expiry -----
function createTempStart(){
    return [
        { // apple
            name : "Apple",
            img : "apple.gif",
            days : [14, 28],
            info : "fruits(1).html",
            hit : 0,
            time : -1
        },{ // banana
            name : "Banana",
            img : "banana1.gif",
            days : [2,7],
            info : "fruits(1).html",
            hit : 0,
            time : -1
        },{ // berries
            name : "Berries",
            img : "berries1.gif",
            days : [2,3],
            info : "fruits(1).html",
            hit : 0,
            time : -1
        },{ // grapes
            name : "Grapes",
            img : "SardonicExcellentIraniangroundjay-size_restricted.gif",
            days : [3,5],
            info : "fruits(1).html",
            hit : 0,
            time : -1
        },{ // citrus
            name : "Citrus",
            img : "citrus.gif",
            days : [14,28],
            info : "fruits(1).html",
            hit : 0,
            time : -1
        },{ // carrot
            name : "Carrot",
            img : "Carrot.gif",
            days : [4,5],
            info : "vegetables.html",
            hit : 0,
            time : -1
        },{ // potato
            name : "Potato",
            img : "sweetpotato.gif",
            days : [21, 35],
            info : "vegetables.html",
            hit : 0,
            time : -1
        },{ // kale
            name : "Kale",
            img : "kale.gif",
            days : [7,14],
            info : "vegetables.html",
            hit : 0,
            time : -1
        },{ // zucchini
            name : "Zucchini",
            img : "zucchini.gif",
            days : [1,5],
            info : "vegetables.html",
            hit : 0,
            time : -1
        },{ // tomato
            name : "Tomato",
            img : "Tomato.gif",
            days : [7],
            info : "vegetables.html",
            hit : 0,
            time : -1
        }
    ];
}
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
        let r = a.hit - b.hit;
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
        con.style.display = "inline-block";

    items.sort(sorter);
    expitems.innerHTML = "";
    
    let h = 29;
    for(let i=0; i<items.length; i++){
        h+=62
        items[i].unique=i;
        addItem(items[i]);
        if (items[i].temp == true){
            items.splice(i,1);
            i--;
        }
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
    updateItem();
}

function removExItem(){
    for(let i = items.length-1; i >= 0; i--){
        if(daysTillExpiry(items[i])<0){
            items.splice(i,1);
        }
    }
    putItems();
    updateItem();
}

// ----- in expiry input -----
function newItem(){
    let item = new Object();
    item.img = img.src;
    item.name = itemName.value;
    item.date = expirationDate.value;
    item.noty = Number(notifyMe.value);
    item.temp = true;
    
    insertDBitem(item);
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
            let r = (b.name.toLowerCase()).indexOf(search.value.toLowerCase()) - (a.name.toLowerCase()).indexOf(search.value.toLowerCase());
            if (r==0)
                r = a.hit - b.hit;
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
    putRecm(false);
});

// ----- shared recomended & recent expiry -----
function addRec(rec){
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
function putRecm(check){
    let con = document.getElementById("rec");
    recms.sort(sortm);
    con.innerHTML = "";

    for(let i = recms.length-1; i >= 0; i--){
        recms[i].con = con;
        addRec(recms[i]);

        if(recms[i].temp)
            recms.splice(i,1);
        else
            recms.old = true;
        
        if(check && recms.old)
            recms.splice(i,1);
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
    
    for(let i = recns.length-1; i >= 0; i--){
        recns[i].con = con;
        recns[i].unique=i;
        addRec(recns[i]);

         if (recns[i].temp){
            recns.splice(i,1);
        }else
            recns.old = true;

        if(recns.old){
            recns.splice(i,1);
        }    
    }

    if (recns.length==0)
        con.style.height = "0px";
    else if(recns.length<=4)
        con.style.height = "120px";
    else
        con.style.height = "240px";
}

function evalRecn(rec){
    let trec = {
        name : rec.name,
        img : rec.img,
        date : rec.date,
        days : []
    };

    for(let i = 0; i<recns.length; i++)
        if(trec.img.lastIndexOf(recns[i].img) != -1 && trec.name == recns[i].name){
            trec.days = recns[i].days;
            recns.splice(recns[i].unique,1);
        }
    
    for(let i=0; i<recms.length; i++)
        if(trec.img.lastIndexOf(recms[i].img) != -1 && trec.name == recms[i].name){
            // days
            if (daysTillExpiry(trec)>=0){
                recms[i].days.push(daysTillExpiry(trec))
            }
            trec.days = recms[i].days;
            // hit
            recms[i].hit++;
            // info
            trec.info = recms[i].info;
            // time
            recms[i].time = (new Date()).getTime();
        }
    
    if(trec.days.length == 0){
        // days
        if(daysTillExpiry(trec)>=0)
            trec.days = [daysTillExpiry(trec)];
        else
            trec.days = [0];
        // hit
        trec.hit = 1;
        // info
        trec.info = "";
        // time
        trec.time = (new Date()).getTime();
        trec.temp = true;
        recms.push(trec);
    }

    updateRec();
    putRecm(true);
    recns.push(trec);
    putRecn();
}