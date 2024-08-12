const authcontroller=require('../controllers/auth');
const express=require('express');
const router=express.Router();

router.post('/signup',authcontroller.register);
router.post('/login',authcontroller.login);

router.post ('/forgotpassword',authcontroller.forgotpassword);
router.put('/reset/:resetToken',authcontroller.resetpassword);
module.exports=router;