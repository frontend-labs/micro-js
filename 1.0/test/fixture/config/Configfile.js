var basePath = "/usr/local/share/";

var config ={};
config.babel = {
    src:[
        basePath + 'input/es6/*.js',
        basePath  + 'input/es6/**/**/*.js',
        '!' + basePath + 'input/es6/_**/*.js',
        '!' + basePath + 'input/es6/**/_*.js'
    ],
    build: basePath + "output/js/scripts/",
    options: {
        presets: ['es2015']
    }
};

config.js = {
    recursiveFolder:{
        src: basePath + "output/js/scripts",
        build: basePath + "output/js/dist/"
    },
    rename:{
        options:{
            extname: ".min.js"
        }
    },
    uglify:{
        mangle: false,
        compress: {
            drop_console: false
        }
    },
    hint:{
        jshintrc: '.jshintrc',
        reporterStyle: 'jshint-stylish',
        reporter: 'fail'
    }
};

module.exports=config;
