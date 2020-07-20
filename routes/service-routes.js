var express = require('express');
var router = express.Router();
const db = require('../model/helper');

//Get all ServiceProviders
router.get('/', function (req, res, next) {
    db(`SELECT * FROM serviceProviders;`)
        .then(result => {
            res.send(result.data)
        })
        .catch(err => res.status(500).send(err))
});


//Get all ServiceProviders
router.get('/servicetype', function (req, res, next) {
    db(`SELECT * FROM serviceType;`)
        .then(result => {
            // console.log(result.data);
            res.status(200).send(result.data);
        })
        .catch(err => res.status(500).send(err))
});

module.exports = router;