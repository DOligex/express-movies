const express = require('express');
const app = express();
// import du body-parse pour les méthodes de post
const bodyParser = require('body-parser');
// import de multer pour envoyer des données
const multer = require('multer');
const upload = multer();
// import de jsonwebtoken pour l'utilisation de token
const jwt = require('jsonwebtoken');
// import de express-jwt pour la vérifi
const expressJwt = require('express-jwt');

// import de la librairie faker qui génère de fausses données
const faker = require('faker');

// import du fichier config.js
const config = require('./config');

// import de mongoose pour ma connection à MongoDB
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@cluster0.d6tui.mongodb.net/express_movies?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
// affichage du statu de connection 
const db =mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: cannot connect to my database.'));
db.once('open', () => {
    console.log('connected to the database');
});

// création du schéma de la base de données
const movieSchema = new mongoose.Schema({
    movietitle: String,
    movieyear: Number
});

const Movie = mongoose.model('Movie', movieSchema);

//model pour créer des films factices
// const myMovie = new Movie({
//     movietitle: faker.lorem.sentence(3),
//     movieyear: Math.floor(Math.random() * 80) + 1950
// });


// myMovie.save((err, savedMovie) => {
//     if(err) {
//         console.error(err);
//     }
//     else {
//         console.log('savedMove', savedMovie);
//     }
// });


let frenchMovies = [];
// utilisation de la méthode .use pour utiliser un / des middleware(s)
// utilisation d'un middleware pour spécifier les fichiers statiques
app.use('/public', express.static('public'));
// utilisation du middleware body-parser avec .use et méthode .urlencoded
// commenté car ici on le passe directement dans chaque post
// app.use(bodyParser.urlencoded({extended: false}));

// utilisation du middleware expressjwt mais avec la méthode unless afin de mettre les exeptions url que l'on ne veut pas protéger car elles le sont toutes par défaut sinon
// attention il faut spécifier la propriété algorythme pour éviter les attaques de rétrogadation potentielles lors de la fourniture de bibliothèques tierces en tant que secrets 
app.use(expressJwt({secret: config.secret, algorithms: ['HS256']}).unless({path: ['/', '/login', '/movies', '/movie-search', '/movie-details',
new RegExp('/movies.*/', 'i'), new RegExp('/movie-details.*/', 'i')]}));

app.set('views', './views');
app.set('view engine', 'ejs');




app.get('/movies', (req, res) => {
    const title = 'Films francais des 30 dernières années';
    frenchMovies = [];
    
    Movie.find((err, movies) => {
        if(err) {
            console.log('could not retrieve movies from database');
            res.sendStatus(500);
        }
        else {
            frenchMovies = movies;
            res.render('movies', {movies: frenchMovies, title: title});
        }
    })
});


// utilisation d'un middleware en deuxième (puis troisième ...) parametre des requestes post
var urlencodedParser = bodyParser.urlencoded({extended: false});

// Méthode poste commentée car passage avec le middleware multer 
// app.post('/movies', urlencodedParser, (req, res) => {
//     console.log(req.body);
//     console.log(`Le titre est ${req.body.movietitle}`);
//     console.log(`L'année est ${req.body.movieyear}`);
//     // déclaration variable pour pouvoir push "attention au type des données ici on a des number donc à typper"
//     const newMovie = {title: req.body.movietitle, year: Number(req.body.movieyear)};
//     // push dans le tableau frenchMovies avec spread opérator donc nouveau tableau créé
//     frenchMovies = [...frenchMovies, newMovie];
//     console.log(frenchMovies);
//     res.sendStatus(201);
// })

app.post('/movies', upload.fields([]), (req, res) => {
    if(!req.body) {
        res.sendStatus(500);
    } else {
        const formData = req.body;
        console.log('formData', formData);

        const title = req.body.movietitle;
        const year = req.body.movieyear;
        const myMovie = new Movie({movietitle: title, movieyear: year});
        
        myMovie.save((err, savedMovie) => {
            if(err) {
                console.error(err);
                return;
            }
            else {
                console.log(savedMovie);
                res.sendStatus(201);
            }
        });
        // const newMovie = {title: req.body.movietitle, year: Number(req.body.movieyear)};
        // frenchMovies = [...frenchMovies, newMovie];
    }
});

app.get('/movies/add', (req, res) => {
    // la méthode send renvoie directement la valeur brute
    res.send('A form here soon to put movies !');
});

app.get('/movies/:id', (req, res) => {
    const _id = req.params.id;
    const title = req.params.title;
    // const year = req.params.year;
    res.render('movie-details', {movieId: _id});
});

app.get('/movie-details/:id', (req, res) => {
    const id = req.params.id;
    Movie.findById(id, (err, movie) => {
        console.log('movie: ', movie);
        res.render('movie-details', {movie: movie});
    })
});


app.post('/movie-details/:id', urlencodedParser, (req, res) => {
    if(!req.body) {
        console.log('erreur 3');
        res.sendStatus(500);
    }
    console.log('movietitle: ' ,req.body.movietitle, 'movieyear ' , req.body.movieyear);
    const id = req.params.id;
    Movie.findByIdAndUpdate(id, {$set: {movietitle: req.body.movietitle, movieyear: req.body.movieyear}}, {new: true, useFindAndModify: false},  (err, movie) => {
        if(err) {
            console.log(err);
            return res.send(`Le film n'a pa pu être mis à jour`)
        } else {
            console.log('Le film a été mis à jour GG !');
            res.redirect('/movies');
        }
    });
});

app.delete('/movie-details/:id', (req, res) => {
    const id = req.params.id;
    Movie.findByIdAndRemove(id, {useFindAndModify: false},(err, movie) => {
        res.sendStatus(202);
    })
})

app.get('/', (req, res) => {
    // la méthode render renvoie par exemple un template
    // Il n'est pas nécéssaire de préciser le .ejs car nous avons renseigné la propriété dans le package.json donc index et pas index.ejs
    res.render('index');
});

app.get('/movie-search', (req, res) => {
    res.render('movie-search');
});

app.get('/login', (req, res) => {
    res.render('login', {title: 'Espace membre'});
});


// création d'un utilisateur en dur
// const fakeUser = { email: 'testuser@testmail.fr', password: 'qsd'};


app.post('/login', urlencodedParser, (req, res) => {
    console.log('login post', req.body);
    if(!req.body) {
        res.sendStatus(500);
    }
    else {
        if(config.fakeUser.email === req.body.email && config.fakeUser.password === req.body.password) {
            //  la variable secret utilisée dans le payload est théoriquement présente ne tant que variable d'environnement
            const myToken = jwt.sign({iss: 'http://expressmovies.fr', user: 'Sam', scope: 'admin'}, config.secret);
            // avec la méthode de jwt on peut supprimer la méthode ci-dessous et déclarer la nouvelle méthode res.json(myToken)
            // res.json({
            //     email: 'testuser@testmail.fr',
            //     favoriteMovie: 'Les 7 mercenaires',
            //     favoriteMovieTheatre: 'Le Grand Max 3D',
            //     lastLogin: new Date()
            // });
            res.json(myToken);
        } else {
            res.sendStatus(401);
        }
    }
});

// Attention à l'ordre des routes car celles contenant des params en dur doivent être placées avant celles avec des params variables
// Sinon celles avec des params variables feront passer tout en tant que variables

app.get('/member-only', (req, res) => {
    console.log('req.user', req.user);
    res.send(req.user);
});






app.listen(config.PORT, () => {
    console.log(`Express server listenning on port ${config.PORT}`);
});


