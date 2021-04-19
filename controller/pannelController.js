const Service = require('../modules/servicesModule');
const Client = require('../modules/clientModules');
// const liveStream  = require('../socket');

//Services Controller
exports.getPannelController = async (req,res,next)=>{
    const findServices = await Service.find();
    res.status(200).json({
        length:findServices.length,
        status:'success',
        service:findServices
    })
}


exports.getServicesById = async(req,res)=>{
    try{
        const getServId = await Service.findById(req.params.id);
        res.status(200).json({
            status:'success',
            data:getServId
        })
    }catch(err){
        res.status(400).json({
            status:'error',
            message:'Invalid data request'
        })
    }
}

exports.findUpdateService = async(req,res)=>{
    try{
        const updateServ  = await Service.findByIdAndUpdate(req.params.id,req.body,{
            new: true
        });
        res.status(200).json({
            status:'success',
            data:updateServ
        })
    }catch(err){
        res.status(400).json({
            status:'error',
            message:'Invalid data request'
        })
    }
}


exports.createPannelServices = async(req,res) =>{
    try{
        const createService = await Service.create(req.body);
        // liveStream.getIO.emit('newposts',{
        //     action:'create',
        //     post:post
        // });
        res.status(201).json({
           length:createService.lengnth,
           status:"success",
            data:{
                services:createService
            }
        });
    }catch(err){
        res.status(400).json({
            status:'error',
            message:'Invalid data request'
        });
    }
}

exports.deleteServices = async(req,res) =>{
    const deleteService = await Service.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status:'success',
        data:null
    })
}


//Client Controller
exports.getAllClients = async(req,res,next)=>{
    const getClients = await Client.find();
    
    // ({
    //     path:'services',
    //     fields:'serviceName'
    // });
    res.status(200).json({
        length:getClients.length,
        status:'success',
        client:getClients
    })
}


exports.createUserPannel = async(req,res) =>{
    try{
        const createClient = await Client.create(req.body);
        res.status(201).json({
            length:createClient.length,
            status:'success',
            data:{
                clients:createClient
            }
        })
    }catch(err){
        res.status(400).json({
            status:'error',
            message:'Invalid data request'
        })
    }
}

exports.findClientById = async(req,res)=>{
    try{
        const clientId = await Client.findById(req.params.id);
        req.status(200).json({
            status:'success',
            data:clientId
        })
    }catch(err){
        res.status(400).json({
            status:'error',
            message:'Invalid data request'
        })
    }
}

exports.updateClient = async(req,res)=>{
    try{
        const updateClient = await Client.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });
        res.status(200).json({
            status:'success',
            data:updateClient
        }) 
    }catch(err){
        res.status(400).json({
            status:'error',
            message:'Invalid data request'
        })
    }
}

exports.deleteClient = async(req,res)=>{
    const delClient = await Client.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status:'success',
        data:null
    })
}