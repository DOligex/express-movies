const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const faker = require('faker');
const config = require('./config');
const movieController = require('./controllers/movieController');

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@cluster0.d6tui.mongodb.net/express_movies?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db =mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: cannot connect to my database.'));
db.once('open', () => {
    console.log('connected to the database');
});

let frenchMovies = [];

app.use('/public', express.static('public'));
app.use(expressJwt({secret: config.secret, algorithms: ['HS256']}).unless({path: ['/', '/login', '/movies', '/movie-search', '/movie-details',
new RegExp('/movies.*/', 'i'), new RegExp('/movie-details.*/', 'i')]}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/movies', movieController.getMovies);

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/movies', upload.fields([]), movieController.postMovie);

app.post('/movies-old-browser', urlencodedParser, movieController.getMoviesOldBrowsers);

app.get('/movies/add', movieController.getMoviesAdd);

app.get('/movies/:id', movieController.getMovieById);

app.post('/movie-details/:id',  urlencodedParser, movieController.postMovieDetails);

app.get('/movie-details/:id', movieController.getMovieDetails);

app.delete('/movie-details/:id', movieController.deleteMovie);

app.get('/movie-search', movieController.movieSearch);

app.get('/login', (req, res) => {
    res.render('login', {title: 'Espace membre'});
});




app.post('/login', urlencodedParser, (req, res) => {
    console.log('login post', req.body);
    if(!req.body) {
        res.sendStatus(500);
    }
    else {
        if(config.fakeUser.email === req.body.email && config.fakeUser.password === req.body.password) {
            const myToken = jwt.sign({iss: 'http://expressmovies.fr', user: 'Sam', scope: 'admin'}, config.secret);
            res.json(myToken);
        } else {
            res.sendStatus(401);
        }
    }
});

app.get('/member-only', (req, res) => {
    console.log('req.user', req.user);
    res.send(req.user);
});

app.listen(config.PORT, () => {
    console.log(`Express server listenning on port ${config.PORT}`);
});


