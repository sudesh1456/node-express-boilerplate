const express = require('express');
const validate = require('../../middlewares/validate');
const userAccountValidation = require('../../validations/useraccount.validation');
const useraccountController = require('../../controllers/useraccount.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(userAccountValidation.addUserAccount), useraccountController.addUserAccount)
  .get(validate(userAccountValidation.getUserAccounts),useraccountController.getUseraccounts);

router
  .route('/:userAccountId')
  .get( validate(userAccountValidation.getUserAccount), useraccountController.getUserAccount)
  .patch(validate(userAccountValidation.updateUserAccount), useraccountController.updateUserAccount)
  .delete(validate(userAccountValidation.deleteUserAccount), useraccountController.deleteUserAccount);

module.exports = router;
