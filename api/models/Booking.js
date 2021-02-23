const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
      },
      customer:{
        type: ObjectId,
        ref: "User",
    },  
    filling:[String],
    pump:{
        type: ObjectId,
        ref: "Pump",
    },  
},
{ timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;