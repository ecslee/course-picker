var express = require('express');
var router = express.Router();

var users = [{
    username: 'emilylee',
    title: 'Emily\'s fall 2016 schedule'
}, {
    username: 'jsmith',
    title: 'Course selection'
}, {
    username: 'hermionegranger',
    title: 'Not enough classes available!'
}];

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(users);
});

module.exports = router;
