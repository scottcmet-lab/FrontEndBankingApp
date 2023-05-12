var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

app.use(express.static('public'));
app.use(cors());

// create user
app.get('/account/create/:name/:email/:password', function(req, res) {
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// login
app.get('/account/login/:email/:password', function (req, res) {
    res.send({
        email: req.params.email,
        password: req.params.password
    });
});

// get all
app.get('/account/all', function (req, res) {
    dal.all()
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

// deposit
app.get('/account/deposit/:amount', function (req, res) {

});

// withdraw
app.get('/account/withdraw/:amount', function (req, res) {

});

// balance
app.get('/account/balance/', function (req, res) {

});

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);