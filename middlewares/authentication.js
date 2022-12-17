const passport = require('passport');
const localStrat = require('passport-local').Strategy;
const jwtStrat = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
require('dotenv').config();

passport.use('signup',new localStrat({usernameField:'username',passwordField:'password'},
    async (username,password,done)=>{
        try {
            const user = await User.create({username,password,role:'user'});
            return done(null,user);
        } catch (error) {
            done(error);
        }
    }
));

passport.use('login',new localStrat({usernameField:'username',passwordField:'password'},
    async (username,password,done) =>{
        try {
            const user = await User.findOne({username});
            if(!user){
                return done(null,false,{message:'No user'});
            }
            const check = await user.login(password);
            if(check){
                return done(null,user,{message:'Matching credentials'});
            }
            return done(null,false,{message:'Credentials not matching'});
        } catch (error) {
            return done(error);         
        }
    }
))

passport.use(new jwtStrat({secretOrKey:process.env.SIGN_KEY,jwtFromRequest: extractJwt.fromBodyField('token')},
    async (token,done)=>{
        try {
            const user = await User.findById(token.user._id);
            //console.log(user);
            return done(null,user);
        } catch (error) {
            done(error);
        }
    }
));