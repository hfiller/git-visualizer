// load static folder
var express = require("express");
var app = express();
// LOL @ express server implementations
app.use("/",express.static(path.join(__dirname, "public")));
app.get("*",function(){
	res.sendfile(__dirname+'/public/index.html');
})