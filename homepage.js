function dis() {
    if (document.getElementById("i-need-you").style.left == "0px") {
        document.getElementById("i-need-you").style.left = "-10000px";
        document.getElementById("i-need-you").style.top = "-10000px";
    } else {
        document.getElementById("i-need-you").style.left = "0px";
        document.getElementById("i-need-you").style.top = "0px";

    }
}



 <!--Easter egg -->
var firstTime = true;
var message = "try again!";
var later = "easter egg surprise"

function MouseoverMessageInAlertBox() {
    if (firstTime) {
        alert(message);
    } else {
        alert(later);
    }
    firstTime = false;
}


 <!--Slide show -->
var slideIndex = 0;

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}