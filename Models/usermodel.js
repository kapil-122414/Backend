
const {Schema ,model} = require("mongoose");
const bcrypt=require("bcryptjs");

 const hashedPassword =  bcrypt.hash(Password, 10);
console.log(hashedPassword);

const userschema=  new Schema({
Email:{
 type:String,
 required:true,
 unique:true
},
Password:{
    type:String,
    required:true,
     unique:true
}

});

module.exports = model("User", userschema);
