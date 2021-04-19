const Services = require('../modules/servicesModule');
const Client = require('../modules/clientModules');
const User = require('../modules/usersModule')
const catchAsync = require('../utils/catchAsync');

exports.createServiceForm = (req,res,next) =>{
    res.status(200).render('../views/forms/createService',{
        title:'Create Service'
    })
}

exports.createClient = (req,res,next) =>{
    res.status(200).render('../views/forms/createClient',{
        title:'Create Client'
    })
}

exports.getAllServices = async (req,res,next) =>{
    const services = await Services.find();
    const clients = await Client.find();
    res.status(200).render('../views/pannel',{
        services:services,
        clients:clients,
        title:'Social Media Pannel'
    })
} 

exports.getServiceById = async(req,res)=>{
    const serviceId = await Services.findById(req.params.id);
    res.status(200).render('../views/forms/editService',{
        title:'Edit Service',
        serviceid:serviceId
    }) 
}

exports.getClientById = async(req,res)=>{
    const clientId = await Client.findById(req.params.id);
    res.status(200).render('../views/forms/editClient',{
        title:'Edit Customer',
        client:clientId
    }) 
}


exports.getLoginTemp = (req,res)=>{
    res.status(200).render('../views/forms/login',{
        title:'Login'
    })
}

exports.singInAdmin = async(req,res)=>{
    res.status(200).render('../views/forms/singIn',{
        title:'Create User'
    })
}

exports.getAllUsers = async(req,res)=>{
    const getAllUsers = await User.find();
    res.status(200).render('../views/user/allUsers',{
        title:'Get All Users',
        panou_user:getAllUsers
    })
}

exports.getUser = catchAsync(async(req,res) =>{
    const getUser = await User.findById(req.params.user_id);
    res.status(200).render('../views/user/getUser',{
        title:'User',
        userid:getUser
    });
});

exports.forgottPassword = async (req,res)=>{
    res.status(200).render('../views/forms/forgottPassword',{
        title:'Forgott Password'
    });
}

exports.resetPassword = async (req,res)=>{
    res.status(200).render('../views/forms/resetPassword',{
        title:'Reset Password'
    });
}

exports.updateMyAccount =  catchAsync(async(req,res)=>{
    res.status(200).render('../views/myAccount',{
        title:'My Account'
    });
});

exports.createProducts = async (req,res)=>{
    res.status(200).render('../views/createProducts',{
        title:'Create Products'
    });
}