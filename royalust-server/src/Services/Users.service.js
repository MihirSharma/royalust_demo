const Credentials =  require("../Models/Credentials.model");
const Users =  require("../Models/Users.model");

exports.createUser = async (username, email, address, phone, job_type) =>{
    const usernameID = await Credentials.where({username}).findOne();
    const new_user = await Users.create({ username, email, address, phone, job_type, credRef: usernameID.id });
    return new_user
}

exports.getUserDetials = async (username) =>{
    const user_details = await Users.where({username}).findOne();
    return(user_details);
}

exports.updateUserDetails = async (username, email, address, phone, job_type) =>{
    let active = true
    const user_details = await Users.findOneAndUpdate({username}, {email, address, phone, job_type}, {new : true});
    return(user_details);
}

exports.reactivateUser = async (username) =>{
    const user_details = await Users.findOneAndUpdate({username, active:false}, {active:true}, {new : true});
    return(user_details);
}

exports.deleteUser = async (username) =>{
    let active = true
    const user_details = await Users.findOneAndUpdate({username, active}, {active:false});
    return(user_details);
}

exports.allUserDetails = async (username) =>{
    let active = true
    const user_details = await Users.find({});
    return(user_details);
}