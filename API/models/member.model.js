const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    channel_id:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    },
    user_id:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
module.exports = mongoose.model("Member",dataSchema);