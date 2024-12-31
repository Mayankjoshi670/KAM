const express = require('express');
const router = express.Router();
const {logCall , getLastCall , getCallsToday} = require('../controller/callManage');
router.route('/manage/call').post(logCall);
router.route('/manage/call/:restaurantId').get(getLastCall);
router.route('/manage/calldetails').get(getCallsToday);

module.exports = router;