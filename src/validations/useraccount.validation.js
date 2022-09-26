const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addUserAccount = {
  body: Joi.object().keys({
    account_type: Joi.string().required().valid('zerodha', 'odin'),
    api_key: Joi.string().required(),
    api_secret: Joi.string().required(),
    access_token: Joi.string().required()
  }),
 };

 const getUserAccounts = {
  query: Joi.object().keys({
    account_type: Joi.string(),
    api_key: Joi.string(),
    api_secret: Joi.string(),
    access_token: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};


const getUserAccount = {
  params: Joi.object().keys({
    userAccountId: Joi.string().custom(objectId),
  }),
};

const updateUserAccount = {
  params: Joi.object().keys({
    userAccountId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      account_type: Joi.string().valid('zerodha', 'odin'),
    api_key: Joi.string(),
    api_secret: Joi.string(),
    access_token: Joi.string()
    })
    .min(1),
};

const deleteUserAccount = {
  params: Joi.object().keys({
    userAccountId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  addUserAccount,
  getUserAccounts,
  getUserAccount,
  deleteUserAccount,
  updateUserAccount
  };
  