var express = require('express');
var server = express();
var url= 'mongodb://localhost:3002/Nova';

server.use(express.static("static"));

server.get("/",function(req, res){
    res.sendFile(__dirname +"/index.html");
});

server.listen(3002); 