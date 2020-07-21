var express = require('express');
var router = express.Router();
const db = require('../model/helper');

// Get a user's details
router.get('/:id',  (req, res) => {
    db(`SELECT * FROM users WHERE u_id=${req.params.id};`)
        .then(result => {
            res.send(result.data[0])
        })
        .catch(err => res.status(500).send(err))
});

// Get's all services offered by a person
router.get('/services/:id',  (req, res) => {
    db(`select serviceType.st_id as 'st_id', service, description, price, loc_description from users inner join  serviceProviders on users.u_id = serviceProviders.u_id inner join serviceType on serviceProviders.st_id = serviceType.st_id where users.u_id=${req.params.id};`)
        .then(result => {
            res.send(result.data)
        })
        .catch(err => res.status(500).send(err))
});

module.exports = router;