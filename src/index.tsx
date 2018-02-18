import "./index.scss";
import "./more.css";

const message = "Hello World!!! This is my heading with more words";

document.getElementById("heading").innerHTML = message;

let t = 0;

function showTime() {
    t++;
    document.getElementById("time").innerHTML = t.toString() + " seconds";
}

setInterval( showTime, 1000);

