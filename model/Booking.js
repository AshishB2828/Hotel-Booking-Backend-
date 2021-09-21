const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({

    room:{type:String, required:true},
    roomId:{type:String, required:true},
    userId:{type:String, required:true},
    fromDate:{type:String, required:true},
    toDate:{type:String, required:true},
    totalDays:{type:Number, required:true},
    totalAmount:{type:Number, required:true},
    transactionId:{type:String, required:true},
    status:{type:String, default:'booked'},
    
},{
    timestamps: true
})

module.exports = mongoose.model('Booking', bookingSchema)