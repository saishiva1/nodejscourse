const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber:{
        type:Number,
        default:100
    },
    launchDate:{
        type:Date,
        required:true
    },
    mission:{
        type:String,
        required:true
    },
    rocket:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    },
    upcoming:{
        type:Boolean,
        required:true,
        default:true
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    },
    customers:{type:[String],default:[]}
});

module.exports = mongoose.model('Launch',launchesSchema);