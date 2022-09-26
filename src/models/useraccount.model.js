const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const useraccountSchema = mongoose.Schema(
  {
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    account_type: {
      type: String,
      trim: true,
    },
    api_key: {
      type: String,
      trim: true,
    },
    api_secret: {
      type: String,
      trim: true,
    },
    access_token: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
useraccountSchema.plugin(toJSON);
useraccountSchema.plugin(paginate);

/**
 * @typedef UserAccount
 */
const UserAccount = mongoose.model('UserAccount', useraccountSchema);

module.exports = UserAccount;
