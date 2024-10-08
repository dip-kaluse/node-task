const { User } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createUser = async (userBody) => {
  try {
    const user = await User.isEmailTaken(userBody.email);
    return User.create(userBody);
  } catch (error) {
    console.log(error);
  }
};
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    _id: ObjectId(id),
  });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  return user;
};

const getUserByEmail = async (email) => {
  return User.findOne({
    email,
  });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exists with this email"
    );
  }
  Object.assign(user, updateBody);
  await user.save();
  return user.populate("profilePicture");
};

const deleteUserById = async (userId, orgId) => {
  const user = await getUserById(userId);
  await user.delete();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
