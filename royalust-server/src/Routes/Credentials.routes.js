// const { authJwt } = require("../middleware");
const controller = require("../Controllers/Credentials.controller");
const jwtMiddleware = require("../Middleware/jwt")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/signup", controller.signup);
  app.post("/api/login", controller.login);
  app.put("/api/change_password" ,controller.changePass);
  app.get("/api/check_session", jwtMiddleware.checkToken ,controller.checkSession);
  app.post("/api/token" ,controller.refreshToken);
  app.post("/api/logout", controller.clearRefreshToken)
};