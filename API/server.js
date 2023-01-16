const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.SERVER_PORT || 3000;
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//database
mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection ;

database.on('error', (error) =>{
    console.log(error);
}); 

database.once('connected', () => {
    console.log("The connection to the database is a success.");
});

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", `http://localhost:3000`);
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

var corsOption = {
    origin:"http://localhost:3000"
};

app.use(cors(corsOption));


app.use(helmet());
app.use(express.json());
app.use(cookieParser());

var userRoutes = require("./routes/user.route.js");
var channelRoutes = require("./routes/channel.route.js");
var memberRoutes = require("./routes/member.route.js");
var messageChannelRoutes = require("./routes/message_channel.route.js");
var messagePrivateRoutes = require("./routes/message_private.route.js");

app.use("/api/users", userRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/messagesChannel", messageChannelRoutes);
app.use("/api/messagesPrivate", messagePrivateRoutes);


app.listen(port, () =>{
    console.log("Server is running on http://localhost:3000/ .");
});