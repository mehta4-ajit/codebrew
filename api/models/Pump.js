const mongoose = require('mongoose');
const pumpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [40, 'Name must have less or equal then 40 characters'],
        minlength: [5, 'Name must have more or equal then 10 characters']
      },
    filling:[String],
    address :{type:String},
   
    // owner:{type:String},
    // image:[{type:String}],
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
    }
},
{ timestamps: true }
);
 pumpSchema.index({location: '2dsphere' })
const Pump = mongoose.model('Pump', pumpSchema);

module.exports = Pump;