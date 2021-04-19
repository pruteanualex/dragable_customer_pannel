const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Clientul trebuie sa aibe un nume!!!']
    },
    fbPageName:String,
    fbPageLink:String,
    clientWebsiteName:String,
    clientWebsiteeLink:String,
    services:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Service'
        }
    ]
    
},
{
    toJSON:{ virtuals:true },
    toObject:{ virtuals:true }
})


clientSchema.pre(/^find/,function(next){
    this.populate({
        path:'services'
      });
    next();
});


const Client = mongoose.model('Client',clientSchema);

module.exports = Client;