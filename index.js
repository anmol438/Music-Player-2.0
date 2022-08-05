const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(expressLayouts);

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