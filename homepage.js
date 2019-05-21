function dis() {
    if(document.getElementById("i-need-you").style.left == "0px"){
        document.getElementById("i-need-you").style.left = "-10000px";
        document.getElementById("i-need-you").style.top = "-10000px";
    }else{
        document.getElementById("i-need-you").style.left = "0px";
        document.getElementById("i-need-you").style.top = "0px";
        
    }
  }



 
var firstTime = true;
var message = "try again!";
var later = "easter egg surprise"
function MouseoverMessageInAlertBox()
{
  if(firstTime) { alert(message); }
  else { alert(later); }
  firstTime = false;
}

   