const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const useraccountRoute = require('./useraccount.route');
const tradeRoute = require('./trade.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/userAccount',
    route: useraccountRoute,
  },
  {
    path: '/trade',
    route: tradeRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

console.log(config.env);

/* istanbul ignore next */
//if (config.env != 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
//}

module.exports = router;
