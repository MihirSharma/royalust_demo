const UsersService = require("../Services/Users.service")

exports.createUser = async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let address = req.body.address;
    let phone = req.body.phone;
    let job_type = req.body.job_type;

    const new_user = await UsersService.createUser(username, email, address, phone, job_type)
    res.send(new_user);
  };

  exports.getUserDetails = async (req, res) => {
    let username = req.query.username;
    let user_details = null;
    if(req.user === username){
      user_details = await UsersService.getUserDetials(username)
    }
    res.send(user_details);
  };

  exports.updateUserDetails = async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let address = req.body.address;
    let phone = req.body.phone;
    let job_type = req.body.job_type;
    let user_details = null
    if(req.user === username){
      user_details = await UsersService.updateUserDetails(username, email, address, phone, job_type)
    }
    res.send(user_details);
  };  

  exports.reactivateUser = async (req, res) => {
    let username = req.query.username;

    const user_details = await UsersService.reactivateUser(username)
    res.send(user_details);
  };

  exports.deleteUser = async (req, res) => {
    let username = req.query.username;
    let user_details = null;
    if(req.user === username){
      user_details = await UsersService.deleteUser(username)
    }
    res.send(user_details);
  };

  exports.allUserDetails = async (req, res) => {
    let username = req.body.username;

    const user_details = await UsersService.allUserDetails(username)
    res.send(user_details);
  };