/*
*** Install ***
* Install via command : `npm install`
* Then you can uses the Tasks :
* - `gulp dev` -> on local (does not minify css and js) + watch
* - `gulp delivery` -> same + minify css/js
* - `gulp clear` -> clear cache
* - `gulp images` -> minify images
* 
*** Updating dependencies ***
* Install globally the npm-check-updates package via : `npm i -g npm-check-updates`
* then in you gulp folder in your project you can check for dependencies update :
* first you check for updates, then you install them.
* - `npm-check-updates -u`
* - `npm install`
*
*** .gitignore dist ***
* Files generated goes in /public/dist/.
* A .gitignore files should be in the /dist/ folder and should ignore : /css/ & /js/
* Do not ignore /images/ folder since it won't be generated through the deploy
*
*** Autoprefixer ***
* There's also the autoprefixer package which automatically adds vendor prefixes on your css rules.
* github link : https://github.com/postcss/autoprefixer
* It uses browserslist param which takes different queries. You can find some of them here : https://github.com/ai/browserslist#queries
* And you can test your queries here : http://browserl.ist/
* 
*/