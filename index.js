var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.static('public'));
app.use(cors());

app.get('/account/create/:name/:email/:password', function(req, res) {
    res.send({
        name: req.params.name,
        email: req.params.email,
        password: req.params.password
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
    res.send({
        name: 'peter',
        email: 'peter@mit.edu',
        password: 'secret'
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