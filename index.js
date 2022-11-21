const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
import mongoose from "mongoose";
import router from "./locations/locations.controller";

mongoose.connect(process.env.URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(async ()=>{
        console.log('Successful connection to the database');
        const app = express();
        const port = process.env.port || 1337;
        app.use(express.json())
        app.use(router);


        app.listen(port, ()=> {
            console.log(`Server running, listening to port ${port}. Go to http://localhost:${port}`);
        })

        app.get('/', (req,res)=>{
            res.status(200).send('Hello World!');
        })
    })
    .catch((err)=>{
        console.error('Connection error', err.message);
        process.exit();
    })

