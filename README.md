# Express Movies 

This project was generated with 
[Node.js](https://nodejs.org/fr/) version 13.12.0.
[NPM](https://www.npmjs.com/) version 6.14.4

## Architecture
```ssh

|_controllers
	|_authController.js
	|_movieController.js
|_models
	|_Movie_.js
|_public
	|_css
	    |_style.css
|_views
	|_partials
		|_footer.ejs
		|_header.ejs
	|_index.ejs
	|_login.ejs
	|_member-only.ejs
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
<!-- in dev mode -->
$ npm run dev
<!-- in product mode -->
$ npm run start
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
<img src="https://raw.githubusercontent.com/devicons/devicon/40cd6bc89a299dc50ac289f8e3b071d0dff49d9c/icons/mongodb/mongodb-original.svg" title="MongoDB" alt="MongoDB logo" width="30" height="30"/> 
<img src="https://raw.githubusercontent.com/devicons/devicon/0d6c64dbbf311879f7d563bfc3ccf559f9ed111c/icons/npm/npm-original-wordmark.svg" title="NPM" alt="npm logo" width="30" height="30"/> 
<img src="https://raw.githubusercontent.com/devicons/devicon/0d6c64dbbf311879f7d563bfc3ccf559f9ed111c/icons/github/github-original.svg" title="Github" alt="github logo" width="30" height="30"/> 
<img src="https://raw.githubusercontent.com/devicons/devicon/0d6c64dbbf311879f7d563bfc3ccf559f9ed111c/icons/git/git-original.svg" title="Git" alt="git logo" width="30" height="30"/> 
<img src="https://raw.githubusercontent.com/DOligex/devIcons/565d64c36c51fe277b4890b3a4c1f17686355123/postman.svg" title="Postman" alt="Postman logo" width="30">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/36c6d3ef63c06fe942b62da9303b559d8b4535b3/icons/vscode.svg" title="VSCode" alt="VSCode logo" width="30" height="30"/>

</p>

#### Tools documentation :
|Outils  | Documentation| 
|--|--|
| Git  | [https://git-scm.com/docs/git-remote](https://git-scm.com/docs/git-remote) |
| MongoDB  | [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas-signup-from-mlab?utm_source=mlab.com&utm_medium=referral&utm_campaign=mlab%20signup&utm_content=blue%20sign%20up%20button) |


| Source  | Documentation| 
|--|--|
| Udemy | [https://www.udemy.com/](https://www.udemy.com/) | 

<h4>Version 1.0</h4>