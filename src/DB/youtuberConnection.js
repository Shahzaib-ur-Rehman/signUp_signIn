const mongoose =require('mongoose');

mongoose.connect(process.env.DB_HOST,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected Successfully');
}).catch((Error)=>{
    console.log(Error);
})