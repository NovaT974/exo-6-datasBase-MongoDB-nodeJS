var express = require('express');
var server = express();
var mongo = require('mongodb');
var assert = require ('assert');
var bodyParser = require('body-parser');
// lien base de donnée
var urlmongo = 'mongodb://localhost:27017/Nova';

server.use(bodyParser.urlencoded({ extended: false }));

server.use(express.static("static"));

ObjectId = require('mongodb').ObjectID;

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

//TODO : changer l'appel sur le front
server.post('/insert', function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var name = req.body.name;
    var genre = req.body.genre;
    MongoClient.connect(urlmongo, function(err, db) {
        delete req.body._id;
        // dbo.collection('personnages').insertOne({name, genre}, function(err, res){
        //     if (err) throw err;    
        //     res.send(''+ name + ''+ genre);
        //     db.close();
        // });

        var dbo = db.db("Nova");
        var info = name + genre;
        dbo.collection('personnages').insertOne({name, genre}, function(err, res){
            if (err) throw err; 
            return info;   
            res.send(info);
            db.close();
        });
    });    
});

//TODO : faire fonctionner
server.post('/update', function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var name = req.body.name;
    var genre = req.body.genre;
    MongoClient.connect(urlmongo, function(err, db) {
        delete req.body._id;
        var dbo = db.db("Nova");
        var newinfo = name + genre;
        dbo.collection('personnages').updateOne({newinfo}, function(err, res){
            if (err) throw err; 
            return info;   
            res.send(info);
            db.close();
        }); 
    });    
});
//supprimer les entrée
server.get('/supprimer/:id', function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var mon_id = req.params.id;
    MongoClient.connect(urlmongo, function(err, db) {
        delete req.body._id;//
        var dbo = db.db("Nova");

        dbo.collection('personnages').deleteOne({_id: ObjectId(mon_id)}, function(err, reponse){
            //if (err) throw err; 
            if (err){
                res.send("error");
            }else{
                res.send("ok");
            }
            db.close();
        });    
    });  
});



/*
server.get('/data',  function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var dbo = db.db("Nova");
    MongoClient.then(urlmongo,function(err, db) {
        dbo.collection('personnages').find({}).toArray().then(function(forms) {
            res.status(200).json(forms);
        });
    });
});
*/

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


server.listen(3002); 