// const { authJwt } = require("../middleware");
const controller = require("../Controllers/Users.controller");
const jwtMiddleware = require("../Middleware/jwt")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/users/create", controller.createUser);
  app.get("/api/users/details", jwtMiddleware.authenticateToken, controller.getUserDetails);
  app.get("/api/users/reactivate", controller.reactivateUser);
  app.put("/api/users/update", jwtMiddleware.authenticateToken, controller.updateUserDetails);
  app.delete("/api/users/delete", jwtMiddleware.authenticateToken, controller.deleteUser);
  app.post("/api/superuser/users/alluserdetails", controller.allUserDetails)
};