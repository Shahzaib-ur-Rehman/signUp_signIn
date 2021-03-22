require('dotenv').config();
const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const port=process.env.PORT || 8000;
const path=require('path');
require('./DB/youtuberConnection');
const YouTuber=require('./models/youtuberSchema');
const static_path=path.join(__dirname,'../public');
const router=require('./Router/router');
const app=express();
app.set('view engine', 'hbs');
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);
app.get('/', (req,res)=>{
    res.render('index');
})
app.get('/registration', (req,res)=>{
    res.render('registration');
})
app.get('/login', (req,res)=>{
    res.render('login');
})





app.listen(port);