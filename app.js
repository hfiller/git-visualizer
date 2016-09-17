// load static folder
var express = require("express");
var http = require('http');
var app = express();
// LOL @ express server implementations
app.use("/",express.static(__dirname+"/public"));
app.get("/",function(req, res){
	res.sendfile(__dirname+'/public/index.html');
});

var PORT = "8080";
var ADDRESS = "0.0.0.0";

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT,ADDRESS);
