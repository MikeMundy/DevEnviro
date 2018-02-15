//Set up an Express Web server.

/* eslint-disable no-console */
import * as express from 'express';
import * as path from 'path';      // From Node, not NPM
import * as open from 'open';      // From Node, not NPM
import * as webpack from 'webpack';
import * as bodyParser from 'body-parser';
import config from '../webpack.config.dev';

const port = 3000;
const app = express(); // Create an instance of Express.
const compiler = webpack(config); // Create an instance of Webpack.

// Tell Express to use Webpack as middleware.
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

// Middleware to add deliberate delay to all requests. Useful for seeing 'loading' effects.
// app.use(function (req, res, next) { setTimeout(next, Math.floor((Math.random() * 500) + 500)) });
app.use(function (req, res, next) { setTimeout(next, 1000) });

// Middleware to parse any JSON in the request's body into a req.body object.
app.use(bodyParser.json()); // For parsing application/json (for use if you're using JSON Schema to generate random JSON data as a a mock back end.)

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../src/' + req.originalUrl));
  next();
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
