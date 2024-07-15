// middleware/superadmin.middleware.js
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");
const { to, ReE } = require('../services/util.service');
const constants = require("../config/constants");
const CONFIG = require('../config/config.json');

// Define JWT strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CONFIG.app_secret_key,
};
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ where: { id: jwt_payload.user_id } });
      if (!user) {
        res.status(401).json({
          status: 401,
          message: "User not found",
          data: { user: { id: user.id, email: user.email } },
          token: token,
          success: true,
        });
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

const authenticateToken = passport.authenticate("jwt", { session: false });

let checkUser = async function (req, res, next) {
  let user, err;
  const providedSecretKey = req.headers['x-secret-key'];
  if (providedSecretKey === CONFIG.app_secret_key) {
      [err, user] = await to(User.findOne({ 
          where: { 
              id: req.user.id,
              role_id : constants.ROLES.ADMIN,
          } 
      }));
      if (err) return ReE(res, { statusCode : constants.STATUS_CODES.UNAUTHORIZED, static_key: 'UNAUTHORIZED_USER', message: "Unauthorized User." }, constants.STATUS_CODES.UNAUTHORIZED);
      user = req.user;
      next();
  } else {
      return ReE(res, { statusCode : constants.STATUS_CODES.UNAUTHORIZED, static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, constants.STATUS_CODES.UNAUTHORIZED);
  }
}

module.exports = {
  authenticateToken: authenticateToken,
  checkUser: checkUser
};
