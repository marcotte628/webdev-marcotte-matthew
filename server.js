/**
 * Created by sesha on 6/2/17.
 */

// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));



// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});



//listen at port
const port = process.env.PORT || '3100';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

var serverSide = require("./server/test-mongodb/app");
serverSide(app);



// For Build: Catch all other routes and return the index file -- BUILDING
//defines request-response cycle...
// req = object representing all browser information
// res = response object..... res.send("hello from the server");
app.get("/", function(req, res){
  res.send("hello from the browser. you are at the root location.");
});
// can also create api responses like this
app.get("/api/hello", hello);
function hello(req, res){
  //sends a json object, not just static data
  res.send({message: "hello from the browser. you are at the localhost:3100/api/hello url."});
}
// assignment = require("assignment/app")(app);
var assignment = require("./assignment/app");
assignment(app);


// this app.get() was already here... the above examples were made by you
// this app.get is like a "catch-all"... the app is redirected here if other path does not exist
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


server.listen(port);

//********** this line was note written by you. you commented it out for class ************
//server.listen( port , () => console.log('Running'));
