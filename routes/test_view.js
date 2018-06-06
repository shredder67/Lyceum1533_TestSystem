var express = require('express');
var Post = require('../models/test');
var router = express.Router();

router.get('/', (req,res) =>{
    Post.findById(req.query.test_id,function(err,obj){
        if(err){
            console.log('No such test in the database: ' + err);
        }else{
            console.log(obj);
            res.render('test_view.ejs',{test: obj, question:obj.question})
            
        }
    })
});

module.exports = router;


