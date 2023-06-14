const Credentials =  require("../Models/Credentials.model");
const Users =  require("../Models/Users.model");
const Tokens =  require("../Models/Tokens.model");
const bcrypt = require('bcrypt');

exports.signup = async (username, pass_hash_raw) =>{
    let userNameCheck = await Credentials.findOne({username});
    if(!userNameCheck){
        let pass_hash = await bcrypt.hash(pass_hash_raw, 5);
        const new_user = await Credentials.create({ username, pass: pass_hash });
        return new_user
    }else{
        return false
    }
}

exports.login = async (username, pass_hash) =>{
    let user_details = await Credentials.where({username}).findOne();
    let response = await bcrypt.compare(pass_hash, user_details.pass)
    return(response);
}

exports.changePass = async (username, pass_hash_raw, email, phone) =>{
    const user_details = await Users.findOne({username});
    console.log(user_details);
    if(user_details.email === email && user_details.phone === phone){
        let pass_hash = await bcrypt.hash(pass_hash_raw, 5);
        const new_user_details = await Credentials.findOneAndUpdate({username}, {pass: pass_hash}, {new : true});
        return(new_user_details);
    }else{
        return false;
    }
}

exports.AddToken = async (token) =>{
    await Tokens.create({token})
}

exports.TokenExists = async (token) =>{
    let exists = await Tokens.where({token}).findOne();
    return exists;
}

exports.clearRefreshToken = async(token)=>{
    let del = await Tokens.findOneAndDelete({token});
    return del;
}