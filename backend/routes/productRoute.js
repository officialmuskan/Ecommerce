const express = require("express");
const { getAllProducts, createProduct,updateProduct,getProductbyID, deleteProduct, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/products").get(getAllProducts)
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/product/:id").get(getProductbyID)
router.route("/product/update/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
router.route("/product/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview)
module.exports = router