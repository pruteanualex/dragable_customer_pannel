const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../modules/usersModule');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');
  /**Note
         * ///////////////////////////////////
         * payload  =  Created User ID
         * secretOrPrivateKey  =  JWT_SECRET
         * options = JWT_EXPIRES_IN
         * ////////////////////////////////////
         */

const singToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        });
}

//Create cookie token

const createSendToken = (user, statusCode,res)=>{
  
    const token = singToken(user._id);
      //how to set cookie in node js
      const cookieOptions = {
          expires:new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
          httpOnly:true
      };
        if(process.NODE_ENV === 'production') createSendToken.secure = true;
  
        res.cookie('jwt',token,cookieOptions);
      //remove password from output
        user.password = undefined;
      //how to set cookie in node js
  
      res.status(statusCode).json({
        status:"success",
        token,
        data:{
          user
        }
      });
  };
  

//Use This Function Because the user accounts are created by admin from a protect route
exports.singup = catchAsync(async(req,res)=>{
    
    const newUser  =  await User.create(req.body);
        // createSendToken(newUser,201,res);
        res.status(201).json({
            status:"success",
             data:{
                 user:newUser
             }
         });
});




exports.login = catchAsync(async(req,res,next)=>{
    
        const {email, password} = req.body;

        //1) Check if email and password exist
        if(!email || !password){
            return next(new AppError('Adresa de Email si Parola nu corespund!!!',400));
        }

        //2) Check if users && password is correct
        const user = await User.findOne({email}).select('+password');
    

        if(!user || !await user.correctPassword(password,user.password)){
            return next(new AppError('Adresa de email sau parola sunt incorecte!!!',401));
        }
        //3) If everything ok, send token to client
        createSendToken(user,201,res);
  
     
});


exports.logout = (req,res)=>{
    res.cookie('jwt','loggedout',{
        expires:new Date(Date.now() + 10 * 1000),
        httpOnly:true
    });
    res.status(200).json({
        status:'success'
    });
}



//Function which block acces to users that are not loggin in platform
exports.protect = catchAsync(async(req,res,next)=>{
    let token;
        //1) Get token and check is is there    
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }else if(req.cookies.jwt){
            token = req.cookies.jwt;
        }

        if(!token){
            return next(new AppError('Nu sunte-ti inregistrat,pentru a avea acces la aceasta pagina trebuie sa va inregistrati.',401));
        }
        //2) Verification token
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
        //3) Check is users still exists
        const freshUser = await User.findById(decoded.id);
    
        if(!freshUser){
            return next(
                new AppError(
                    'The token belonging to this user dose no longer exist.',
                    404
                )
            );
        }
        //4) Check if user changed password the JWT after the token was issued
        if(!freshUser.changePasswordAfter(decoded.iat)){
            return next(new AppError('User succesfully change password! Please loin again.',401))
         }

        //After All are passed 
        //GRANT ACCESS TO PROTECTED ROUTE 
        req.user = freshUser;
        next();
});


//This is only for render Pages in front end
exports.isLoggedIn = async(req,res,next)=>{
    let token;
    // try{
        if(req.cookies.jwt){
            try{
                token = req.cookies.jwt;
                //Verify the token
                const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)
                
                //2) Check is users still exists
                const freshUser = await User.findById(decoded.id);
            
                if(!freshUser){
                    return next();
                }
                //4) Check if user changed password the JWT after the token was issued
                if(!freshUser.changePasswordAfter(decoded.iat)){
                    return next()
                }
                
                //there is a logged user
                res.locals.user = freshUser;
                return next();
            }catch(err){
                return next();
            }
        }
        next();
}


exports.restrictTo = (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return next(new AppError('Nu ai permisiunea de a face actioune,doar administratorul si editori pot.',403))
        }
        next();
    }
}




exports.forgotPassword = catchAsync(async (req,res,next)=>{
   //1) find user after email 
   const user = await User.findOne({email:req.body.email});
   if(!user){
       return next(new AppError('There is no user with that emil adress',401));
   }

   const resetToken = user.createPasswordRestetToken();
   await user.save({validateBeforeSave:false});

   //get url app
   const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
   //prepare the message from email that will be send
   const message = `<span>Forgot your password Submit a PATCH request with your new password ans passwordConfirm to:<a href="${resetURL}" target="_blank">${resetURL}</a>.\ if you 
   didn't forget your password,please ignore this email!</span>`;

   try{
       await sendEmail({
        email:user.email,
        subject:'Your password resete token(valid for 30 min)',
        message
       });
       res.status(200).json({
        status:'success',
        message:'Token send to email!'
    })

   }catch(err){
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({validateBeforeSave:false});

    return next(new AppError(`There was an error sending the email.Try again later!${err }`,500));
   }
})

//Dosent Work
exports.resetPassword = catchAsync(async (req,res,next)=>{
 
   //1) encrypte token to compare 
    const hashToken = crypto
        .createHash('sha256')
        .update(req.params.token_reset)
        .digest('hex');

    //2) Find user after passwordResetToken
    const user =  await User.findOne({
        passwordResetToken:hashToken,
        passwordResetExpires:{$gt:Date.now()}
    });

    if(!user){
        return next(new AppError('Token is invalid or has expired.',400));
    }
    //3)Update passwordChangeAt property for this user 
    user.password = req.body.password,
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    //4)Log the user in, send JWT to the client
    createSendToken(user,201,res);
    
    res.status(201).json({
        status:"success",
        message:"Password Was Change!!!"
    })
});




//This work but I must to disable required password confirm
exports.updateMyPassword =catchAsync(async (req,res,next)=>{

        //1) Get user from the collection
        const user = await User.findById(req.user.id).select('+password');
        //2) Check if posted password is correct
        if(!(await user.correctPassword(req.body.passwordCurrent, user.password))){
           return next(new AppError('Parola ta curenta este gresita!!!')); 
        }
        //3) If so,update password
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();
        //4) Log user in, send JWT
        createSendToken(user,201,res);
        
        next();
});


exports.getAllUsers =catchAsync(async(req,res)=>{
    
       const users = await User.find();
       res.status(200).json({
           length:users.length,
           success:'success',
           data:{
             users 
           }
       });  
});


exports.getUser =catchAsync(async(req,res)=>{
    
        const oneuser = await User.findById(req.params.user_id);
        
        console.log(req.params.user_id);
        res.status(200).json({
            length:oneuser.length,
            success:'success',
            data:{
              user:oneuser 
            }
        });  
})


exports.updateUser = catchAsync(async(req,res)=>{
        const user_update = await User.findByIdAndUpdate(req.params.user_id,req.body);
        res.status(200).json({
            status:'success',
            data:user_update
            
        })
        res.status() 
});

exports.updateMyPersonalData = catchAsync(async(req,res)=>{
 const updateMy = await User.findByIdAndUpdate(req.params.myId,req.body);
    res.status(200).json({
        status:'success',
        data:updateMy
    });
});


exports.deleteUser = catchAsync(async(req,res)=>{
  
        const delete_user = await User.findByIdAndDelete(req.params.user_id);
        res.status(204).json({
            status:'success',
            data:null
        });
});