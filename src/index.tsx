import "./index.scss";
import "./more.css";

const message = "Hello World!";

document.getElementById("heading").innerHTML = message;

let t = 0;

const x = 1;

function showTime() {
    t++;
    document.getElementById("time").innerHTML = t.toString() + " seconds";
}

setInterval( showTime, 1000);
