const { hash, compare } = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: [4, "Password must be at least 4 characters long"],
      required: [true, "Password is required"],
      select: false,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
