const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.SERVER_PORT || 3000;

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection ;

database.on('error', (error) =>{
    console.log(error);
}); 

database.once('connected', () => {
    console.log("The connection to the database is a success.");
});

app.get("/", (req,res) =>{
    res.set('Content-Type', 'text/html');
    res.send('Bienvenue sur notre chat');
});


app.listen(port, () =>{
    console.log("Server is running on http://localhost:3000/ .");
});