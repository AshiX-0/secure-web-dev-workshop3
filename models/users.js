const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:10
    },
    role:{
        type:String,
        required:true,
        enum:['admin','user']
    }
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.login = async function(password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
}

const User = mongoose.model('user',userSchema);
module.exports=User;