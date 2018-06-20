var express = require('express');
var server = express();
var mongo = require('mongodb');
var assert = require ('assert');
// lien base de donnée
var urlmongo = 'mongodb://localhost:27017/Nova';

server.use(express.static("static"));

server.get("/",function(req, res){
    res.sendFile(__dirname +"/index.html");
});

server.get("/data",function(req, res){
    var results="";
    //res.sendFile(__dirname +"/");
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(urlmongo, function(err, db) {

        if (err) throw err;
        var dbo = db.db("Nova");
        dbo.collection("personnages").find({}).toArray(function (err, result) {
            if (err) throw err;    
            console.log(result);
            results=result; 
            res.send(result);
            db.close();
        })
    })
   
});

/*
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(urlmongo, function(err, db) {

    if (err) throw err;
    var dbo = db.db("Nova");
    var info = { name: "John Doe", address: "37 rue back-end, underground city" };
    dbo.collection("clients").insertOne(info, function(err, res) {
        if (err) throw err;
        console.log("1 info inséré");
        db.close();
    });
}); */



// server.post("/insert",function(req, res){
//     var item = {
//         title: req.body.title,
//         content: req.body.content,
//         author: req.body.author
//     };

//     // GESTION DE LA BASE DE DONNEE
    
//     mongo.connect(urlmongo, function (err, client) {
//         assert.equal(null, err);
//         var db = client.db('Nova')
//         db.collection('texte').find().toArray(function (err, result) {
//             assert.equal(null, err);
        
//             console.log(result)
//         })

//         db.collection('texte').insertOne(item, function (err, result) {
//             assert.equal(null, err);

//             console.log('texte inséré')
//             db.close();
//         })

//     });

//})


server.listen(6002); 