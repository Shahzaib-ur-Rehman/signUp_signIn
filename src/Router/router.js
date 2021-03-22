require('dotenv').config();
const express =require('express');
const router=new express.Router();
const bcrypt=require('bcryptjs');
const YouTuber=require('../models/youtuberSchema');
router.post('/register', async (req,res)=>{
    try {
        const password=req.body.password;
        const cpassword=req.body.cpassword;
        if (password===cpassword) {
            const youtuber=new YouTuber({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                age:req.body.age,
                gender:req.body.gender,
                email:req.body.email,
                phone:req.body.Phone,
                password:req.body.password,
                cpassword:req.body.cpassword
            })

            const token =await youtuber.generateToken();
            console.log(token);
            const data=await youtuber.save();
            console.log(data);
            res.render('index');

        } else {
            res.send('Password Not Same');
        }
        
        
        
       
    } catch (error) {
        res.send(error);
    }
})


router.post('/login', async (req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const useremail=await YouTuber.findOne({email});
        const isMatch=await bcrypt.compare(password,useremail.password);
        if (isMatch) {
            const token =await useremail.generateToken();
            console.log(token);
            res.render('index');
        } else {
            res.send('Invalid Credentials');
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports=router;