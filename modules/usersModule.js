const crypto = require('crypto');
const mongoose = require('mongoose');
const validator  =require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Numele este obligatoriu!!!']
    },
    email:{
        type:String,
        required:[true,'Email-ul este obligatoriu!!!'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Format Incorect!!!']
    },
    role:{
        type:String,
        enum:["administrator","editor","utilizator"],
        default: "utilizator"
      },
      password:{
        type:String,
        require:[true,'Parola este obligatorie!!!'],
        minlength: 8,
        select:false,
        select:false
      },
      passwordConfirm:{
          type:String,
          //required:[true,'Confirmatii Parola!!!'],
          validate:{
              validator:function(el){
                return el === this.password;
              }
          },
          message:'Parolele nu corespund!!!'
      },
      passwordChangeAt:Date,
      passwordResetToken:String,
      passwordResetExpires:Date
});


userSchema.pre('save', async function(next){
    //run this function if password was actually modified
    if(!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password = await bcrypt.hash(this.password,12);

    //Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function(candidatPassword,userPassword){
    return await bcrypt.compare(candidatPassword, userPassword);
}



userSchema.methods.changePasswordAfter  = async function(JWTTimestamp){
    if(this.passwordChangeAt){
      const changeTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);

      return JWTTimestamp < changeTimeStamp;
    } 
    //Not change
    return false;
  } 



 userSchema.methods.createPasswordRestetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = 
        crypto  .createHash('sha256')
                .update(resetToken)
                .digest('hex');
       
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    return resetToken;            
 }
  
const User = mongoose.model('User',userSchema);

module.exports = User;