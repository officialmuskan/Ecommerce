const express = require("express")
const router = express.Router();
const {processPayment, sendApikey} = require("../controllers/paymentController")
const {isAuthenticatedUser} = require("../middleware/auth")
router.route("/payment/process").post(isAuthenticatedUser, processPayment)
router.route("/payment/stripekey").get(isAuthenticatedUser, sendApikey)

module.exports = router


