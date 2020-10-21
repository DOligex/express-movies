const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const path = require('path');
const config = require('./config');
const movieController = require('./controllers/movieController');
const authController = require('./controllers/authController');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const faker = require('faker');
faker.locale = "fr";

const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@cluster0.d6tui.mongodb.net/express_movies?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: cannot connect to my DataBase.'));
db.once('open', () => {
    console.log('connected to the DataBase');
});

app.set('views', './views');
app.set('view engine', 'ejs');

let frenchMovies = [];

app.use('/public', express.static('public'));

app.use(expressJwt({secret: config.secret, algorithms: ['HS256']}).unless({
    path: ['/', '/login', '/movies', '/movie-search', '/movie-details',
    new RegExp('/movies.*/', 'i'),
    new RegExp('/movie-details.*/', 'i')]}));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/movies', movieController.getMovies);

app.post('/movies', upload.fields([]), movieController.postMovie);

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/movies-old-browser', urlencodedParser, movieController.getMoviesOldBrowsers);

app.get('/movies/add', movieController.getMoviesAdd);

app.get('/movies/:id', movieController.getMovieById);

app.post('/movie-details/:id',  urlencodedParser, movieController.postMovieDetails);

app.get('/movie-details/:id', movieController.getMovieDetails);

app.delete('/movie-details/:id', movieController.deleteMovie);

app.get('/movie-search', movieController.movieSearch);

// app.get('/member-only', (req, res) => {
//     console.log('req.user', req.user);
//     if(req.user.role === 'admin') {
//         res.send(req.user);
//     };
// });

app.get('/login', authController.login);

app.post('/login', urlencodedParser, authController.postLogin);

app.get('/member-only', authController.getMemberOnly);

app.listen(config.PORT, () => {
    console.log(`Express server listenning on port ${config.PORT}`);
});
