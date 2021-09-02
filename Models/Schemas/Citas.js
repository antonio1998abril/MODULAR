const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const dateSchema = new Schema({
    Title:{
        type: String,
        required: true
    },
    Content: {
        type:String,
        required: true
    },
    datetocomplete: {
        type:Date,
        required: true
    },
    Status: {
        default:false,
        type:Boolean,
        required: true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }},
    {
    timestamps: true
  })

module.exports = dateSchema