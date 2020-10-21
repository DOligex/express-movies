const config = require('./../config');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    res.render('login', { title: 'Espace membre'});
};

exports.postLogin = (req, res) => {
    console.log('login post', req.body);
    if (!req.body) {
        return res.sendStatus(500);
    } else {        
        if(config.fakeUser.email === req.body.email && config.fakeUser.password === req.body.password) {
            // iss means 'issuer'
            const myToken = jwt.sign({iss: 'http://expressmovies.fr', user: 'Sam', role: 'admin'}, config.secret);
            console.log('myToken', myToken);
            res.json(myToken);
        } else {
            res.sendStatus(401);
        } 
    } 
};

exports.getMemberOnly = (req, res) => {
    console.log('req.user', req.user);
    if(req.user.role === 'admin') {
        res.send(req.user);
    };
};