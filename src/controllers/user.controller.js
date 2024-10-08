const userService = require("../services/user.service");
const pick = require("../utils/pick");

const queryUser = async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers({
    filter,
    options,
  });
  res.send(result);
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
};

const updateUser = async (req, res) => {
  const user = await await userService.updateUserById(
    req.params.userId,
    req.body
  );
  res.send(user);
};
const deleteUser = async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
};
module.exports = {
  queryUser,
  getUser,
  updateUser,
  deleteUser,
};
