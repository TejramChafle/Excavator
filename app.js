var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');


// Swagger document
var swaggerJSDoc = require('swagger-jsdoc');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/excavator')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

// mongoose.connect('mongodb+srv://tejram:wizbeeuser@cluster0-qeebj.azure.mongodb.net/test?retryWrites=true')

var app = express();


// ------------------------------------------------------------------------------------
// Swagger definition
// ------------------------------------------------------------------------------------

var swaggerDefinition = {
    info: {
        title: 'Excavator Node API',
        version: '1.0.0',
        description: 'Excavator RESTful API documentation with Swagger.',
    },
    host: 'localhost:3000',
    basePath: '/'
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
// ------------------------------------------------------------------------------------



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/fuse')));


// SET the frontend/angular routes

// root
app.use('/', express.static(path.join(__dirname, 'dist/fuse')));

// authentication
app.use('/auth/login', express.static(path.join(__dirname, 'dist/fuse')));
app.use('/auth/forgot-password', express.static(path.join(__dirname, 'dist/fuse')));
app.use('/auth/lock', express.static(path.join(__dirname, 'dist/fuse')));
app.use('/auth/mail-confirm', express.static(path.join(__dirname, 'dist/fuse')));
app.use('/auth/register', express.static(path.join(__dirname, 'dist/fuse')));
app.use('/auth/reset-password', express.static(path.join(__dirname, 'dist/fuse')));

// confiuration
app.use('/contacts', express.static(path.join(__dirname, 'dist/fuse')));

app.use('/sample', express.static(path.join(__dirname, 'dist/fuse')));
app.use('/swagger', express.static(path.join(__dirname, 'swagger')));


// Set the route for the incoming request
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bill', require('./routes/bill'));
app.use('/api/client', require('./routes/client'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/contractor', require('./routes/contractor'));
app.use('/api/fuel-resource', require('./routes/fuel-resource'));
app.use('/api/service', require('./routes/service'));
app.use('/api/tag', require('./routes/tag'));
app.use('/api/user', require('./routes/user'));
app.use('/api/vehicle', require('./routes/vehicle'));
app.use('/api/work', require('./routes/work'));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.send(err.status); // deprecated
    res.sendStatus(err.status);
});

module.exports = app;
