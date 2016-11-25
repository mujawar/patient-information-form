var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('patient',['patient']);
var bodyParser = require('body-parser');



app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json());

app.get('/patient',function(req,res){
    console.log('i recieved get request');
    db.patient.find(function(err,docs){
        console.log('docs' +JSON.stringify(docs));
        res.json(docs)
    })
});

app.post('/patient',function(req,res){
    console.log('i recieved post request');
    console.log(req.body)
    db.patient.insert(req.body,function(err,doc){
        res.json(doc)
    })
});

app.delete('/patient/:id',function(req,res){
    var id = req.params.id
    console.log(id);
    db.patient.remove({_id:mongojs.ObjectId(id)},function(doc){
        res.json(doc);
    })
})

app.get('/patient/:id',function(req,res){
    var id = req.params.id;
    console.log('server edit id' +JSON.stringify(id));
    db.patient.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
        console.log('doc---------' +JSON.stringify(doc));
        res.json(doc)
    })
})

app.put('/patient/:id',function(req,res){
  var id = req.params.id;
    console.log(id);
    console.log(req.body.name);
    db.patient.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update:{$set:{fname:req.body.fname,lname:req.body.lname,age:req.body.age,gender:req.body.gender,dob:req.body.dob,mobile:req.body.mobile,text:req.body.text}},
    new:true},function (err, doc) {
        res.json(doc);
    })
})


app.listen(7000);
console.log('server is started at 7000 port');

