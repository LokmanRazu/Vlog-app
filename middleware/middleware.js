const express = require('express');
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const {binduserWithRequest} = require('./authMiddleWare')
const setLocals = require('./setLocals')

// CONNCET SESSION TO MONGODB
var store = new MongoDBStore({
    uri: 'mongodb+srv://EagleBlog:LmBw7OxFzn7RK5Fq@cluster0.pnxzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    collection: 'sessions',
    expires:1000*60*60*2
  });

const Middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret:process.env.SECRET_KEY || 'SECRET_KEY',
        resave:false,
        saveUninitialized:false,
        store: store //MONGODB CONNECT SESION

    }),
    binduserWithRequest(),
    setLocals()
];

module.exports = app =>{
    Middleware.forEach(m =>{
        app.use(m)
    })
}