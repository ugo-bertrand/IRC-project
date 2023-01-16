const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    description:{
        required:false,
        type:String
    }
});

module.exports = mongoose.model('Channel', dataSchema);