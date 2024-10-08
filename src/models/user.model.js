const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { paginate } = require("./plugins");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  referralCode: {
    type: mongoose.Types.ObjectId,
    ref: "ReferralCode",
  },
  age: {
    type: String,
  },
  Gener: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
  },
  Technology: [{ type: String }],
  dateOfBirth: {
    type: Date,
  },
});

userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
module.exports = mongoose.model("User", userSchema);
