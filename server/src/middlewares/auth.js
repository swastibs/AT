const passport = require("passport");

const authenticate = passport.authenticate("jwt", { session: false });

const protect = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { authenticate, protect };
