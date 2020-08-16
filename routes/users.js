const router = require('express').Router();
let User = require('../models/users.model');

// create user -- POST
router.route('/createuser').post((req, res) => {
    const { body: { username, password, email } } = req;
    const newUser = new User({
        username,
        password,
        email
    })
    newUser.save()
        .then(() => res.json('User Added'))
        .catch((err) => res.status(400).json('errorPOST' + err))
});

router.route('/test').get((req,res) => {
    // const {body: {username}} = req;
    User.find({username:req.query.username})
        .then(user => res.json(username))
        .catch(err => console.log(err))
})
router.route('/test2').get((req,res) => {
    const {body: {username}} = req;
    User.find({username})
        .then(user => res.json(username))
        .catch(err => console.log(err))
})

module.exports = router;