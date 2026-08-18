const router = require("express").Router();

const authRouter = require("./auth.route");
const userRouter = require("./user.route");

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);

module.exports = router;
