//Set up an Express Web server.

/* eslint-disable no-console */
import * as express from "express";
import * as path from "path";
import * as open from "open";
import * as compression from "compression";

const port = 3000;
const app = express(); //Create an instance of Express.

app.use(compression());
app.use(express.static('dist'));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//Send all requests from our root folder to the index.html file.
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

//Listen for requests, display any errors, otherwise open browser and display localhost.
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  else {
    open('http://localhost:' + port);
  }
})
