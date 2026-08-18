const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User.model");
const { JWT_SECRET } = require("./envConfig");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id).select("-password");
        if (user) return done(null, user);
        else return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }),
  );
};
