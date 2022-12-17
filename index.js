const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const passport = require('passport');
const bodyParser = require('body-parser');
const router = require('./locations/locations.controller');
const userRouter = require('./routes/Routes');
const roleAuthorization = require('./middlewares/authorization');
require('./middlewares/authentication');

//If none of this crashes, consider youself lucky because this is a wasteland of code
//Thanks y'all for StackOverflow 
mongoose.connect(process.env.URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(async ()=>{
        console.log('Successful connection to the database');
        const app = express();
        const port = process.env.port || 1337;
        app.use(express.json())
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(userRouter);
        app.use(router);    
        app.use(passport.initialize());

        //I may or may not have not implemented proper tests because of the link below :/
        //and console.log is the way
        app.get('/', (req,res)=>{
            res.redirect('https://www.reddit.com/r/ProgrammerHumor/');
        })
        app.use((err,req,res,next)=>{res.status(500 || err.status).send(err.message || 'Internal server error')});
        app.listen(port, ()=> {console.log(`Server running, listening to port ${port}. Go to http://localhost:${port}`);});
    })
    .catch((err)=>{
        console.error('Connection error', err.message);
        process.exit();
    })

