const express = require("express");
const router = express.Router();
const {well_performing, under_performing, peak_time } = require("../controller/performance");

router.route('/restaurant/well_performing').get(well_performing);
router.route('/restaurant/under_performing').get(under_performing);
router.route('/restaurant/peak_time').get(peak_time);
module.exports = router;