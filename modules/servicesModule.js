const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    serviceName:{
        type:String,
        required:[true,'Servicul trebuie sa aibe un nume!!!']
    },
    descriereServiciu:{
        type:String,
        required:[true,'Serviciul trebuie sa aibe o descriere!!!']
    }
});

const Service = mongoose.model('Service',servicesSchema);

module.exports = Service;