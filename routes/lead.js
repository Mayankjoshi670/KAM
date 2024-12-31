const express = require("express") ; 
const router  = express.Router() ; 
const {addLead , getLeads , deleteLead} = require("../controller/leadManage") ;
router.route('/lead').post(addLead).get(getLeads) ;
router.route('/lead/:id').delete(deleteLead) ; 
module.exports = router;