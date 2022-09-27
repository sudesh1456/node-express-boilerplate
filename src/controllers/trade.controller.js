const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { useraccountService, zerodhaService } = require('../services');

const generateAuthTokens = catchAsync(async (req, res) => {
  zerodhaService.set_request_token(req.query.request_token);
  await executeMethod(req, res, zerodhaService.generateAuthTokens);
});

const getProfile = catchAsync(async (req, res) => {
  await executeMethod(req, res, zerodhaService.getProfile);
});

const getOrders = catchAsync(async (req, res) => {
  await executeMethod(req, res, zerodhaService.getOrders);
});

const getTrades = catchAsync(async (req, res) => {
  await executeMethod(req, res, zerodhaService.getTrades);
});

const getHoldings = catchAsync(async (req, res) => {
  await executeMethod(req, res, zerodhaService.getHoldings);
});

const getPositions = catchAsync(async (req, res) => {
  await executeMethod(req, res, zerodhaService.getPositions);
});

const getMargins = catchAsync(async (req, res) => {
  await executeMethod(req, res, zerodhaService.getMargins);
});

const getInstruments = catchAsync(async (req, res) => {
  await executeMethod(req, res, zerodhaService.getInstruments);
});

async function executeMethod(req, res, method) {
  const filter = { user_id: req.user._id };
  const options = { limit: 1, sortBy: 'createdAt:desc', page: 1 };
  const userAccounts = await useraccountService.queryUseraccount(filter, options);
  if (userAccounts && userAccounts.results.length > 0) {
    zerodhaService.setApiKey(userAccounts.results[0].api_key, userAccounts.results[0].api_secret, userAccounts.results[0].access_token);
    try {
      const result = await method();
      res.send(result);
    }
    catch (e) {
      console.log(e);
      res.send(null);
    }
  }
  else {
    res.send(null);
  }
}

module.exports = {
  generateAuthTokens,
  getProfile,
  getOrders,
  getTrades,
  getHoldings,
  getPositions,
  getMargins,
  getInstruments
};



