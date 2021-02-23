const Pump = require("../models/Pump")
const Booking = require("../models/Booking")
module.exports = {
    /* to get all the petrol pumps details*/
    getAllPumps:async(req,res)=>{
        let body  = await Pump.find({});
        res.status(200).json({
            length:body.length,
            msg:"result found",
            body:body});
    },
    /* to create a new petrol pump */
    createPump:async(req,res)=>{
        try{
            let body =await Pump.create(req.body);
            res.status(200).json({             
                "msg":"created new pump","body":body})   
        }catch(err){
            console.log(err.message)
            res.status(500).json({"msg":"something goes wrong","body":err})   
        }
    },
    getAllPumpsnearme:async(req,res)=>{
        try{
            // get the location or lat, long from the req object
            // and find the nearest pumps
            const { location } = req.query
            let filling = await req.query.filling.split(',')
            let promise1 = Pump.find({ filling: 'diesel' })
            let promise2 = Pump.find({ filling: 'petrol' })
            Promise.all([promise1, promise2]).then((values) => {
                res.json({
                    "petrol":values[1],
                    "diesel":values[0]})
              });   
        }catch(err){
            res.status(500).json({
                msg:"Oops! something went wrong",
               });
        }
    },
    pushFilling: (req,res)=>{
        
        Pump.updateOne(
            { _id: req.params.id },
            { $push: { filling: req.body.filling } }
         ).then(data=>{
             res.status(200).json({'data':data})
         }).catch(err=>{
             res.status(500).json({'data':err.message})
         })

    } ,
    booking:async(req,res)=>{
        try{
            let body =await Booking.create(req.body);
            res.status(200).json({             
                "msg":"booked successfully","body":body})   
        }catch(err){
            console.log(err.message)
            res.status(500).json({"msg":"something goes wrong","body":err})   
        }
    },
    allbookings:async(req,res)=>{
        try{
            let body = await Booking.aggregate([{
                $lookup:
                    {
                        from: 'users',
                        localField: "customer",
                        foreignField:"_id",                      
                        as: 'userstatus',
                    },        
            },
            {
                $match:{'userstatus.status':"blocked"}}
        ])
            res.status(200).json({             
                "records":body.length,"body":body})   
        }catch(err){
            console.log(err.message)
            res.status(500).json({"msg":"something goes wrong","body":err})   
        }
    }  
}