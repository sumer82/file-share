require('dotenv').config();
const mongoose = require('mongoose')


function connectDB(){
    //connection with database
    mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true,useUnifiedTopology:true});
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("connected to database");
    })
}


module.exports=connectDB;