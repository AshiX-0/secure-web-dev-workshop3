const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/users')

const router= Router();

router.post('/users/login',async (req, res, next) => {
      passport.authenticate('login',async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');  
              return next(error);
            }  
            req.login(user,{ session: false },async (error) => {
                if (error) return next(error);  
                const body = { _id: user._id, username: user.username, role:user.role};
                const token = jwt.sign({ user: body }, process.env.SIGN_KEY);  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error).status(403);
          }
        }
      )(req, res, next);
    }
  );

router.post('/users/signup', passport.authenticate('signup',{session:false}), async (req,res,next)=>{
    res.json({message:'Attempt successful',user:req.user}).status(200);
});

router.get('/users', async (req,res,next)=>{
  const users = await User.find().select('-password -role');
  res.json({message:'Successfully fetched all users',users,token:req.query.token}).status(200);
});

router.get('/users/me', passport.authenticate('jwt',{session:false}), async (req,res,next)=>{
    res.json({message:'Successful query of personnal data',user:req.user,token:req.query.token}).status(200);
});

router.patch('/users/me', passport.authenticate('jwt',{session:false}), async (req,res,next)=>{
    const params = {};
    if(req.body.newPassword){
      params.username=req.body.newUsername || req.user.username;
      params.password=req.body.newPassword;
    }
    else{
      params.username=req.body.newUsername || req.user.username;
    }
    const user = await User.findByIdAndUpdate(req.user._id,params,{new:true});
    res.json({message:'Successful update applied',user,token:req.query.token}).status(200);
});

router.delete('/users/me', passport.authenticate('jwt',{session:false}), async (req,res,next)=>{
    await User.findByIdAndDelete(req.user._id);
    res.json({message:'Successfully deleted own profile'}).status(200);
});


module.exports = router;