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
    db(`select
            serviceType.st_id as 'st_id',
            sp_id, service, description, price, loc_description
            from users
            inner join serviceProviders on users.u_id = serviceProviders.u_id
            inner join serviceType on serviceProviders.st_id = serviceType.st_id

            where users.u_id=${req.params.id};
    `).then(result => {
            res.send(result.data)
        })
        .catch(err => res.status(500).send(err))
});

//Delete a service offered by the person
router.delete('/services/:id',  (req, res) => {
    
    db(`DELETE FROM serviceproviders WHERE sp_id = ${req.params.id} AND u_id = ${req.body.u_id};`).then(results => {
        if (results.error) {
            res.status(404).send({ error: results.error });
        } else {
            db(`select 
        serviceType.st_id as 'st_id', 
        sp_id, service, description, price, loc_description 
        from users 
        inner join serviceProviders on users.u_id = serviceProviders.u_id 
        inner join serviceType on serviceProviders.st_id = serviceType.st_id 
        where users.u_id=${req.body.u_id};
        `)
                .then(result => {
                    res
                        .status(200)
                        .send({ msg: `Service removed!`, services: result });
                })
                .catch(error => res.status(500).send(error));
        }
    });
});

module.exports = router;