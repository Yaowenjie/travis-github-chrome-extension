# Development 

## Install
Please use `npm` to install all the dependencies.
```
npm install
```

## During development
After you install as above successfully, you can just run `gulp` to generate the usable package in `dist` folder. 

However, during development, I recommend you use `gulp watch` to generate that dynamically (it will watch the change in js files).

## Build zip package
Just run `gulp build`, you'll see the zip package in `build` folder. It should be only used for me to publish in chrome extension webstore if no special circumstances. 

## Test & Lint
`gulp test` will run all unit tests, and `gulp lint` will check some basic js format/grammar. 

## Stacks & Tools
 - jQuery
 - CanvasJS
 - gulp
 - babel (ES6)
 - mocha & chai & sinon
 - eslint
 
  
