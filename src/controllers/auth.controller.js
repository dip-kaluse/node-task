const moment = require("moment");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  let user;
  try {
    user = await userService.createUser({
      ...req.body,
    });
  } catch (e) {
    if (e.code === 11000) {
      const duplicateField = Object.keys(e.keyValue)[0];
      const errorMessage =
        duplicateField === "mobile"
          ? "Phone number already exists"
          : "Email already exists";

      return res.status(400).send({
        message: errorMessage,
        field: duplicateField,
      });
    }

    return res.status(500).send({
      message: "An error occurred while creating the user",
      error: e.message,
    });
  }

  const { token, expires } = await generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const { token, expires } = await generateAuthTokens(user);
  res.send({
    user,
    token,
    expires,
  });
};

const generateToken = (
  userId,
  expires,
  role,
  secret = "supppppeeeeeerrrrrr"
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type: "access",
    role: role,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(1440, "minutes");
  const accessToken = generateToken(user._id, accessTokenExpires);
  return { token: accessToken, expires: accessTokenExpires };
};

module.exports = {
  register,
  login,
};
