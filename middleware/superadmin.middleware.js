// middleware/superadmin.middleware.js
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");
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

module.exports = {
  authenticateToken: authenticateToken,
};
