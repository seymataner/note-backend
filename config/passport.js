const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
let  response = require('../models/response');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
            //match user
            User.findOne({email:email})
            .then((user)=>{
                if(!user){
                    return done(null,false,response.emailCheckingNotExist);
                }
                //math passwords
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    } else{
                        return done(null,false,response.passwordCheckingNotCorrect);
                    }
                })
            })
            .catch((err)=>{console.log(err)})
        })
    )
    passport.serializeUser(function(user,done) {
        done(null,user.id);
    })
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    })
}