const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide a email'],
      },

    password :{
        type:String,
        required: [true, 'Please provide a email'],
    },
    role:{
        type: String,
        enum:['user','owner'],
        default:"user"
    },
    status:{
        type:String,
        enum:['active','blocked','inactive'],
        default:"active"
    }
},
{ timestamps: true }
);
userSchema.pre(/^find/,function(next){
    this.find({ status: 'active' });
    next()
})
const User = mongoose.model('User', userSchema);

module.exports = User;