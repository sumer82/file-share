require('dotenv').config;
const express = require("express");
const app = express();
const path =require('path');

//database connection 
const connectDB = require('./config/db');
connectDB();

/*
app.use(bodyParser.urlencoded({
    extended: true,
 }));
 
 app.use(bodyParser.json());
*/

//templete engine
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs');
//static files
app.use(express.static(__dirname + '/views'));

//routes 
app.use('/api/files',require('./routes/files'));
app.use('/files',require("./routes/show"));
//file download route
app.use('/files/download' ,require('./routes/download'));
app.get('/',(req,res) =>{
    res.render('upload');
  });
//server setup

const PORT = 5000;
app.listen(PORT ,() => {
    console.log(`server runnning at ${PORT}`)
});