# Express Movies 

This project was generated with 
[Node.js](https://nodejs.org/fr/) version 13.12.0.
[NPM](https://www.npmjs.com/) version 6.14.4

## Install commands
#### Init Node project

``` 
$ npm init
```

#### Express install in dependencies
```
$ npm install express --save
```
<p>
Create a app.js file as the name specified in the npm init process
Import express in app.js filesudo systemctl restart ssh
</p>
```js
const express = require('express');
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Express server listenning on port ${PORT}`);
});
```


#### Nodemon install in dev dependencies
```
$ npm install nodemon --save-dev
``` 

<p> Update the package.json  file with two above scripts</p>

```json 
"start": "node app.js",
"dev": "nodemon app.js"
```

#### ejs install in dependencies (template engine)
```ssh
$ npm install ejs --save
```

Update the app.js file with ejs params
```js
app.set('views', './views');
app.set('views engine', 'ejs');
```


For CSS and for static's files add static .use property for a public folder for example
```js
app.use('/public', express.static('public'));
```

## Folder creation for the view at the source project


To send a hard data in vue use .send method
To send a complete template data in vue use .render method
```js
app.get('/movies', (req, res) => {
	// .send method
    res.send('A greatfull movies application!');
});

app.get('/movies', (req, res) => {
    // .render method don't need .ejs extension file to work
    res.render('movies');
});

```



## Install middleware for post requests bodyParser

```ssh
$ npm install --save body-parser
```

Update the app.js file

```js
const bodyParser = require('body-parser');
```

2 differents way to implement this middleware 

```js
// First solution
app.use(bodyParser.urlencoded({extended: false}));

app.post('/movies', (req, res) => {
	console.log(req.body);
    res.sendStatus(201);
})

// Second solution
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/movies', urlencodedParser, (req, res) => {
	console.log(req.body);
    res.sendStatus(201);
})
```

## Install multer middleware for form post

```ssh
npm i --save multer
```

Update the app.js file

```js
const multer = require('multer');
```

#### jsonwebtoken install in dependencies 
```ssh
npm i --save jsonwebtoken
```

Update the app.js file with jsonwebtoken params

```js
const jwt = require('jsonwebtoken');

const secret = 'giqiqojfdislsdk18HHHSKDznvdinlwzcdsvssdvsqvs'
```
#### Présentation d'un token valide lors de requetes sur des url
#### Install middleware express-jwt to valid status of jwt via jsonwebtoken for give url access

```ssh
npm i --save express-jwt
```
Update the app.js file with express-jwt params
```js
const ejwt = require('express-jwt');
```

## Install Mongoose for discuss database in dependencies
   ```ssh
   npm install mongoose --save
   ```
   Update the app.js file with mongoose params
   ```js
   const mongoose = require('mongoose');
   
   mongoose.connect('mongodb+srv://pinpon:<motdepasse>@cluster0.d6tui.mongodb.net/<nombasededonnees>?   retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
   
   // affichage du statut de connection
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
   
   const myMovie = new Movie({
       movietitle:'Terminator',
       movieyear: 1984
   });
   
   //creation methode de sauvegarde de donnees
   myMovie.save((err, savedMovie) => {
       if(err) {
           console.error(err);
       }
       else {
           console.log('savedMove', savedMovie);
       }
   });
   ```


## Install faker for generate fake data in dev dependencies

```ssh
npm i faker --save-dev
```

Update the app.js file with mongoose params
   ```js
   const faker = require('faker');

   ```

## Architecture
```ssh
|_public
	|_style.css
|_views
	|_partials
		|_footer.ejs
		|_header.ejs
	|_index.ejs
	|_login.ejs
	|_movie-details.ejs
	|_movie-search.ejs
	|_movie.ejs
|_app.js
|_package-lock.json
|_package.json
|_README.md


```



## Run app commands
```ssh
<!-- first run -->
$ node app.js
<!-- after nodemon install -->
$ nodemon app.js
<!-- after scripts update -->
$ npm run dev
<!-- in product mode -->
$ npm run start
```
```ssh
```


## Template syntax

##### To use partials files in the template use the above syntax for import a .ejs file like a component
<%- include ('./partials/header') %>

##### To use binding from a .js file
```ssh
<h1><%= title %></h1>
```  
##### loop example for an array
```ssh
<div>
    <% for(movie of movies) {%>
        <div><%= movie.title %> (<%= movie.year %>)</div>
        <% } %>
</div>
```

<h4 align="center"> Technologies used</h4>
<p align="center">
<img src="https://devicons.github.io/devicon/devicon.git/icons/javascript/javascript-original.svg" title="Javascript" alt="Javascript logo" width="30" height="30"/> 

<img src="https://raw.githubusercontent.com/devicons/devicon/0d6c64dbbf311879f7d563bfc3ccf559f9ed111c/icons/nodejs/nodejs-original.svg" title="NodeJS" alt="nodejs logo" width="30" height="30"/>
<img src="https://devicons.github.io/devicon/devicon.git/icons/express/express-original-wordmark.svg" title="Express" alt="Express logo" width="30" height="30"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/0d6c64dbbf311879f7d563bfc3ccf559f9ed111c/icons/npm/npm-original-wordmark.svg" title="NPM" alt="npm logo" width="30" height="30"/> 
<img src="https://raw.githubusercontent.com/devicons/devicon/0d6c64dbbf311879f7d563bfc3ccf559f9ed111c/icons/github/github-original.svg" title="Github" alt="github logo" width="30" height="30"/> 
<img src="https://raw.githubusercontent.com/devicons/devicon/0d6c64dbbf311879f7d563bfc3ccf559f9ed111c/icons/git/git-original.svg" title="Git" alt="git logo" width="30" height="30"/> 
<img src="https://devicons.github.io/devicon/devicon.git/icons/mysql/mysql-original-wordmark.svg" title="MySQL" alt="MySQL logo" width="30" height="30"/> 
<img src="https://raw.githubusercontent.com/DOligex/devIcons/565d64c36c51fe277b4890b3a4c1f17686355123/postman.svg" title="Postman" alt="Postman logo" width="30">
<img src="https://raw.githubusercontent.com/devicons/devicon/0d6c64dbbf311879f7d563bfc3ccf559f9ed111c/icons/apple/apple-original.svg" title="Mac" alt="Apple logo" width="30" height="30"/>
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/36c6d3ef63c06fe942b62da9303b559d8b4535b3/icons/vscode.svg" title="VSCode" alt="VSCode logo" width="30" height="30"/>

</p>

#### Tools documentation :
|Outils  | Documentation| 
|--|--|
| Git  | [https://git-scm.com/docs/git-remote](https://git-scm.com/docs/git-remote) |

<h4>Version 1.0</h4>

<!-- 
|  |Credits|Documentation| 
|--|--|--|
| Demo Images | Unsplash  | [Unsplash.com](https://unsplash.com/) |
| Icons | Font Awesome  | [fontawesome.io](https://fontawesome.com/?from=io) |
| Other | jQuery   | [jquery.com](https://jquery.com/) |
| Other | Scrollex  | [github.com/ajlkn/jquery.scrollex](https://github.com/ajlkn/jquery.scrollex) |
| Other | Responsive Tools  | [github.com/ajlkn/responsive-tools](https://github.com/ajlkn/responsive-tools) |

	Icons:
		Font Awesome (fontawesome.io)

	Other:
		jQuery (jquery.com)
		Scrollex (github.com/ajlkn/jquery.scrollex)
		Responsive Tools (github.com/ajlkn/responsive-tools)
 -->

#### Source :
Udemy 
<!-- 
Massively by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)


This is Massively, a text-heavy, article-oriented design built around a huge background image (with a new parallax implementation I'm testing) and scroll effects (powered by
Scrollex). A *slight* departure from all the one-pagers I've been doing lately, but one that fulfills a few user requests and makes use of some new techniques I've been wanting
to try out. Enjoy it :)

Demo images* courtesy of Unsplash, a radtastic collection of CC0 (public domain) images you can use for pretty much whatever.

(* = not included)

AJ
aj@lkn.io | @ajlkn

|  |Credits|Documentation| 
|--|--|--|
| Demo Images | Unsplash  | [Unsplash.com](https://unsplash.com/) |
| Icons | Font Awesome  | [fontawesome.io](https://fontawesome.com/?from=io) |
| Other | jQuery   | [jquery.com](https://jquery.com/) |
| Other | Scrollex  | [github.com/ajlkn/jquery.scrollex](https://github.com/ajlkn/jquery.scrollex) |
| Other | Responsive Tools  | [github.com/ajlkn/responsive-tools](https://github.com/ajlkn/responsive-tools) |

-->