const express = require("express");

const router = express.Router();

const userSigUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");
const uploadProduct = require("../controller/uploadProduct");
const getProductController = require("../controller/getProduct");
const updateProduct = require("../controller/updateProduct");

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

module.exports = router;
