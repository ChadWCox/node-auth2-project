const router = require('express').Router();

const Users = require('./user-modal');
const restricted = require('../auth/restricted-middleware');
const checkRole = require('../auth/check-role-middleware');

router.get('/', restricted, checkRole('admin'), (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(e => res.send(e.messager))
});

module.exports = router;