const express = require("express") ; 
const router = express.Router() ;
const { recordCall, trackOrder, getInteractions } = require("../controller/interactionsManage") ;
router.route('/interactions/call').post(recordCall) ;
router.route('/interactions/order').post(trackOrder) ;
router.route('/interactions/:restaurantId').get(getInteractions) ;

module.exports = router ;