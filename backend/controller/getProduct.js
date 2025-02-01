const productModel = require("../models/productModel");

async function getProductController(req, res) {
  try {
    console.log("useridofAll_user", req.userId);

    const allProducts = await productModel.find().sort({ createdAt: -1 });

    res.json({
      message: "All product",
      data: allProducts,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = getProductController;
