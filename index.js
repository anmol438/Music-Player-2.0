const { urlencoded } = require('express');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


const app = express();

app.use(express.urlencoded());
app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', './layouts/layout');




app.use('/',  require('./routes/index'));

const port = 5000;
app.listen(port, (err) => {
    if(err){
        console.log(`Error in listening to express server at port : ${port}`);
        return;
    }

    console.log(`Express server is up and running at port : ${port}`);
})