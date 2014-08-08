/**
 * Created by Sindhu on 7/31/2014.
 */
var express = require('express');
var router = express.Router();

// working with mongoose and reviews
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Review = mongoose.model('Review', {
    email: 'string',
    review: 'string',
    movieid: 'number'
});


router.get('/', function (req, res) {
    res.render('review');

});

// todo: backend data validation
// check mongoose for validation and build on top it to avoid malicious entries into the database
router.post('/', function (req, res) {
    (new Review({
        email: req.body.email,
        review: req.body.review,
        movieid: Number(req.body.movieid)
    })).save(function (err) {
            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, { message: 'Succesfully updated data ... ' });
            }
        });
});


router.get('/:id',function(req,res){
    var id = req.params.id;

    Review.find({'movieid' : id},function(err,docs){
        res.json(docs)
    })
});

module.exports = router;