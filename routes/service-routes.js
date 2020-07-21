var express = require('express');
var router = express.Router();
const db = require('../model/helper');
const fetch = require('node-fetch');

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
router.get('/servicebyidandloc/:serviceTypeID/:placeID', async function (req, res, next) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.placeID}&fields=geometry,formatted_address,address_component&key=${process.env.GOOGLE_PLACES_KEY}`);
    const json = await response.json();
    let placeDetails = {
        locality: json.result.address_components[1].long_name,
    }
    db(`select sp_id, price, loc_description, loc_lat, loc_lng, loc_locality, description, displayName as 'service_owner', profile_img from serviceProviders inner join users on serviceProviders.u_id = users.u_id where serviceProviders.st_id=${req.params.serviceTypeID} and loc_locality="${req.params.locality}";`)
        .then(result => {
            // console.log(result.data);
            res.status(200).send(result.data);
        })
        .catch(err => res.status(500).send(err))
});

router.post('/add', async function (req, res, next) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.body.place_id}&fields=geometry,formatted_address,address_component&key=${process.env.GOOGLE_PLACES_KEY}`);
    const json = await response.json();
    let placeDetails = {
        locality: json.result.address_components[1].long_name,
        full_address: json.result.formatted_address,
        lat: json.result.geometry.location.lat,
        lng: json.result.geometry.location.lng
    }
    // console.log(placeDetails);
    db(`insert into serviceProviders(u_id,st_id,price,description,loc_description,loc_lat,loc_lng,loc_locality) values(${req.body.u_id}, ${req.body.st_id}, ${req.body.price}, "${req.body.description}", '${placeDetails.full_address}', '${placeDetails.lat}', '${placeDetails.lng}', '${placeDetails.locality}');`)
        .then(result => {
            // console.log(result.data);
            res.status(200).send(result.data);
        })
        .catch(err => res.status(500).send(err))
    // res.send(placeDetails);
});

module.exports = router;