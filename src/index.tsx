const message = "Hello World!!! This is my heading with more words";

document.getElementById("heading").innerHTML = message;

let t = 100;

function showTime() {
    t++;
    document.getElementById("time").innerHTML = t.toString() + " seconds";
}

setInterval( showTime, 1000);

