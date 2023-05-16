const express = require('express');
const app = express();
const cors = require('cors');
const admin   = require('./admin');
const dal = require('./dal');

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
    dal.findOne(req.params.email)
        .then((user) => {
            console.log(user);
            res.send(user);
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
app.get('/account/deposit/:email/:amount', function (req, res) {
    dal.update(req.params.email, Number(req.params.amount))
        .then((user) => {
            console.log(user);
            res.send(user);
        })

});

// withdraw
app.get('/account/withdraw/:email/:amount', function (req, res) {
    dal.update(req.params.email, Number(-req.params.amount))
        .then((user) => {
            console.log(user);
            res.send(user);
        })
});

// balance
app.get('/account/balance/:email', function (req, res) {
    console.log(req.params.email);
    dal.findOne(req.params.email)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

app.get('/auth', function(req,res){
    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);

    // verify token
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
            res.send('Authentication Sucess!');
        }).catch(function(error) {
            console.log('error:', error);
            res.send('Authentication Fail!');
        });
})

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);