const mongoose = require('mongoose');
const userSchema =new  mongoose.Schema({
     name:{
         type:String,
         require:true
     },
     email:{
         type:String,
         require:true,
         trim:true,
     },
     password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"active"
    },
    status:{
        type:String,
        default:"active"
    },
    profilePicture:{
        type:String,
        default:""
    }
},{
    timestamps:true,
})

module.exports =mongoose.model("User",userSchema)