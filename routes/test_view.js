var express = require('express');
var Post = require('../models/test');
var router = express.Router();

router.get('/', (req,res) =>{
    Post.findOne({id: req.query.test_id},function(err,obj){
        if(err){
            console.log('No such test in the database: ' + err);
        }else{
            res.render('test_view.ejs',{test: obj})
        }
    });
});

module.exports = router;


