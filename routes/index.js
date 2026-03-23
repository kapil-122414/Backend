const express=require("express");

const app=express();
const port=2000;
const connectdb=require('../config/db');
connectdb();


app.listen(port,()=>{
    console.log(`server run this ${port}`);
});