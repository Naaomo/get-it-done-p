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


//Get all ServiceTypes
router.get('/servicetype', function (req, res, next) {
    db(`SELECT * FROM serviceType;`)
        .then(result => {
            // console.log(result.data);
            res.status(200).send(result.data);
        })
        .catch(err => res.status(500).send(err))
});

// Get ServiceProvider from Type and locality
router.get('/servicebyidandloc/:serviceTypeID/:locality', function (req, res, next) {
    db(`select sp_id, price, loc_description, loc_lat, loc_lng, loc_locality, description, displayName as 'service_owner', profile_img from serviceProviders inner join users on serviceProviders.u_id = users.u_id where serviceProviders.st_id=${req.params.serviceTypeID} and loc_locality="${req.params.locality}";`)
        .then(result => {
            // console.log(result.data);
            res.status(200).send(result.data);
        })
        .catch(err => res.status(500).send(err))
});

module.exports = router;