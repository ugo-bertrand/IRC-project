const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    firstname:{
        required:true,
        type:String
    },
    username:{
        required:true,
        unique:true,
        type:String
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});

module.exports = mongoose.model('User', dataSchema);