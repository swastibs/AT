const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User.model");
const { JWT_SECRET } = require("./envConfig");
const { isTokenBlacklisted } = require("../utils/tokenBlacklist");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  passReqToCallback: true,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (req, jwt_payload, done) => {
      try {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        if (!token) return done(null, false, { message: "No token provided" });

        const blacklisted = await isTokenBlacklisted(token);
        if (blacklisted)
          return done(null, false, { message: "Token has been revoked" });

        const user = await User.findById(jwt_payload.id).select("-password");
        if (!user) return done(null, false, { message: "User not found" });

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }),
  );
};
