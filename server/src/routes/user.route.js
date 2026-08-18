const router = require("express").Router();
const { protect } = require("../middlewares/auth");

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    data: req.user,
    message: "User profile",
  });
});

module.exports = router;
