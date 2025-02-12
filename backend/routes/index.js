const express = require("express");

const router = express.Router();

const userSigUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadProduct = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProduct = require("../controller/product/updateProduct");
const getCategoryProductOne = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");

router.post("/signup", userSigUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// product
router.post("/upload-product", authToken, uploadProduct);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProduct);
router.get("/get-categoryProduct", getCategoryProductOne);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);

// user add to cart
router.post("/addtocart", authToken, addToCartController);

module.exports = router;
