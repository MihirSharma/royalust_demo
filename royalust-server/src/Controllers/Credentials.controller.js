const CredentailsService = require("../Services/Credentials.service");
const UsersService = require("../Services/Users.service");
const jwtMiddleware = require("../Middleware/jwt");
const jwt = require("jsonwebtoken");

// This code is the signup function from the controller that handles the signup request from the client. It takes the username, password, email, address, phone, and job type from the request body and uses the username and password to create a new credentials object in the credentials table. If the username is already taken, the function returns false. If the username is not taken, it uses the username, email, address, phone, and job type to create a new user object in the users table. The function returns the new user object.

exports.signup = async (req, res) => {
  let username = req.body.username;
  let pass_hash = req.body.pass_hash;
  let email = req.body.email;
  let address = req.body.address;
  let phone = req.body.phone;
  let job_type = req.body.job_type;
  const new_creds = await CredentailsService.signup(username, pass_hash);
  console.log(new_creds);
  if (new_creds) {
    try {
      const new_user = await UsersService.createUser(
        username,
        email,
        address,
        phone,
        job_type
      );
      res.send(new_user);
    } catch (err) {
      res.send(err.message);
    }
  } else {
    res.send({ username: false });
  }
};

//This code is used to check the username and password against the database to see if it matches a record. If it does match then it generates an access token and a refresh token and sends them back to the user. The access token is used for the user to access the website and the refresh token is used to get a new access token when the current one expires. The refresh token is stored in the database to make sure that the user is still logged in.

exports.login = async (req, res) => {
  let username = req.body.username;
  let pass_hash = req.body.pass_hash;
  let response = false;
  let token = null;
  let refresh = null;
  if (username && pass_hash) {
    response = await CredentailsService.login(username, pass_hash);
    if (response) {
      token = jwtMiddleware.generateAccessToken(username);
      refresh = jwtMiddleware.generateRefreshToken(username);
      await CredentailsService.AddToken(refresh);
    }
  }
  res.send({ authenticated: response, token, refresh });
};

// This function handles the request to change a users password. It takes in a username, password, email, and phone number.
// It then calls the changePass function from the CredentialsService to change the password. It then returns a boolean
// value indicating whether the password change was successful or not.

exports.changePass = async (req, res) => {
  let username = req.body.username;
  let pass_hash = req.body.pass_hash;
  let email = req.body.email;
  let phone = req.body.phone;
  let response = false;
  const resp = await CredentailsService.changePass(
    username,
    pass_hash,
    email,
    phone
  );
  if (resp) response = true;

  res.send(response);
};

exports.checkSession = async (req, res) => {
  res.send({ token: req.token });
};

exports.refreshToken = async (req, res) => {
  let token = req.body.token;
  if (!token) req.token = null;
  let tokenExists = await CredentailsService.TokenExists(token);
  if (!tokenExists || !tokenExists.token) return res.send({ logout: true });

  jwt.verify(token, process.env.REFRESH_KEY, (err, user) => {
    const accessToken = jwtMiddleware.generateAccessToken(user.user);
    res.send({ token: accessToken });
  });
};

exports.clearRefreshToken = async (req, res) => {
  let refreshToken = req.body.token;
  let response = await CredentailsService.clearRefreshToken(refreshToken);
  res.send(true);
};
