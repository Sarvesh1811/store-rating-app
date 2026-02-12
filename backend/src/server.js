const express=require('express')
const app=require('./app')
const connectDB= require('./config/db')


connectDB();

const dotenv=require('dotenv')
dotenv.config();




const PORT= process.env.PORT || 4000;
const HOST='127.0.0.1'

app.listen(PORT,HOST,()=> {

    console.log(`Server is running on http://${HOST}:${PORT}`)
})