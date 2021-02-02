const mongoose = require('mongoose');
const subscriberSchema = new mongoose.Schema({
    name:{
       type: String,
       required: true
    },
    subscribeToChannels: {
         type: String,
         required: true,
    },
    subscribeToDate: {
         type: Date,
         required: true,
         default: new Date()
    }
})

 

module.exports = mongoose.model("Subscriber", subscriberSchema);