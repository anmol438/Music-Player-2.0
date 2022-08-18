const { urlencoded } = require('express');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);

const flash = require('connect-flash');
const flashMware = require('./config/middleware').setFlash;


const app = express();

app.use(express.urlencoded());
app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', './layouts/layout');

app.use(
    session({
        name:'paradoxio',
        secret:'paradoxio',
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge: 1000*60*60*24*30
        },
        store: new mongodbStore({
            uri:'mongodb://localhost:27017/paradoxio-database',
            autoRemove: 'disabled'
        },
        (err) => {
            if(err){
                console.log("Error in settin up store for connect-mongodb-session ---> ", err);
            }
            return;
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.set_auth_user);
app.use(flash());
app.use(flashMware);


app.use('/',  require('./routes/index'));

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if(err){
        console.log(`Error in listening to express server at port : ${port}`);
        return;
    }

    console.log(`Express server is up and running at port : ${port}`);
})