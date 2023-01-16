const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    message:{
        required:true,
        type:String
    },
    date:{
        required:true,
        type:Date
    },
    user_id:{
        required:true,
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }
});

module.exports = mongoose.model('MessageChannel', dataSchema);