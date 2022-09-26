const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { useraccountService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const addUserAccount = catchAsync(async (req, res) => {
  req.body.user_id = req.user._id;
  const useraccount = await useraccountService.addUserAccount(req.body);
  res.status(httpStatus.CREATED).send(useraccount);
});

const getUseraccounts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['account_type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
   const result = await useraccountService.queryUseraccount(filter, options);
  res.send(result);
});

const getUserAccount = catchAsync(async (req, res) => {
  console.log("user account id = "+req.params.userAccountId)

  const useraccounts = await useraccountService.getUserAccountById(req.params.userAccountId);
  if (!useraccounts) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User account not found');
  }
  res.send(useraccounts);
});

const updateUserAccount = catchAsync(async (req, res) => {
  const useraccounts = await useraccountService.updateUserAccountById(req.params.userAccountId, req.body);
  res.send(useraccounts);
});

const deleteUserAccount = catchAsync(async (req, res) => {
  await useraccountService.deleteUserAccountById(req.params.userAccountId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  addUserAccount,
  getUseraccounts,
  deleteUserAccount,
  updateUserAccount,
  getUserAccount
};