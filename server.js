var express = require('express');
var server = express();
var mongo = require('mongodb');
var assert = require ('assert');
var bodyParser = require('body-parser');
// lien base de donnée
var urlmongo = 'mongodb://localhost:27017/Nova';

server.use(bodyParser.urlencoded({ extended: false }));

server.use(express.static("static"));

//affiche le html
server.get("/",function(req, res){
    res.sendFile(__dirname +"/index.html");
});

//recupere la base de donnée
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


server.post('/form', function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var name = req.body.name;
    var genre = req.body.genre;
    var dbo = db.db("Nova");
    MongoClient.then(urlmongo, function(err, db) {
        //delete req.body._id;
        dbo.collection('forms').insertOne({name, genre}, function(err, res){
            if (err) throw err;    
            res.send(''+ name + ''+ genre);
            db.close();
        });
    });    
});

server.get('/formulaire',  function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var dbo = db.db("Nova");
    MongoClient.then(urlmongo,function(err, db) {
        dbo.collection('forms').find({}).toArray().then(function(forms) {
            res.status(200).json(forms);
        });
    });
});


// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect(urlmongo, function(err, db) {

//     if (err) throw err;
//     var dbo = db.db("Nova");
//     var info = { name: "John Doe", address: "37 rue back-end, underground city" };
//     dbo.collection("clients").insertOne(info, function(err, res) {
//         if (err) throw err;
//         console.log("1 info inséré");
//         db.close();
//     });
// }); 



// server.post("/insert",function(req, res){
//     var item = {
//         title: req.body.title,
//         content: req.body.content,
//         author: req.body.author
//     };
   
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