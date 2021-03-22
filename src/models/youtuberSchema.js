require('dotenv').config();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const youTuberSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})

youTuberSchema.methods.generateToken = async function () {
    try {
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token});
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
    }
}


youTuberSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password= await bcrypt.hash(this.password,10);
        this.cpassword= await bcrypt.hash(this.cpassword,10);
        next();
    }
})

const YouTuber=new mongoose.model('youtuberPlaylist',youTuberSchema);

module.exports= YouTuber;