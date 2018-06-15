var express = require('express');
var Post = require('../models/test');
var router = express.Router();

router.get('/', (req, res) => {
    if (req.query.test_id.match(/^[0-9a-fA-F]{24}$/)) { //проверка на соотвествие id теста формату
        Post.findById(req.query.test_id, function (err, obj) {
            if (err) {
                console.log(err);
                res.send('Ошибка. Попробуйте позже');
            }
            if (!obj) {
                res.send('Ошибка. Данный тест отсуствует');
            }
            console.log(obj);
            res.render('./test_view.ejs', {
                test: obj,
                role: req.role
            })
        })
    } else {
        res.send('Ошибка. Некорректный запрос');
    }
});

module.exports = router;