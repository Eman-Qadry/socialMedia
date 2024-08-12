const User=require('../models/user');
const creatJWT=require('../config/jwt');
const bcrypt=require('bcryptjs');
exports.register=async (req,res,next)=>{
   
const {firstName,lastName, email,password, birthday,gender}=req.body;
const hashedPassword = await bcrypt.hash(password, 12);
const user= new User({
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:hashedPassword,
    birthday:birthday,
    gender:gender

});
const saveduser =await user.save();
if (!saveduser){
const err=new Error('can not save user');
next(err);
}
res
.status(200)
.json('user sign up successfully, now you can login ');
};
exports.login=async (req,res,next)=>{
    const { email,password}=req.body;
    const user = await User.findOne({email:email});
    if (!user){
      res
     .status(404)
     .json('could not find user with this email , you can try to sign up');
    }
    const isEqual= user.correctpasssword(password,user.password);
    if (isEqual){
        // create json web token
       const token= creatJWT(user._id);
        res
        .status(200)
        .json({message:'user loged in successfully', data:{token:token, userId:user._id}});
    }
    else {
        res
        .status(200)
        .json('user password is not correct');
    }
};

exports.forgotpassword=(req,res,next)=>{
    console.log('not implemented yet!');
};

exports.resetpassword=(req,res,next)=>{
    console.log('not implemented yet!');
};