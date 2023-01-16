const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
    message:{
        required:true,
        type:String
    },
    date:{
        required:true,
        type:Date
    },
    user_from_id:{
        required:true,
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    },
    user_to_id:{
        required:true,
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    },
});

module.exports = mongoose.model('MessagePrivate', dataSchema);