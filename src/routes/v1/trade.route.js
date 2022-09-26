const express = require('express');
const auth = require('../../middlewares/auth');
const { tradeController } = require('../../controllers');

const router = express.Router();

router.route('/getProfile').get(auth(), tradeController.getProfile);
router.route('/getOrders').get(auth(), tradeController.getOrders);
router.route('/getTrades').get(auth(), tradeController.getTrades);
router.route('/getHoldings').get(auth(), tradeController.getHoldings);
router.route('/getPositions').get(auth(), tradeController.getPositions);
router.route('/getMargins').get(auth(), tradeController.getMargins);

module.exports = router;
