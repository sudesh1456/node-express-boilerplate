const httpStatus = require('http-status');
const { Useraccount } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * add a useraccount
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const addUserAccount = async (userBody) => {
   return Useraccount.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const queryUseraccount = async (filter, options) => {
  const useraccount = await Useraccount.paginate(filter, options);
  return useraccount;
};

/*
**
 * Get user account by id
 * @param {ObjectId} id
 * @returns {Promise<Useraccount>}
 */
const getUserAccountById = async (id) => {
  console.log("id ==== "+id)
  return Useraccount.findById(id);
};


/**
 * Update user account by id
 * @param {ObjectId} userAccountId
 * @param {Object} updateBody
 * @returns {Promise<Useraccount>}
 */
 const updateUserAccountById = async (userAccountId, updateBody) => {
  const useraccount = await getUserAccountById(userAccountId);
  if (!useraccount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User account not found');
  }
  Object.assign(useraccount, updateBody);
  await useraccount.save();
  return useraccount;
};

/**
 * Delete user account by id
 * @param {ObjectId} userAccountId
 * @returns {Promise<User>}
 */
const deleteUserAccountById = async (userAccountId) => {
  const useraccount = await getUserAccountById(userAccountId);
  if (!useraccount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User account not found');
  }
  await useraccount.remove();
  return useraccount;
};


module.exports = {
  addUserAccount,
  queryUseraccount,
  getUserAccountById,
  updateUserAccountById,
  deleteUserAccountById
};
