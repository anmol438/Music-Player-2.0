const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/paradoxio-database');

db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to paradoxio database"));
db.once('open', ()=>{
    console.log("Successfully connected to Paradoxio database : MongoDB");
});

module.exports = db;